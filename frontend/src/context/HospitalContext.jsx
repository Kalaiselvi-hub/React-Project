import React, { createContext, useContext, useState } from 'react';
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
  userProfileData
} from '../data/mockData';

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  // Navigation & View State
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Specific Sub-tabs
  const [dashboardSubTab, setDashboardSubTab] = useState('overview'); // 'overview', 'liveStatus', 'quickStats'
  const [patientsSubTab, setPatientsSubTab] = useState('list'); // 'list', 'add', 'records', 'discharged'
  const [doctorsSubTab, setDoctorsSubTab] = useState('list'); // 'list', 'add', 'departments', 'schedules', 'loginAccess'
  const [appointmentsSubTab, setAppointmentsSubTab] = useState('today'); // 'today', 'book', 'calendar', 'pending'
  const [servicesSubTab, setServicesSubTab] = useState('departments'); // 'departments', 'treatments', 'facilities', 'charges'
  const [staffSubTab, setStaffSubTab] = useState('list'); // 'list', 'add', 'permissions', 'attendance'
  const [billingSubTab, setBillingSubTab] = useState('overview'); // 'overview', 'createBill', 'payments', 'pending', 'refunds'
  const [reportsSubTab, setReportsSubTab] = useState('patient'); // 'patient', 'appointment', 'revenue', 'doctor'
  const [inventorySubTab, setInventorySubTab] = useState('medicines'); // 'medicines', 'equipment', 'stockMgmt', 'lowStock', 'purchases'
  const [settingsSubTab, setSettingsSubTab] = useState('profile'); // 'profile', 'edit', 'notifications', 'password', 'preferences'

  // Appointment filter
  const [appointmentFilter, setAppointmentFilter] = useState('All'); // 'All', 'Pending', 'Completed', 'Cancelled'

  // Global Navigation function to open menu and specific subTab
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
  const [patients, setPatients] = useState(initialPatients);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [departments, setDepartments] = useState(initialDepartments);
  const [treatments] = useState(hospitalTreatments);
  const [facilities] = useState(hospitalFacilities);
  const [charges, setCharges] = useState(treatmentCharges);
  const [staffList, setStaffList] = useState(initialStaff);
  const [rolesPermissions, setRolesPermissions] = useState(initialRolesPermissions);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [bills, setBills] = useState(initialBills);
  const [payments, setPayments] = useState(initialPaymentRecords);
  const [refunds, setRefunds] = useState(initialRefundRecords);
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

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Actions: Patients
  const addPatient = (newPatientData) => {
    const newId = `PAT-${1000 + patients.length + 1}`;
    const patientObj = {
      id: newId,
      ...newPatientData,
      status: 'Admitted',
      admissionDate: new Date().toISOString().split('T')[0],
      vitals: newPatientData.vitals || { bp: '120/80 mmHg', pulse: '72 bpm', temp: '36.8 °C', spo2: '99%', weight: '70 kg' },
      prescriptions: newPatientData.prescriptions || [{ name: 'Paracetamol 500mg', dosage: '1 tab 8-hourly', duration: '3 days' }]
    };
    setPatients([patientObj, ...patients]);
    setStats((prev) => ({
      ...prev,
      totalPatients: prev.totalPatients + 1,
      admissionsTotal: prev.admissionsTotal + 1
    }));
    showToast(`Patient ${patientObj.name} (${newId}) admitted successfully!`);
    setIsAddPatientModalOpen(false);
  };

  const dischargePatient = (patientId) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            status: 'Discharged',
            dischargeDate: new Date().toISOString().split('T')[0]
          };
        }
        return p;
      })
    );
    setStats((prev) => ({
      ...prev,
      admissionsTotal: Math.max(0, prev.admissionsTotal - 1),
      bedsAvailable: Math.min(prev.totalBeds, prev.bedsAvailable + 1)
    }));
    showToast(`Patient ${patientId} marked as Discharged.`);
  };

  const deletePatient = (patientId) => {
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
    setStats((prev) => ({
      ...prev,
      totalPatients: Math.max(0, prev.totalPatients - 1)
    }));
    showToast(`Patient record ${patientId} removed.`);
  };

  // Actions: Doctors
  const addDoctor = (doctorData) => {
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
        Sunday: 'Off Duty'
      },
      loginAccess: {
        username: `doc.${doctorData.name.toLowerCase().replace(/[^a-z]/g, '')}`,
        role: doctorData.specialization || 'Consultant',
        twoFactor: true,
        lastLogin: 'Never',
        active: true
      },
      ...doctorData
    };
    setDoctors([...doctors, doctorObj]);
    setStats((prev) => ({
      ...prev,
      totalDoctors: prev.totalDoctors + 1
    }));
    showToast(`Dr. ${doctorData.name} registered successfully!`);
    setIsAddDoctorModalOpen(false);
  };

  const toggleDoctorDuty = (doctorId) => {
    setDoctors((prev) =>
      prev.map((doc) => {
        if (doc.id === doctorId) {
          const nextStatus = doc.status === 'On Duty' ? 'Off Duty' : 'On Duty';
          return { ...doc, status: nextStatus };
        }
        return doc;
      })
    );
  };

  const toggleDoctorLoginStatus = (doctorId) => {
    setDoctors((prev) =>
      prev.map((doc) => {
        if (doc.id === doctorId) {
          return {
            ...doc,
            loginAccess: {
              ...doc.loginAccess,
              active: !doc.loginAccess.active
            }
          };
        }
        return doc;
      })
    );
    showToast(`Doctor portal access updated.`);
  };

  // Actions: Appointments
  const bookAppointment = (appointmentData) => {
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
      status: 'Pending'
    };
    setAppointments([newApt, ...appointments]);
    setStats((prev) => ({
      ...prev,
      appointments: prev.appointments + 1,
      appointmentsPending: prev.appointmentsPending + 1
    }));
    showToast(`Appointment ${newId} booked for ${newApt.patientName}!`);
    setIsBookAppointmentModalOpen(false);
  };

  const updateAppointmentStatus = (aptId, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => {
        if (a.id === aptId) {
          return { ...a, status: newStatus };
        }
        return a;
      })
    );
    showToast(`Appointment ${aptId} status updated to ${newStatus}.`);
  };

  // Actions: Staff
  const addStaff = (staffData) => {
    const newId = `STF-0${staffList.length + 1}`;
    const newStaffMember = {
      id: newId,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      ...staffData
    };
    setStaffList([...staffList, newStaffMember]);
    showToast(`${newStaffMember.name} added to hospital staff.`);
    setIsAddStaffModalOpen(false);
  };

  const togglePermission = (roleName, permissionKey) => {
    setRolesPermissions((prev) =>
      prev.map((r) => {
        if (r.role === roleName) {
          return { ...r, [permissionKey]: !r[permissionKey] };
        }
        return r;
      })
    );
    showToast(`Updated permission for ${roleName}.`);
  };

  // Actions: Billing & Finance
  const createBill = (billData) => {
    const invoiceNo = `INV-2024-0${840 + bills.length + 1}`;
    const calculatedAmount = billData.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const vat = Math.round(calculatedAmount * 0.075);
    const totalWithVat = calculatedAmount + vat;
    const paidAmount = billData.isPaidDirectly ? totalWithVat : 0;
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
      status: dueAmount === 0 ? 'Paid' : (paidAmount > 0 ? 'Partial' : 'Unpaid'),
      method: billData.method || 'POS Card Payment',
      items: billData.items
    };

    setBills([newBill, ...bills]);
    setStats((prev) => ({
      ...prev,
      revenue: prev.revenue + paidAmount
    }));

    if (paidAmount > 0) {
      const newPayment = {
        ref: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        invoiceNo,
        patient: billData.patientName,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        method: billData.method || 'POS Card Payment',
        amount: paidAmount,
        cashier: userProfile.name,
        status: 'Verified'
      };
      setPayments([newPayment, ...payments]);
    }

    showToast(`Invoice ${invoiceNo} generated for ₦${totalWithVat.toLocaleString()}`);
    setIsCreateBillModalOpen(false);
  };

  const markBillPaid = (invoiceNo) => {
    setBills((prev) =>
      prev.map((b) => {
        if (b.invoiceNo === invoiceNo) {
          const dueToPay = b.due;
          setStats((s) => ({ ...s, revenue: s.revenue + dueToPay }));
          return {
            ...b,
            paid: b.amount,
            due: 0,
            status: 'Paid'
          };
        }
        return b;
      })
    );
    showToast(`Invoice ${invoiceNo} marked as fully Paid!`);
  };

  // Actions: Inventory
  const adjustStock = (medicineId, delta, reason = 'Inventory Adjustment') => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id === medicineId) {
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

  const reorderMedicine = (med) => {
    const poNum = `PO-2024-0${310 + purchaseRecords.length + 1}`;
    const newPO = {
      poNumber: poNum,
      supplier: 'Emzor Pharmaceuticals Ltd',
      date: new Date().toISOString().split('T')[0],
      itemsSummary: `Restock Order: ${med.name} (x100 Units)`,
      amount: med.unitPrice * 100,
      deliveryDate: 'Expected in 48 Hours',
      status: 'Pending Approval'
    };
    setPurchaseRecords([newPO, ...purchaseRecords]);
    showToast(`Reorder PO ${poNum} created for ${med.name}!`);
  };

  // Actions: User Settings
  const updateUserProfile = (updatedFields) => {
    setUserProfile((prev) => ({ ...prev, ...updatedFields }));
    showToast('User profile updated successfully!');
  };

  const toggleNotification = (key) => {
    setUserProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
    showToast('Notification preference updated.');
  };

  return (
    <HospitalContext.Provider
      value={{
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
        patientDemographicsData,
        admissionsBarData,
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
        toggleNotification
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => useContext(HospitalContext);
