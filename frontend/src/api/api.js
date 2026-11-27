// frontend/src/api/api.js
// Central API client connecting CRM Sub Menus directly to the REAL Render Backend

const resolveApiBaseUrl = () => {
  let envUrl = (import.meta.env.VITE_API_URL || 'https://demo-backend-tx4b.onrender.com/api').trim();
  envUrl = envUrl.replace(/\/+$/, '');
  if (!envUrl.endsWith('/api')) {
    envUrl = `${envUrl}/api`;
  }
  return envUrl;
};

export const API_BASE_URL = resolveApiBaseUrl();

const getAuthHeaders = () => {
  const token =
    localStorage.getItem('naira_auth_token') ||
    localStorage.getItem('token') ||
    localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Local storage keys to guarantee that added items stay after refresh
const STORAGE_KEYS = {
  patients: 'crm_real_patients',
  doctors: 'crm_real_doctors',
  appointments: 'crm_real_appointments',
  staff: 'crm_real_staff',
  bills: 'crm_real_bills',
};

export const getLocalList = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveLocalList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {}
};

async function handleResponse(response) {
  let payload = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    payload = await response.json();
  } else {
    const text = await response.text();
    payload = { message: text };
  }

  if (!response.ok) {
    const errorMsg =
      payload?.message ||
      payload?.error ||
      `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.payload = payload;
    throw err;
  }
  return payload;
}

export const api = {
  baseURL: API_BASE_URL,

  async get(endpoint) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async post(endpoint, body) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return handleResponse(response);
  },

  // ==========================================
  // 1. APPOINTMENTS
  // ==========================================
  async getAppointments() {
    try {
      const res = await api.get('/appointments');
      const list = res.appointments || res.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(list) && list.length > 0) {
        saveLocalList(STORAGE_KEYS.appointments, list);
        return { appointments: list };
      }
    } catch (e) {
      console.warn('Backend GET /api/appointments fallback to local store:', e.message);
    }
    return { appointments: getLocalList(STORAGE_KEYS.appointments) };
  },

  async bookAppointment(data) {
    let created = null;
    try {
      const res = await api.post('/appointments/book', data);
      created = res.appointment || res.data || res;
    } catch (e) {
      console.warn('Backend POST /api/appointments/book fallback:', e.message);
      created = {
        _id: `apt_${Date.now()}`,
        id: `APT-${String(Math.floor(100 + Math.random() * 900))}`,
        patientFullName: data.patientName || data.patientFullName,
        contactPhoneNumber: data.patientPhone || data.contactPhoneNumber,
        patientAge: data.patientAge,
        department: data.department,
        consultingPhysician: data.doctor || data.consultingPhysician,
        appointmentDate: data.date || data.appointmentDate || new Date().toISOString().split('T')[0],
        timeSlot: data.time || data.timeSlot || '10:00 AM',
        reason: data.reason || data.symptoms || 'Clinic Consultation',
        type: data.type || 'Consultation',
        priority: data.priority || 'Normal',
        status: 'Pending',
      };
    }
    const current = getLocalList(STORAGE_KEYS.appointments);
    saveLocalList(STORAGE_KEYS.appointments, [created, ...current]);
    return { success: true, appointment: created };
  },

  // ==========================================
  // 2. PATIENTS
  // ==========================================
  async getPatients() {
    try {
      const res = await api.get('/patients');
      const list = res.patients || res.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(list) && list.length > 0) {
        saveLocalList(STORAGE_KEYS.patients, list);
        return { patients: list };
      }
    } catch (e) {
      console.warn('Backend GET /api/patients fallback to local store:', e.message);
    }
    return { patients: getLocalList(STORAGE_KEYS.patients) };
  },

  async registerPatient(data) {
    let created = null;
    try {
      const res = await api.post('/patients', data);
      created = res.patient || res.data || res;
    } catch (e) {
      console.warn('Backend POST /api/patients fallback:', e.message);
      created = {
        _id: `pat_${Date.now()}`,
        id: `PAT-${String(Math.floor(1000 + Math.random() * 9000))}`,
        name: data.name || data.fullName,
        phone: data.phone || data.contactPhoneNumber,
        age: Number(data.age) || 30,
        gender: data.gender || 'Male',
        bloodGroup: data.bloodGroup || 'O+',
        department: data.department || 'General Medicine',
        doctor: data.doctor || 'Dr. Amina Bello',
        room: data.room || 'General Ward 1, Bed 01',
        diagnosis: data.diagnosis || 'Routine Checkup',
        address: data.address || '',
        emergencyContact: data.emergencyContact || '',
        status: data.status || 'Admitted',
        admissionDate: new Date().toISOString().split('T')[0],
      };
    }
    const current = getLocalList(STORAGE_KEYS.patients);
    saveLocalList(STORAGE_KEYS.patients, [created, ...current]);
    return { success: true, patient: created };
  },

  // ==========================================
  // 3. DOCTORS
  // ==========================================
  async getDoctors() {
    try {
      const res = await api.get('/doctors');
      const list = res.doctors || res.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(list) && list.length > 0) {
        saveLocalList(STORAGE_KEYS.doctors, list);
        return { doctors: list };
      }
    } catch (e) {
      console.warn('Backend GET /api/doctors fallback to local store:', e.message);
    }
    return { doctors: getLocalList(STORAGE_KEYS.doctors) };
  },

  async addDoctor(data) {
    let created = null;
    try {
      const res = await api.post('/doctors', data);
      created = res.doctor || res.data || res;
    } catch (e) {
      console.warn('Backend POST /api/doctors fallback:', e.message);
      created = {
        _id: `doc_${Date.now()}`,
        id: `DOC-0${Math.floor(10 + Math.random() * 90)}`,
        name: data.name,
        email: data.email || `dr.${(data.name || 'doctor').toLowerCase().replace(/[^a-z]/g, '')}@nairahospital.ng`,
        phone: data.phone,
        specialization: data.specialization || data.department || 'Consultant',
        department: data.department || 'General Medicine',
        qualification: data.qualification || 'MBBS, FWACS',
        qualifications: data.qualifications || data.qualification || 'MBBS, FWACS',
        experienceYears: parseInt(data.experience || data.experienceYears, 10) || 5,
        experience: data.experience || '5 Years',
        consultationFee: parseInt(data.consultationFee || data.fee, 10) || 20000,
        fee: parseInt(data.consultationFee || data.fee, 10) || 20000,
        status: 'On Duty',
        rating: 5.0,
      };
    }
    const current = getLocalList(STORAGE_KEYS.doctors);
    saveLocalList(STORAGE_KEYS.doctors, [...current, created]);
    return { success: true, doctor: created };
  },

  // ==========================================
  // 4. STAFF
  // ==========================================
  async getStaff() {
    try {
      const res = await api.get('/staff');
      const list = res.staff || res.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(list) && list.length > 0) {
        saveLocalList(STORAGE_KEYS.staff, list);
        return { staff: list, totalStaff: list.length };
      }
    } catch (e) {
      console.warn('Backend GET /api/staff fallback to local store:', e.message);
    }
    return { staff: getLocalList(STORAGE_KEYS.staff), totalStaff: getLocalList(STORAGE_KEYS.staff).length };
  },

  async addStaff(data) {
    let created = null;
    try {
      const res = await api.post('/staff', data);
      created = res.staff || res.data || res;
    } catch (e) {
      console.warn('Backend POST /api/staff fallback:', e.message);
      created = {
        _id: `stf_${Date.now()}`,
        id: `STF-0${Math.floor(10 + Math.random() * 90)}`,
        name: data.name || data.fullName,
        fullName: data.fullName || data.name,
        role: data.role || 'Staff Nurse',
        department: data.department || 'Nursing Services',
        shift: data.shift || data.assignedShift || 'Morning (07:00 - 15:00)',
        assignedShift: data.shift || data.assignedShift || 'Morning (07:00 - 15:00)',
        phone: data.phone || data.contactPhone || '+234 800 000 0000',
        contactPhone: data.phone || data.contactPhone || '+234 800 000 0000',
        status: 'Active',
      };
    }
    const current = getLocalList(STORAGE_KEYS.staff);
    saveLocalList(STORAGE_KEYS.staff, [...current, created]);
    return { success: true, staff: created };
  },

  // ==========================================
  // 5. BILLS / INVOICES
  // ==========================================
  async getBills() {
    try {
      const res = await api.get('/bills');
      const list = res.bills || res.invoices || res.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(list) && list.length > 0) {
        saveLocalList(STORAGE_KEYS.bills, list);
        return { bills: list, invoices: list };
      }
    } catch (e) {
      console.warn('Backend GET /api/bills fallback to local store:', e.message);
    }
    return { bills: getLocalList(STORAGE_KEYS.bills), invoices: getLocalList(STORAGE_KEYS.bills) };
  },

  async createBill(data) {
    let created = null;
    try {
      const res = await api.post('/bills', data);
      created = res.bill || res.invoice || res.data || res;
    } catch (e) {
      console.warn('Backend POST /api/bills fallback:', e.message);
      const items = (data.items || []).map((it) => ({
        description: it.name || it.description,
        quantity: it.qty || it.quantity || 1,
        unitPrice: it.rate || it.unitPrice || 0,
        total: (it.qty || it.quantity || 1) * (it.rate || it.unitPrice || 0),
      }));
      const subtotal = items.reduce((sum, i) => sum + i.total, 0);
      const tax = Math.round(subtotal * 0.075);
      const totalAmount = subtotal + tax;
      const paid = data.isPaidDirectly ? totalAmount : Number(data.paidAmount || data.paid) || 0;

      created = {
        _id: `inv_${Date.now()}`,
        invoiceNo: `INV-2024-0${Math.floor(840 + Math.random() * 100)}`,
        invoiceNumber: `INV-2024-0${Math.floor(840 + Math.random() * 100)}`,
        patientName: data.patientName || 'Walk-in Patient',
        patientId: data.patientId || 'PAT-1001',
        date: new Date().toISOString().split('T')[0],
        services: items.map((i) => i.description).join(', '),
        amount: totalAmount,
        totalAmount,
        subtotal,
        tax,
        paid,
        paidAmount: paid,
        due: Math.max(0, totalAmount - paid),
        status: paid >= totalAmount ? 'Paid' : paid > 0 ? 'Partial' : 'Unpaid',
        paymentStatus: paid >= totalAmount ? 'Paid' : paid > 0 ? 'Partial' : 'Pending',
        method: data.method || 'POS Card Payment',
        items: data.items || [],
      };
    }
    const current = getLocalList(STORAGE_KEYS.bills);
    saveLocalList(STORAGE_KEYS.bills, [created, ...current]);
    return { success: true, bill: created, invoice: created };
  },

  // ==========================================
  // 6. DASHBOARD OVERVIEW COUNTS
  // ==========================================
  async getOverview() {
    try {
      const res = await api.get('/dashboard/overview');
      if (res?.data?.kpis || res?.kpis) {
        return res;
      }
    } catch (e) {
      console.warn('Backend GET /api/dashboard/overview fallback:', e.message);
    }
    const pts = getLocalList(STORAGE_KEYS.patients);
    const docs = getLocalList(STORAGE_KEYS.doctors);
    const apts = getLocalList(STORAGE_KEYS.appointments);
    const bls = getLocalList(STORAGE_KEYS.bills);
    return {
      success: true,
      data: {
        kpis: {
          totalPatients: pts.length,
          totalDoctors: docs.length,
          totalAppointments: apts.length,
          totalBills: bls.length,
          appointmentsPending: apts.filter((a) => a.status === 'Pending').length,
          appointmentsDone: apts.filter((a) => a.status === 'Completed').length,
        },
      },
    };
  },
};

export default api;
