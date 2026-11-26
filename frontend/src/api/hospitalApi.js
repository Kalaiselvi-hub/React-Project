import { apiRequest } from './client';

export const authApi = {
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: credentials, skipAuth: true }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
  getMe: () => apiRequest('/auth/me'),
  changePassword: (data) => apiRequest('/auth/change-password', { method: 'POST', body: data }),
};

export const dashboardApi = {
  getOverview: () => apiRequest('/dashboard/overview'),
  getLiveStatus: () => apiRequest('/dashboard/live-status'),
  getQuickStats: () => apiRequest('/dashboard/quick-stats'),
};

export const patientsApi = {
  getAll: (params = '?viewAll=true') => apiRequest(`/patients${params}`),
  create: (data) => apiRequest('/patients', { method: 'POST', body: data }),
  update: (id, data) => apiRequest(`/patients/${id}`, { method: 'PUT', body: data }),
  updateStatus: (id, status) => apiRequest(`/patients/${id}/status`, { method: 'PATCH', body: { status } }),
  remove: (id) => apiRequest(`/patients/${id}`, { method: 'DELETE' }),
};

export const doctorsApi = {
  getAll: (params = '?limit=100') => apiRequest(`/doctors${params}`),
  create: (data) => apiRequest('/doctors', { method: 'POST', body: data }),
  updateStatus: (id, status) => apiRequest(`/doctors/${id}/status`, { method: 'PATCH', body: { status } }),
  getSchedules: () => apiRequest('/doctors/schedules'),
  getPortalAccess: () => apiRequest('/doctors/portal-access'),
  suspendPortal: (id) => apiRequest(`/doctors/portal-access/${id}/suspend`, { method: 'PATCH' }),
  activatePortal: (id) => apiRequest(`/doctors/portal-access/${id}/activate`, { method: 'PATCH' }),
};

export const appointmentsApi = {
  getAll: (params = '?limit=100') => apiRequest(`/appointments${params}`),
  book: (data) => apiRequest('/appointments/book', { method: 'POST', body: data }),
  create: (data) => apiRequest('/appointments', { method: 'POST', body: data }),
  updateStatus: (id, status) => apiRequest(`/appointments/${id}/status`, { method: 'PATCH', body: { status } }),
};

export const servicesApi = {
  getDepartments: () => apiRequest('/departments'),
  getTreatments: () => apiRequest('/services'),
  getFacilities: () => apiRequest('/facilities'),
  getTariffs: () => apiRequest('/tariffs'),
};

export const staffApi = {
  getAll: () => apiRequest('/staff'),
  create: (data) => apiRequest('/staff', { method: 'POST', body: data }),
  getRoles: () => apiRequest('/roles'),
  toggleRolePermission: (id, permissionKey) =>
    apiRequest(`/roles/${id}/permissions`, { method: 'PATCH', body: { permissionKey } }),
  getAttendance: () => apiRequest('/attendance'),
  getWeeklyAttendance: () => apiRequest('/attendance/weekly'),
};

export const billingApi = {
  getInvoices: (params = '?limit=100') => apiRequest(`/invoices${params}`),
  createBill: (data) => apiRequest('/bills', { method: 'POST', body: data }),
  createInvoice: (data) => apiRequest('/invoices', { method: 'POST', body: data }),
  recordPayment: (id, data) => apiRequest(`/invoices/${id}/payment`, { method: 'PATCH', body: data }),
  getPayments: () => apiRequest('/payments'),
  getOutstanding: () => apiRequest('/outstanding'),
  getRevenue: () => apiRequest('/revenue'),
};

export const inventoryApi = {
  getMedicines: () => apiRequest('/pharmacy/medicines'),
  adjustStock: (id, data) => apiRequest(`/pharmacy/medicines/${id}/adjust-stock`, { method: 'PATCH', body: data }),
  getEquipment: () => apiRequest('/equipment'),
  getPurchaseOrders: () => apiRequest('/pharmacy/purchase-orders'),
  createPurchaseOrder: (data) => apiRequest('/pharmacy/purchase-orders', { method: 'POST', body: data }),
};

export const settingsApi = {
  getProfile: () => apiRequest('/admin/profile'),
  updateProfile: (data) => apiRequest('/admin/profile', { method: 'PUT', body: data }),
  getNotificationSettings: () => apiRequest('/notifications/settings'),
  toggleNotificationSetting: (key, value) =>
    apiRequest(`/notifications/settings/${key}`, { method: 'PATCH', body: { enabled: value } }),
  getLocalization: () => apiRequest('/settings/localization'),
};
