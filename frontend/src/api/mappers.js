export const mapPatientFromApi = (p) => ({
  _id: p._id,
  id: p.patientId || p._id,
  name: p.name || p.fullName || 'Unknown Patient',
  age: p.age ?? 0,
  gender: p.gender || p.sex || 'Other',
  phone: p.phone || '',
  email: p.email || '',
  bloodGroup: p.bloodGroup || 'O+',
  status: p.status || 'Outpatient',
  department: p.department || 'General Medicine',
  doctor: p.assignedDoctor?.name || p.doctorName || 'Unassigned',
  assignedDoctorId: p.assignedDoctor?._id || p.assignedDoctor || '',
  admissionDate: p.admissionDate
    ? String(p.admissionDate).split('T')[0]
    : p.createdAt
    ? String(p.createdAt).split('T')[0]
    : new Date().toISOString().split('T')[0],
  dischargeDate: p.dischargeDate ? String(p.dischargeDate).split('T')[0] : undefined,
  room: p.room || p.wardBed || 'General Ward',
  diagnosis: p.diagnosis || 'Under Evaluation',
  vitals: p.vitals || {
    bp: '120/80 mmHg',
    pulse: '72 bpm',
    temp: '36.8 °C',
    spo2: '98%',
    weight: '70 kg',
  },
  prescriptions: Array.isArray(p.prescriptions) ? p.prescriptions : [],
  emergencyContact: p.emergencyContact || '',
  address: p.address || '',
});

export const mapDoctorFromApi = (d) => ({
  _id: d._id,
  id: d.doctorId || d._id,
  name: d.name || 'Doctor',
  email: d.email || '',
  phone: d.phone || '',
  specialization: d.specialization || 'General Medicine',
  department: d.department || 'General Medicine',
  qualifications: d.qualifications || d.qualification || 'MBBS',
  experience: d.experienceYears ? `${d.experienceYears} Years` : d.experience || '5 Years',
  fee: d.consultationFee ?? 0,
  rating: d.rating ?? 4.8,
  status: d.status || 'On Duty',
  availability: d.availability || 'Mon-Fri 9AM-5PM',
  avatar:
    d.avatar ||
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
  schedule: d.schedule || {
    Monday: '08:00 - 16:00',
    Tuesday: '08:00 - 16:00',
    Wednesday: '08:00 - 16:00',
    Thursday: '08:00 - 16:00',
    Friday: '08:00 - 14:00',
    Saturday: 'On Call',
    Sunday: 'Off Duty',
  },
  loginAccess: d.loginAccess || {
    username: `doc.${(d.name || 'doctor').toLowerCase().replace(/[^a-z]/g, '')}`,
    role: d.specialization || 'Consultant',
    twoFactor: true,
    lastLogin: 'Active',
    active: true,
  },
});

export const mapAppointmentFromApi = (a) => ({
  _id: a._id,
  id: a.appointmentId || a._id,
  date: a.appointmentDate
    ? String(a.appointmentDate).split('T')[0]
    : new Date().toISOString().split('T')[0],
  time: a.timeSlot || '10:00 AM',
  patientName: a.patientFullName || a.patient?.name || 'Patient',
  patientAge: a.patientAge || a.patient?.age || 30,
  patientPhone: a.contactPhoneNumber || a.patient?.phone || '',
  doctor: a.consultingPhysician || a.doctor?.name || 'Doctor',
  doctorId: a.doctor?._id || a.doctor || '',
  patientId: a.patient?._id || a.patient || '',
  department: a.department || a.doctor?.department || 'General Medicine',
  reason: a.reason || a.notes || 'Consultation',
  type: a.type || a.appointmentType || 'Consultation',
  priority: a.priority || 'Normal',
  status: a.status || 'Pending',
});

