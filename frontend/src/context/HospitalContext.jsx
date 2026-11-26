import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  initialStats,
  patientDemographicsData,
  admissionsBarData,
  initialPatients,
  initialDoctors,
  initialAppointments,
  initialDepartments,
  hospitalTreatments,
  hospitalFacilities,
  treatmentCharges,
  initialStaff,
  initialRolesPermissions,
  staffDistributionData,
  attendanceBarData,
  initialAttendance,
  initialBills,
  initialPaymentRecords,
  initialRefundRecords,
  initialMedicines,
  initialMedicalEquipment,
  initialPurchaseRecords,
  userProfileData,
} from '../data/mockData';
import { getAuthToken, setAuthToken, clearAuthToken } from '../api/client';
import {
  authApi,
  dashboardApi,
  patientsApi,
  doctorsApi,
  appointmentsApi,
  servicesApi,
  staffApi,
  billingApi,
  inventoryApi,
  settingsApi,
} from '../api/hospitalApi';
import {
  mapPatientFromApi,
  mapDoctorFromApi,
  mapAppointmentFromApi,
  mapInvoiceFromApi,
  mapPaymentFromApi,
  mapStaffFromApi,
  mapMedicineFromApi,
  mapEquipmentFromApi,
  mapPurchaseOrderFromApi,
} from '../api/mappers';

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  // Auth & API Status
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAuthToken()));
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // Navigation & View State
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Specific Sub-tabs
  const [dashboardSubTab, setDashboardSubTab] = useState('overview');
  const [patientsSubTab, setPatientsSubTab] = useState('list');
  const [doctorsSubTab, setDoctorsSubTab] = useState('list');
  const [appointmentsSubTab, setAppointmentsSubTab] = useState('today');
  const [servicesSubTab, setServicesSubTab] = useState('departments');
  const [staffSubTab, setStaffSubTab] = useState('list');
  const [billingSubTab, setBillingSubTab] = useState('overview');
  const [reportsSubTab, setReportsSubTab] = useState('patient');
  const [inventorySubTab, setInventorySubTab] = useState('medicines');
  const [settingsSubTab, setSettingsSubTab] = useState('profile');
  const [appointmentFilter, setAppointmentFilter] = useState('All');

  const navigateTo = (menuId, subTabId) => {
    setActiveMenu(menuId);
    if (menuId === 'dashboard' && subTabId) setDashboardSubTab(subTabId);
    if (menuId === 'patients' && subTabId) setPatientsSubTab(subTabId);
    if (menuId === 'doctors' && subTabId) setDoctorsSubTab(subTabId);
    if (menuId === 'appointments' && subTabId) {
      if (subTabId === 'pending') {
        setAppointmentFilter('Pending');
        setAppointmentsSubTab('today');
      } else {
        setAppointmentFilter('All');
        setAppointmentsSubTab(subTabId);
      }
    }
    if (menuId === 'services' && subTabId) setServicesSubTab(subTabId);
    if (menuId === 'staff' && subTabId) setStaffSubTab(subTabId);
    if (menuId === 'billing' && subTabId) setBillingSubTab(subTabId);
    if (menuId === 'reports' && subTabId) setReportsSubTab(subTabId);
    if (menuId === 'inventory' && subTabId) setInventorySubTab(subTabId);
    if (menuId === 'settings' && subTabId) setSettingsSubTab(subTabId);
  };

  // Core Data
  const [stats, setStats] = useState(initialStats);
  const [demographicsData, setDemographicsData] = useState(patientDemographicsData);
  const [admissionsChartData, setAdmissionsChartData] = useState(admissionsBarData);
  const [patients, setPatients] = useState(initialPatients);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [departments, setDepartments] = useState(initialDepartments);
  const [treatments, setTreatments] = useState(hospitalTreatments);
  const [facilities, setFacilities] = useState(hospitalFacilities);
  const [charges, setCharges] = useState(treatmentCharges);
  const [staffList, setStaffList] = useState(initialStaff);
  const [rolesPermissions, setRolesPermissions] = useState(initialRolesPermissions);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [bills, setBills] = useState(initialBills);
  const [payments, setPayments] = useState(initialPaymentRecords);
  const [refunds] = useState(initialRefundRecords);
  const [medicines, setMedicines] = useState(initialMedicines);
  const [equipment, setEquipment] = useState(initialMedicalEquipment);
  const [purchaseRecords, setPurchaseRecords] = useState(initialPurchaseRecords);
  const [userProfile, setUserProfile] = useState(userProfileData);

  // Modals & Selected Entities
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] = useState(false);
  const [isCreateBillModalOpen, setIsCreateBillModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

  // Toast System
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Load all live data from backend APIs
  const loadAllData = useCallback(async () => {
    if (!getAuthToken()) return;
    setDataLoading(true);
    try {
      const [
        overviewRes,
        patientsRes,
        doctorsRes,
        appointmentsRes,
        deptsRes,
        treatmentsRes,
        facilitiesRes,
        tariffsRes,
        staffRes,
        rolesRes,
        attendanceRes,
        invoicesRes,
        paymentsRes,
        medicinesRes,
        equipmentRes,
        poRes,
        profileRes,
      ] = await Promise.allSettled([
        dashboardApi.getOverview(),
        patientsApi.getAll('?viewAll=true'),
        doctorsApi.getAll('?limit=100'),
        appointmentsApi.getAll('?limit=100'),
        servicesApi.getDepartments(),
        servicesApi.getTreatments(),
        servicesApi.getFacilities(),
        servicesApi.getTariffs(),
        staffApi.getAll(),
        staffApi.getRoles(),
        staffApi.getAttendance(),
        billingApi.getInvoices('?limit=100'),
        billingApi.getPayments(),
        inventoryApi.getMedicines(),
        inventoryApi.getEquipment(),
        inventoryApi.getPurchaseOrders(),
        settingsApi.getProfile(),
      ]);

      if (overviewRes.status === 'fulfilled' && overviewRes.value?.data) {
        const ov = overviewRes.value.data;
        setStats((prev) => ({
          ...prev,
          totalPatients: ov.kpis?.totalPatients ?? prev.totalPatients,
          totalDoctors: ov.kpis?.totalDoctors ?? prev.totalDoctors,
          appointments: ov.kpis?.totalAppointments ?? prev.appointments,
          revenue: ov.kpis?.totalRevenue ?? prev.revenue,
          appointmentsPending: ov.kpis?.appointmentsPending ?? prev.appointmentsPending,
          appointmentsCompleted: ov.kpis?.appointmentsDone ?? prev.appointmentsCompleted,
          admissionsTotal: ov.kpis?.currentlyAdmitted ?? prev.admissionsTotal,
        }));
        if (Array.isArray(ov.demographics?.groups) && ov.demographics.groups.length > 0) {
          const colors = ['#00C2FF', '#0E86D4', '#1E3A8A', '#38BDF8'];
          setDemographicsData(
            ov.demographics.groups.map((g, idx) => ({
              group: g.label,
              count: g.value,
              percent: g.percentage,
              color: colors[idx % colors.length],
            }))
          );
        }
        if (Array.isArray(ov.admissionsVsDischarges) && ov.admissionsVsDischarges.length > 0) {
          setAdmissionsChartData(ov.admissionsVsDischarges);
        }
      }

      if (patientsRes.status === 'fulfilled' && Array.isArray(patientsRes.value?.patients)) {
        setPatients(patientsRes.value.patients.map(mapPatientFromApi));
      }

      if (doctorsRes.status === 'fulfilled' && Array.isArray(doctorsRes.value?.doctors)) {
        setDoctors(doctorsRes.value.doctors.map(mapDoctorFromApi));
      }

      if (appointmentsRes.status === 'fulfilled' && Array.isArray(appointmentsRes.value?.appointments)) {
        setAppointments(appointmentsRes.value.appointments.map(mapAppointmentFromApi));
      }

      if (deptsRes.status === 'fulfilled') {
        const list = deptsRes.value?.departments || deptsRes.value?.data;
        if (Array.isArray(list) && list.length > 0) {
          setDepartments(
            list.map((d) => ({
              _id: d._id,
              name: d.name,
              head: d.headOfDepartment || d.head || 'Senior Consultant',
              doctorsCount: d.doctorsCount ?? 1,
              bedsCount: d.bedsCount ?? 10,
              status: d.status || 'Active',
              description: d.description || '',
            }))
          );
        }
      }

      if (treatmentsRes.status === 'fulfilled') {
        const list = treatmentsRes.value?.services || treatmentsRes.value?.data;
        if (Array.isArray(list) && list.length > 0) {
          setTreatments(
            list.map((t) => ({
              _id: t._id,
              name: t.name || t.serviceName,
              department: t.department || t.category || 'General',
              duration: t.duration || '45 mins',
              cost: t.price ?? t.cost ?? 0,
              availability: t.availability || 'Available',
            }))
          );
        }
      }

      if (facilitiesRes.status === 'fulfilled') {
        const list = facilitiesRes.value?.facilities || facilitiesRes.value?.data;
        if (Array.isArray(list) && list.length > 0) {
          setFacilities(
            list.map((f) => ({
              _id: f._id,
              name: f.name,
              department: f.department || 'General',
              total: f.totalBeds ?? f.totalCapacity ?? 0,
              occupied: f.currentLoad ?? f.occupiedCount ?? 0,
              status: f.status || 'Operational',
            }))
          );
        }
      }

      if (tariffsRes.status === 'fulfilled') {
        const list = tariffsRes.value?.tariffs || tariffsRes.value?.data;
        if (Array.isArray(list) && list.length > 0) {
          setCharges(
            list.map((c) => ({
              _id: c._id,
              code: c.code || c._id.slice(-6).toUpperCase(),
              service: c.serviceName || c.name,
              category: c.category || 'General',
              rate: c.rate ?? c.price ?? 0,
            }))
          );
        }
      }

      if (staffRes.status === 'fulfilled') {
        const list = staffRes.value?.staff || staffRes.value?.data;
        if (Array.isArray(list) && list.length > 0) {
          setStaffList(list.map(mapStaffFromApi));
        }
      }

      if (rolesRes.status === 'fulfilled') {
        const list = rolesRes.value?.roles || rolesRes.value?.data;
        if (Array.isArray(list) && list.length > 0) {
          setRolesPermissions(
            list.map((r) => ({
              _id: r._id,
              role: r.name || r.role,
              patients: Boolean(r.permissions?.patients ?? r.patients ?? true),
              doctors: Boolean(r.permissions?.doctors ?? r.doctors ?? false),
              billing: Boolean(r.permissions?.billing ?? r.billing ?? false),
              inventory: Boolean(r.permissions?.inventory ?? r.inventory ?? false),
              reports: Boolean(r.permissions?.reports ?? r.reports ?? false),
              settings: Boolean(r.permissions?.settings ?? r.settings ?? false),
            }))
          );
        }
      }

      if (attendanceRes.status === 'fulfilled') {
        const list = attendanceRes.value?.attendance || attendanceRes.value?.records || attendanceRes.value?.data;
        if (Array.isArray(list) && list.length > 0) {
          setAttendance(
            list.map((a) => ({
              _id: a._id,
              staffId: a.staff?.staffId || a.staffId || 'STF',
              name: a.staff?.name || a.staffName || 'Staff',
              department: a.staff?.department || a.department || 'General',
              date: a.date ? String(a.date).split('T')[0] : new Date().toISOString().split('T')[0],
              checkIn: a.checkInTime || a.checkIn || '08:00 AM',
              checkOut: a.checkOutTime || a.checkOut || '-',
              status: a.status || 'Present',
            }))
          );
        }
      }

      if (invoicesRes.status === 'fulfilled') {
        const list = invoicesRes.value?.invoices || invoicesRes.value?.data;
        if (Array.isArray(list)) {
          setBills(list.map(mapInvoiceFromApi));
        }
      }

      if (paymentsRes.status === 'fulfilled') {
        const list = paymentsRes.value?.payments || paymentsRes.value?.data;
        if (Array.isArray(list)) {
          setPayments(list.map(mapPaymentFromApi));
        }
      }

      if (medicinesRes.status === 'fulfilled') {
        const list = medicinesRes.value?.data || medicinesRes.value?.medicines;
        if (Array.isArray(list)) {
          setMedicines(list.map(mapMedicineFromApi));
        }
      }

      if (equipmentRes.status === 'fulfilled') {
        const list = equipmentRes.value?.data || equipmentRes.value?.equipment;
        if (Array.isArray(list)) {
          setEquipment(list.map(mapEquipmentFromApi));
        }
      }

      if (poRes.status === 'fulfilled') {
        const list = poRes.value?.data || poRes.value?.purchaseOrders;
        if (Array.isArray(list)) {
          setPurchaseRecords(list.map(mapPurchaseOrderFromApi));
        }
      }

      if (profileRes.status === 'fulfilled' && profileRes.value?.admin) {
        const adm = profileRes.value.admin;
        setUserProfile((prev) => ({
          ...prev,
          name: adm.name || prev.name,
          email: adm.email || prev.email,
          role: adm.role || adm.jobTitle || prev.role,
          department: adm.department || prev.department,
          phone: adm.directLine || prev.phone,
          location: adm.location || prev.location,
        }));
      }
    } catch (err) {
      console.error('Error loading hospital data:', err);
    } finally {
      setDataLoading(false);
    }
  }, []);

  // Restore session on mount & listen for 401 unauthorized events
  useEffect(() => {
    const handleUnauthorized = () => {
      clearAuthToken();
      setIsAuthenticated(false);
      showToast('Session expired. Please sign in again.', 'error');
    };
    window.addEventListener('naira:unauthorized', handleUnauthorized);

    const token = getAuthToken();
    if (token) {
      authApi
        .getMe()
        .then((res) => {
          if (res?.admin) {
            setUserProfile((prev) => ({
              ...prev,
              name: res.admin.name || prev.name,
              email: res.admin.email || prev.email,
              role: res.admin.role || prev.role,
            }));
          }
          setIsAuthenticated(true);
          loadAllData();
        })
        .catch(() => {
          clearAuthToken();
          setIsAuthenticated(false);
        });
    }

    return () => window.removeEventListener('naira:unauthorized', handleUnauthorized);
  }, [loadAllData, showToast]);

  const login = async (credentials) => {
    setAuthLoading(true);
    try {
      const res = await authApi.login(credentials);
      if (res?.requires2FA) {
        return res;
      }
      if (res?.token) {
        setAuthToken(res.token);
        setIsAuthenticated(true);
        setIsDemoMode(false);
        if (res.admin) {
          setUserProfile((prev) => ({
            ...prev,
            name: res.admin.name || prev.name,
            email: res.admin.email || prev.email,
            role: res.admin.role || prev.role,
            department: res.admin.department || prev.department,
            phone: res.admin.directLine || prev.phone,
          }));
        }
        await loadAllData();
        showToast(`Welcome back, ${res.admin?.name || 'Admin'}!`);
      }
      return res;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (getAuthToken()) {
        await authApi.logout();
      }
    } catch {
      // Ignore logout API errors
    } finally {
      clearAuthToken();
      setIsAuthenticated(false);
      setIsDemoMode(false);
      showToast('Signed out successfully.');
    }
  };

  const enterDemoMode = () => {
    setIsDemoMode(true);
    setIsAuthenticated(false);
    showToast('Running in Offline Demo Mode (mock data).', 'info');
  };

  // Actions: Patients
  const addPatient = async (newPatientData) => {
    if (isAuthenticated) {
      try {
        const res = await patientsApi.create({
          name: newPatientData.name,
          age: Number(newPatientData.age) || 30,
          gender: newPatientData.gender || 'Male',
          phone: newPatientData.phone,
          email: newPatientData.email,
          bloodGroup: newPatientData.bloodGroup || 'O+',
          department: newPatientData.department || 'General Medicine',
          diagnosis: newPatientData.diagnosis,
          room: newPatientData.room,
          address: newPatientData.address,
          emergencyContact: newPatientData.emergencyContact,
          status: 'Admitted',
        });
        const created = mapPatientFromApi(res.patient || res.data || res);
        setPatients((prev) => [created, ...prev]);
        setStats((prev) => ({
          ...prev,
          totalPatients: prev.totalPatients + 1,
          admissionsTotal: prev.admissionsTotal + 1,
        }));
        showToast(`Patient ${created.name} (${created.id}) admitted successfully!`);
        setIsAddPatientModalOpen(false);
        return;
      } catch (err) {
        showToast(err.message || 'Failed to admit patient', 'error');
        return;
      }
    }

    const newId = `PAT-${1000 + patients.length + 1}`;
    const patientObj = {
      id: newId,
      ...newPatientData,
      status: 'Admitted',
      admissionDate: new Date().toISOString().split('T')[0],
      vitals: newPatientData.vitals || { bp: '120/80 mmHg', pulse: '72 bpm', temp: '36.8 °C', spo2: '99%', weight: '70 kg' },
      prescriptions: newPatientData.prescriptions || [{ name: 'Paracetamol 500mg', dosage: '1 tab 8-hourly', duration: '3 days' }],
    };
    setPatients([patientObj, ...patients]);
    setStats((prev) => ({
      ...prev,
      totalPatients: prev.totalPatients + 1,
      admissionsTotal: prev.admissionsTotal + 1,
    }));
    showToast(`Patient ${patientObj.name} (${newId}) admitted successfully!`);
    setIsAddPatientModalOpen(false);
  };

  const dischargePatient = async (patientId) => {
    const target = patients.find((p) => p.id === patientId || p._id === patientId);
    if (isAuthenticated && target?._id) {
      try {
        await patientsApi.updateStatus(target._id, 'Discharged');
      } catch (err) {
        showToast(err.message || 'Failed to discharge patient', 'error');
        return;
      }
    }
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId || p._id === patientId
          ? { ...p, status: 'Discharged', dischargeDate: new Date().toISOString().split('T')[0] }
          : p
      )
    );
    setStats((prev) => ({
      ...prev,
      admissionsTotal: Math.max(0, prev.admissionsTotal - 1),
      bedsAvailable: Math.min(prev.totalBeds, prev.bedsAvailable + 1),
    }));
    showToast(`Patient ${patientId} marked as Discharged.`);
  };

  const deletePatient = async (patientId) => {
    const target = patients.find((p) => p.id === patientId || p._id === patientId);
    if (isAuthenticated && target?._id) {
      try {
        await patientsApi.remove(target._id);
      } catch (err) {
        showToast(err.message || 'Failed to delete patient', 'error');
        return;
      }
    }
    setPatients((prev) => prev.filter((p) => p.id !== patientId && p._id !== patientId));
    setStats((prev) => ({
      ...prev,
      totalPatients: Math.max(0, prev.totalPatients - 1),
    }));
    showToast(`Patient record ${patientId} removed.`);
  };

  // Actions: Doctors
  const addDoctor = async (doctorData) => {
    if (isAuthenticated) {
      try {
        const res = await doctorsApi.create({
          name: doctorData.name,
          email: doctorData.email,
          phone: doctorData.phone,
          specialization: doctorData.specialization,
          department: doctorData.department,
          qualifications: doctorData.qualifications || 'MBBS, MD',
          experienceYears: parseInt(doctorData.experience, 10) || 5,
          consultationFee: Number(doctorData.fee) || 500,
          status: 'On Duty',
        });
        const created = mapDoctorFromApi(res.doctor || res.data || res);
        setDoctors((prev) => [...prev, created]);
        setStats((prev) => ({ ...prev, totalDoctors: prev.totalDoctors + 1 }));
        showToast(`Dr. ${created.name} registered successfully!`);
        setIsAddDoctorModalOpen(false);
        return;
      } catch (err) {
        showToast(err.message || 'Failed to register doctor', 'error');
        return;
      }
    }

    const newId = `DOC-0${doctors.length + 1}`;
    const doctorObj = {
      id: newId,
      rating: 5.0,
      status: 'On Duty',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      schedule: {
        Monday: '08:00 - 16:00',
        Tuesday: '08:00 - 16:00',
        Wednesday: '08:00 - 16:00',
        Thursday: '08:00 - 16:00',
        Friday: '08:00 - 14:00',
        Saturday: 'On Call',
        Sunday: 'Off Duty',
      },
      loginAccess: {
        username: `doc.${doctorData.name.toLowerCase().replace(/[^a-z]/g, '')}`,
        role: doctorData.specialization || 'Consultant',
        twoFactor: true,
        lastLogin: 'Never',
        active: true,
      },
      ...doctorData,
    };
    setDoctors([...doctors, doctorObj]);
    setStats((prev) => ({ ...prev, totalDoctors: prev.totalDoctors + 1 }));
    showToast(`Dr. ${doctorData.name} registered successfully!`);
    setIsAddDoctorModalOpen(false);
  };

  const toggleDoctorDuty = async (doctorId) => {
    const target = doctors.find((d) => d.id === doctorId || d._id === doctorId);
    const nextStatus = target?.status === 'On Duty' ? 'Off Duty' : 'On Duty';
    if (isAuthenticated && target?._id) {
      try {
        await doctorsApi.updateStatus(target._id, nextStatus);
      } catch (err) {
        showToast(err.message || 'Failed to update doctor status', 'error');
        return;
      }
    }
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === doctorId || doc._id === doctorId ? { ...doc, status: nextStatus } : doc
      )
    );
  };

  const toggleDoctorLoginStatus = (doctorId) => {
    setDoctors((prev) =>
      prev.map((doc) => {
        if (doc.id === doctorId || doc._id === doctorId) {
          return {
            ...doc,
            loginAccess: { ...doc.loginAccess, active: !doc.loginAccess.active },
          };
        }
        return doc;
      })
    );
    showToast('Doctor portal access updated.');
  };

  // Actions: Appointments
  const bookAppointment = async (appointmentData) => {
    if (isAuthenticated) {
      try {
        const matchedDoctor = doctors.find((d) => d.name === appointmentData.doctor);
        const res = await appointmentsApi.book({
          patientFullName: appointmentData.patientName,
          patientAge: Number(appointmentData.patientAge) || 30,
          contactPhoneNumber: appointmentData.patientPhone,
          consultingPhysician: appointmentData.doctor,
          doctorId: matchedDoctor?._id,
          department: appointmentData.department,
          appointmentDate: appointmentData.date || new Date().toISOString().split('T')[0],
          timeSlot: appointmentData.time || '10:00 AM',
          reason: appointmentData.reason || 'Routine Medical Checkup',
          appointmentType: appointmentData.type || 'Consultation',
          priority: appointmentData.priority || 'Normal',
        });
        const created = mapAppointmentFromApi(res.appointment || res.data || res);
        setAppointments((prev) => [created, ...prev]);
        setStats((prev) => ({
          ...prev,
          appointments: prev.appointments + 1,
          appointmentsPending: prev.appointmentsPending + 1,
        }));
        showToast(`Appointment ${created.id} booked for ${created.patientName}!`);
        setIsBookAppointmentModalOpen(false);
        return;
      } catch (err) {
        showToast(err.message || 'Failed to book appointment', 'error');
        return;
      }
    }

    const newId = `APT-0${200 + appointments.length + 1}`;
    const newApt = {
      id: newId,
      date: appointmentData.date || new Date().toISOString().split('T')[0],
      time: appointmentData.time || '10:00 AM',
      patientName: appointmentData.patientName,
      patientAge: appointmentData.patientAge || 30,
      patientPhone: appointmentData.patientPhone || '+234 800 000 0000',
      doctor: appointmentData.doctor,
      department: appointmentData.department,
      reason: appointmentData.reason || 'Routine Medical Checkup',
      type: appointmentData.type || 'Consultation',
      priority: appointmentData.priority || 'Normal',
      status: 'Pending',
    };
    setAppointments([newApt, ...appointments]);
    setStats((prev) => ({
      ...prev,
      appointments: prev.appointments + 1,
      appointmentsPending: prev.appointmentsPending + 1,
    }));
    showToast(`Appointment ${newId} booked for ${newApt.patientName}!`);
    setIsBookAppointmentModalOpen(false);
  };

  const updateAppointmentStatus = async (aptId, newStatus) => {
    const target = appointments.find((a) => a.id === aptId || a._id === aptId);
    if (isAuthenticated && target?._id) {
      try {
        await appointmentsApi.updateStatus(target._id, newStatus);
      } catch (err) {
        showToast(err.message || 'Failed to update appointment status', 'error');
        return;
      }
    }
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId || a._id === aptId ? { ...a, status: newStatus } : a))
    );
    showToast(`Appointment ${aptId} status updated to ${newStatus}.`);
  };

  // Actions: Staff
  const addStaff = async (staffData) => {
    if (isAuthenticated) {
      try {
        const res = await staffApi.create(staffData);
        const created = mapStaffFromApi(res.staff || res.data || res);
        setStaffList((prev) => [...prev, created]);
        showToast(`${created.name} added to hospital staff.`);
        setIsAddStaffModalOpen(false);
        return;
      } catch (err) {
        showToast(err.message || 'Failed to add staff member', 'error');
        return;
      }
    }

    const newId = `STF-0${staffList.length + 1}`;
    const newStaffMember = {
      id: newId,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      ...staffData,
    };
    setStaffList([...staffList, newStaffMember]);
    showToast(`${newStaffMember.name} added to hospital staff.`);
    setIsAddStaffModalOpen(false);
  };

  const togglePermission = async (roleName, permissionKey) => {
    const target = rolesPermissions.find((r) => r.role === roleName);
    if (isAuthenticated && target?._id) {
      try {
        await staffApi.toggleRolePermission(target._id, permissionKey);
      } catch (err) {
        showToast(err.message || 'Failed to update permission', 'error');
        return;
      }
    }
    setRolesPermissions((prev) =>
      prev.map((r) => (r.role === roleName ? { ...r, [permissionKey]: !r[permissionKey] } : r))
    );
    showToast(`Updated permission for ${roleName}.`);
  };

  // Actions: Billing & Finance
  const createBill = async (billData) => {
    const calculatedAmount = billData.items.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const vat = Math.round(calculatedAmount * 0.075);
    const totalWithVat = calculatedAmount + vat;
    const paidAmount = billData.isPaidDirectly ? totalWithVat : 0;

    if (isAuthenticated) {
      try {
        const res = await billingApi.createBill({
          patientId: billData.patientId,
          patientName: billData.patientName,
          items: billData.items.map((i) => ({
            description: i.name,
            quantity: i.qty,
            unitPrice: i.rate,
            total: i.qty * i.rate,
          })),
          subtotal: calculatedAmount,
          tax: vat,
          totalAmount: totalWithVat,
          paidAmount,
          paymentStatus: paidAmount >= totalWithVat ? 'Paid' : 'Pending',
          paymentMethod: billData.method || 'Card',
        });
        const created = mapInvoiceFromApi(res.invoice || res.data || res);
        setBills((prev) => [created, ...prev]);
        setStats((prev) => ({ ...prev, revenue: prev.revenue + paidAmount }));
        showToast(`Invoice ${created.invoiceNo} generated for ₦${totalWithVat.toLocaleString()}`);
        setIsCreateBillModalOpen(false);
        return;
      } catch (err) {
        showToast(err.message || 'Failed to create invoice', 'error');
        return;
      }
    }

    const invoiceNo = `INV-2024-0${840 + bills.length + 1}`;
    const dueAmount = totalWithVat - paidAmount;
    const newBill = {
      invoiceNo,
      patientId: billData.patientId || 'PAT-1001',
      patientName: billData.patientName,
      date: new Date().toISOString().split('T')[0],
      services: billData.items.map((i) => i.name).join(', '),
      amount: totalWithVat,
      paid: paidAmount,
      due: dueAmount,
      status: dueAmount === 0 ? 'Paid' : paidAmount > 0 ? 'Partial' : 'Unpaid',
      method: billData.method || 'POS Card Payment',
      items: billData.items,
    };
    setBills([newBill, ...bills]);
    setStats((prev) => ({ ...prev, revenue: prev.revenue + paidAmount }));
    if (paidAmount > 0) {
      const newPayment = {
        ref: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        invoiceNo,
        patient: billData.patientName,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        method: billData.method || 'POS Card Payment',
        amount: paidAmount,
        cashier: userProfile.name,
        status: 'Verified',
      };
      setPayments([newPayment, ...payments]);
    }
    showToast(`Invoice ${invoiceNo} generated for ₦${totalWithVat.toLocaleString()}`);
    setIsCreateBillModalOpen(false);
  };

  const markBillPaid = async (invoiceNo) => {
    const target = bills.find((b) => b.invoiceNo === invoiceNo || b._id === invoiceNo);
    if (isAuthenticated && target?._id) {
      try {
        await billingApi.recordPayment(target._id, {
          amount: target.due || target.amount,
          paymentMethod: target.method || 'Card',
        });
      } catch (err) {
        showToast(err.message || 'Failed to record payment', 'error');
        return;
      }
    }
    setBills((prev) =>
      prev.map((b) => {
        if (b.invoiceNo === invoiceNo || b._id === invoiceNo) {
          const dueToPay = b.due;
          setStats((s) => ({ ...s, revenue: s.revenue + dueToPay }));
          return { ...b, paid: b.amount, due: 0, status: 'Paid' };
        }
        return b;
      })
    );
    showToast(`Invoice ${invoiceNo} marked as fully Paid!`);
  };

  // Actions: Inventory
  const adjustStock = async (medicineId, delta, reason = 'Inventory Adjustment') => {
    const target = medicines.find((m) => m.id === medicineId || m._id === medicineId);
    if (isAuthenticated && target?._id) {
      try {
        await inventoryApi.adjustStock(target._id, {
          adjustment: delta,
          quantity: Math.abs(delta),
          type: delta >= 0 ? 'Restock' : 'Dispense',
          reason,
        });
      } catch (err) {
        showToast(err.message || 'Failed to adjust stock', 'error');
        return;
      }
    }
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id === medicineId || med._id === medicineId) {
          const newStock = Math.max(0, med.stock + delta);
          let newStatus = 'In Stock';
          if (newStock === 0) newStatus = 'Out of Stock';
          else if (newStock <= 10) newStatus = 'Critical Low';
          else if (newStock <= med.reorderLevel) newStatus = 'Low Stock';
          return { ...med, stock: newStock, status: newStatus };
        }
        return med;
      })
    );
    showToast(`Stock updated for item (${reason})`);
    setIsStockModalOpen(false);
  };

  const reorderMedicine = async (med) => {
    if (isAuthenticated && med?._id) {
      try {
        const res = await inventoryApi.createPurchaseOrder({
          medicineId: med._id,
          medicineName: med.name,
          quantity: 100,
          supplier: med.supplier || 'Emzor Pharmaceuticals Ltd',
          unitPrice: med.unitPrice || 100,
        });
        const created = mapPurchaseOrderFromApi(res.purchaseOrder || res.data || res);
        setPurchaseRecords((prev) => [created, ...prev]);
        showToast(`Reorder PO ${created.poNumber} created for ${med.name}!`);
        return;
      } catch (err) {
        showToast(err.message || 'Failed to create purchase order', 'error');
        return;
      }
    }

    const poNum = `PO-2024-0${310 + purchaseRecords.length + 1}`;
    const newPO = {
      poNumber: poNum,
      supplier: 'Emzor Pharmaceuticals Ltd',
      date: new Date().toISOString().split('T')[0],
      itemsSummary: `Restock Order: ${med.name} (x100 Units)`,
      amount: med.unitPrice * 100,
      deliveryDate: 'Expected in 48 Hours',
      status: 'Pending Approval',
    };
    setPurchaseRecords([newPO, ...purchaseRecords]);
    showToast(`Reorder PO ${poNum} created for ${med.name}!`);
  };

  // Actions: User Settings
  const updateUserProfile = async (updatedFields) => {
    if (isAuthenticated) {
      try {
        await settingsApi.updateProfile({
          name: updatedFields.name,
          email: updatedFields.email,
          directLine: updatedFields.phone,
          department: updatedFields.department,
          location: updatedFields.location,
        });
      } catch (err) {
        showToast(err.message || 'Failed to update profile', 'error');
        return;
      }
    }
    setUserProfile((prev) => ({ ...prev, ...updatedFields }));
    showToast('User profile updated successfully!');
  };

  const toggleNotification = async (key) => {
    const nextVal = !userProfile.notifications?.[key];
    if (isAuthenticated) {
      try {
        await settingsApi.toggleNotificationSetting(key, nextVal);
      } catch {
        // Fallback silently to local update if notification key differs on server
      }
    }
    setUserProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: nextVal,
      },
    }));
    showToast('Notification preference updated.');
  };

  return (
    <HospitalContext.Provider
      value={{
        // Auth & Sync
        isAuthenticated,
        isDemoMode,
        authLoading,
        dataLoading,
        login,
        logout,
        enterDemoMode,
        refreshData: loadAllData,

        // Navigation
        activeMenu,
        setActiveMenu,
        navigateTo,
        searchQuery,
        setSearchQuery,
        dashboardSubTab,
        setDashboardSubTab,
        patientsSubTab,
        setPatientsSubTab,
        doctorsSubTab,
        setDoctorsSubTab,
        appointmentsSubTab,
        setAppointmentsSubTab,
        servicesSubTab,
        setServicesSubTab,
        staffSubTab,
        setStaffSubTab,
        billingSubTab,
        setBillingSubTab,
        reportsSubTab,
        setReportsSubTab,
        inventorySubTab,
        setInventorySubTab,
        settingsSubTab,
        setSettingsSubTab,
        appointmentFilter,
        setAppointmentFilter,

        // Data
        stats,
        patients,
        doctors,
        appointments,
        departments,
        treatments,
        facilities,
        charges,
        staffList,
        rolesPermissions,
        attendance,
        bills,
        payments,
        refunds,
        medicines,
        equipment,
        purchaseRecords,
        userProfile,

        // Charts data
        patientDemographicsData: demographicsData,
        admissionsBarData: admissionsChartData,
        staffDistributionData,
        attendanceBarData,

        // Modals & Selected
        selectedPatient,
        setSelectedPatient,
        isPatientModalOpen,
        setIsPatientModalOpen,
        isAddPatientModalOpen,
        setIsAddPatientModalOpen,
        isAddDoctorModalOpen,
        setIsAddDoctorModalOpen,
        isBookAppointmentModalOpen,
        setIsBookAppointmentModalOpen,
        isCreateBillModalOpen,
        setIsCreateBillModalOpen,
        selectedInvoice,
        setSelectedInvoice,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        isAddStaffModalOpen,
        setIsAddStaffModalOpen,
        selectedMedicine,
        setSelectedMedicine,
        isStockModalOpen,
        setIsStockModalOpen,

        // Toasts
        toast,
        showToast,

        // Functions
        addPatient,
        dischargePatient,
        deletePatient,
        addDoctor,
        toggleDoctorDuty,
        toggleDoctorLoginStatus,
        bookAppointment,
        updateAppointmentStatus,
        addStaff,
        togglePermission,
        createBill,
        markBillPaid,
        adjustStock,
        reorderMedicine,
        updateUserProfile,
        toggleNotification,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => useContext(HospitalContext);