export const mapInvoiceFromApi = (inv) => {
  const total = inv.totalAmount ?? inv.amount ?? 0;
  const paid =
    inv.paidAmount !== undefined
      ? inv.paidAmount
      : inv.paymentStatus === 'Paid'
      ? total
      : 0;
  const due = Math.max(0, total - paid);

  return {
    _id: inv._id,
    invoiceNo: inv.invoiceNumber || inv._id,
    patientId: inv.patient?.patientId || inv.patient?._id || inv.patient || 'PAT',
    patientName: inv.patientName || inv.patient?.name || 'Patient',
    date: inv.issuedAt
      ? String(inv.issuedAt).split('T')[0]
      : inv.createdAt
      ? String(inv.createdAt).split('T')[0]
      : new Date().toISOString().split('T')[0],
    services: Array.isArray(inv.items)
      ? inv.items.map((i) => i.description || i.name).join(', ')
      : inv.services || 'Medical Services',
    amount: total,
    paid,
    due,
    status: inv.paymentStatus || (due === 0 ? 'Paid' : paid > 0 ? 'Partial' : 'Unpaid'),
    method: inv.paymentMethod || 'Card',
    items: Array.isArray(inv.items)
      ? inv.items.map((i) => ({
          name: i.description || i.name,
          qty: i.quantity ?? i.qty ?? 1,
          rate: i.unitPrice ?? i.rate ?? 0,
        }))
      : [],
  };
};

export const mapPaymentFromApi = (p) => ({
  _id: p._id,
  ref: p.transactionRef || p.reference || p._id,
  invoiceNo: p.invoice?.invoiceNumber || p.invoiceNumber || 'N/A',
  patient: p.patientName || p.patient?.name || 'Patient',
  date: p.paymentDate
    ? String(p.paymentDate).replace('T', ' ').substring(0, 16)
    : p.createdAt
    ? String(p.createdAt).replace('T', ' ').substring(0, 16)
    : '',
  method: p.method || p.paymentMethod || 'Card',
  amount: p.amount ?? 0,
  cashier: p.receivedBy || p.cashier || 'Admin',
  status: p.status || 'Verified',
});

export const mapStaffFromApi = (s) => ({
  _id: s._id,
  id: s.staffId || s._id,
  name: s.name || 'Staff Member',
  role: s.role || 'Staff',
  department: s.department || 'General',
  phone: s.phone || '',
  email: s.email || '',
  shift: s.shift || 'Morning (08:00 - 16:00)',
  joinDate: s.joinDate
    ? String(s.joinDate).split('T')[0]
    : s.createdAt
    ? String(s.createdAt).split('T')[0]
    : '',
  status: s.status || 'Active',
});

export const mapMedicineFromApi = (m) => ({
  _id: m._id,
  id: m.code || m._id,
  name: m.medicationName || m.name || 'Medicine',
  category: m.category || 'General',
  stock: m.stockLevel ?? m.stock ?? 0,
  reorderLevel: m.reorderAt ?? m.reorderLevel ?? 20,
  unitPrice: m.unitTariff ?? m.unitPrice ?? 0,
  expiryDate: m.expiryDate ? String(m.expiryDate).split('T')[0] : '2027-12-31',
  supplier: m.supplier || 'Emzor Pharmaceuticals',
  status: m.status || 'In Stock',
});

export const mapEquipmentFromApi = (e) => ({
  _id: e._id,
  id: e.equipmentId || e._id,
  name: e.name || 'Medical Equipment',
  department: e.department || 'General',
  status: e.status || 'Operational',
  lastService: e.lastServiceDate ? String(e.lastServiceDate).split('T')[0] : '2026-01-01',
  nextService: e.nextServiceDate ? String(e.nextServiceDate).split('T')[0] : '2027-01-01',
  serialNo: e.serialNumber || e.serialNo || 'N/A',
});

export const mapPurchaseOrderFromApi = (po) => ({
  _id: po._id,
  poNumber: po.poNumber || po._id,
  supplier: po.supplier || 'Pharmaceutical Supplier',
  date: po.orderDate
    ? String(po.orderDate).split('T')[0]
    : po.createdAt
    ? String(po.createdAt).split('T')[0]
    : '',
  itemsSummary: po.itemsSummary || po.medicineName || 'Medical Supplies',
  amount: po.totalAmount ?? po.amount ?? 0,
  deliveryDate: po.expectedDelivery || 'Expected in 48 Hours',
  status: po.status || 'Pending Approval',
});
