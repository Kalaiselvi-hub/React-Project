// NAIRA Hospital Admin Panel - Complete Mock Dataset

export const initialStats = {
  totalPatients: 1248,
  totalDoctors: 48,
  appointments: 180,
  revenue: 4285000, // ₦4,285,000
  appointmentsPending: 34,
  appointmentsCompleted: 126,
  appointmentsCancelled: 20,
  admissionsTotal: 84,
  bedsAvailable: 36,
  totalBeds: 120,
  ambulancesReady: 3,
  ambulancesTotal: 5,
  icuBedsOccupied: 8,
  icuBedsTotal: 12
};

export const patientDemographicsData = [
  { group: '0-17 yrs (Pediatric)', count: 225, percent: 18, color: '#00C2FF' },
  { group: '18-35 yrs (Young Adults)', count: 424, percent: 34, color: '#0E86D4' },
  { group: '36-55 yrs (Adults)', count: 349, percent: 28, color: '#1E3A8A' },
  { group: '56+ yrs (Seniors)', count: 250, percent: 20, color: '#38BDF8' }
];

export const admissionsBarData = [
  { month: 'Jan', admissions: 95, discharges: 82 },
  { month: 'Feb', admissions: 110, discharges: 98 },
  { month: 'Mar', admissions: 130, discharges: 115 },
  { month: 'Apr', admissions: 125, discharges: 118 },
  { month: 'May', admissions: 142, discharges: 128 },
  { month: 'Jun', admissions: 165, discharges: 148 },
  { month: 'Jul', admissions: 180, discharges: 162 }
];

export const initialPatients = [
  {
    id: 'PAT-1001',
    name: 'Olumide Adebayo',
    age: 42,
    gender: 'Male',
    phone: '+234 803 456 7890',
    bloodGroup: 'O+',
    status: 'Admitted',
    department: 'Cardiology',
    doctor: 'Dr. Chidi Okafor',
    admissionDate: '2026-11-14',
    room: 'Ward 3, Bed 12',
    diagnosis: 'Hypertensive Heart Disease',
    vitals: { bp: '138/88 mmHg', pulse: '76 bpm', temp: '36.8 °C', spo2: '98%', weight: '78 kg' },
    prescriptions: [
      { name: 'Amlodipine 10mg', dosage: '1 tablet daily', duration: '30 days' },
      { name: 'Lisinopril 20mg', dosage: '1 tablet morning', duration: '30 days' }
    ],
    emergencyContact: 'Funke Adebayo (Wife) - +234 802 334 5566',
    address: '14 Admiralty Way, Lekki Phase 1, Lagos'
  },
  {
    id: 'PAT-1002',
    name: 'Fatima Abubakar',
    age: 28,
    gender: 'Female',
    phone: '+234 812 345 6789',
    bloodGroup: 'A+',
    status: 'Admitted',
    department: 'Obstetrics & Gynecology',
    doctor: 'Dr. Amina Bello',
    admissionDate: '2026-11-16',
    room: 'Maternity Wing, Room 04',
    diagnosis: 'Post-Elective C-Section Recovery',
    vitals: { bp: '118/76 mmHg', pulse: '72 bpm', temp: '37.0 °C', spo2: '99%', weight: '65 kg' },
    prescriptions: [
      { name: 'Cefuroxime 500mg', dosage: '1 tablet twice daily', duration: '7 days' },
      { name: 'Ibuprofen 400mg', dosage: '1 tablet after meals', duration: '5 days' }
    ],
    emergencyContact: 'Ibrahim Abubakar (Husband) - +234 809 111 2233',
    address: '22 Gana Street, Maitama, Abuja'
  },
  {
    id: 'PAT-1003',
    name: 'Emeka Nwachukwu',
    age: 56,
    gender: 'Male',
    phone: '+234 805 678 1234',
    bloodGroup: 'B+',
    status: 'Outpatient',
    department: 'Orthopedics',
    doctor: 'Dr. Babatunde Adeyemi',
    admissionDate: '2026-11-18',
    room: 'Outpatient Clinic 2',
    diagnosis: 'Chronic Lumbar Radiculopathy',
    vitals: { bp: '124/82 mmHg', pulse: '68 bpm', temp: '36.6 °C', spo2: '98%', weight: '84 kg' },
    prescriptions: [
      { name: 'Pregabalin 75mg', dosage: '1 capsule at night', duration: '14 days' },
      { name: 'Diclofenac Gel', dosage: 'Apply locally 3x daily', duration: '10 days' }
    ],
    emergencyContact: 'Ngozi Nwachukwu (Sister) - +234 803 999 8877',
    address: '8 Bishop Oluwole St, Victoria Island, Lagos'
  },
  {
    id: 'PAT-1004',
    name: 'Zainab Danjuma',
    age: 7,
    gender: 'Female',
    phone: '+234 818 223 9900',
    bloodGroup: 'O+',
    status: 'Admitted',
    department: 'Pediatrics',
    doctor: 'Dr. Folake Davies',
    admissionDate: '2026-11-17',
    room: 'Pediatric Care, Bed 05',
    diagnosis: 'Acute Bronchitis & Wheezing',
    vitals: { bp: '102/64 mmHg', pulse: '95 bpm', temp: '38.2 °C', spo2: '95%', weight: '22 kg' },
    prescriptions: [
      { name: 'Salbutamol Nebulization', dosage: '2.5mg PRN 6-hourly', duration: '3 days' },
      { name: 'Amoxicillin Syrup 250mg/5ml', dosage: '5ml 3x daily', duration: '7 days' }
    ],
    emergencyContact: 'Mallam Danjuma (Father) - +234 818 223 9900',
    address: '5 Ahmadu Bello Way, Kaduna / Lagos'
  },
  {
    id: 'PAT-1005',
    name: 'Tunde Bakare',
    age: 63,
    gender: 'Male',
    phone: '+234 701 445 8822',
    bloodGroup: 'AB+',
    status: 'Discharged',
    department: 'Neurology',
    doctor: 'Dr. Samuel Okon',
    admissionDate: '2026-11-05',
    dischargeDate: '2026-11-15',
    room: 'Ward 2, Bed 08 (Discharged)',
    diagnosis: 'Transient Ischemic Attack (Stable)',
    vitals: { bp: '128/80 mmHg', pulse: '70 bpm', temp: '36.7 °C', spo2: '98%', weight: '74 kg' },
    prescriptions: [
      { name: 'Aspirin 75mg', dosage: '1 tablet daily after breakfast', duration: '90 days' },
      { name: 'Atorvastatin 40mg', dosage: '1 tablet at bed time', duration: '30 days' }
    ],
    emergencyContact: 'Kemi Bakare (Daughter) - +234 803 777 6655',
    address: '11 Bourdillon Road, Ikoyi, Lagos'
  },
  {
    id: 'PAT-1006',
    name: 'Grace Okafor',
    age: 35,
    gender: 'Female',
    phone: '+234 806 778 3344',
    bloodGroup: 'O-',
    status: 'Outpatient',
    department: 'General Medicine',
    doctor: 'Dr. Amina Bello',
    admissionDate: '2026-11-18',
    room: 'Consulting Room 1',
    diagnosis: 'Severe Migraine with Aura',
    vitals: { bp: '115/75 mmHg', pulse: '74 bpm', temp: '36.9 °C', spo2: '99%', weight: '58 kg' },
    prescriptions: [
      { name: 'Sumatriptan 50mg', dosage: '1 tablet at onset of migraine', duration: 'As needed' },
      { name: 'Paracetamol 1000mg', dosage: '1 tablet 8-hourly', duration: '3 days' }
    ],
    emergencyContact: 'Kelechi Okafor (Brother) - +234 806 778 3345',
    address: '44 Isaac John Street, Ikeja GRA, Lagos'
  },
  {
    id: 'PAT-1007',
    name: 'Kabiru Mohammed',
    age: 51,
    gender: 'Male',
    phone: '+234 802 889 0011',
    bloodGroup: 'A-',
    status: 'Discharged',
    department: 'General Surgery',
    doctor: 'Dr. Babatunde Adeyemi',
    admissionDate: '2026-11-08',
    dischargeDate: '2026-11-14',
    room: 'Surgical Ward, Bed 03 (Discharged)',
    diagnosis: 'Post Laparoscopic Cholecystectomy',
    vitals: { bp: '120/78 mmHg', pulse: '72 bpm', temp: '36.6 °C', spo2: '99%', weight: '80 kg' },
    prescriptions: [
      { name: 'Ciprofloxacin 500mg', dosage: '1 tablet 12-hourly', duration: '5 days' },
      { name: 'Tramadol 50mg', dosage: '1 capsule PRN pain', duration: '3 days' }
    ],
    emergencyContact: 'Aisha Mohammed (Wife) - +234 802 889 0012',
    address: '19 Marina Road, Lagos Island'
  },
  {
    id: 'PAT-1008',
    name: 'Chioma Eze',
    age: 19,
    gender: 'Female',
    phone: '+234 813 555 4411',
    bloodGroup: 'O+',
    status: 'Admitted',
    department: 'Emergency & Trauma',
    doctor: 'Dr. Samuel Okon',
    admissionDate: '2026-11-18',
    room: 'Emergency Bay 02',
    diagnosis: 'Acute Appendicitis - Pre-Op Workup',
    vitals: { bp: '110/70 mmHg', pulse: '92 bpm', temp: '38.4 °C', spo2: '98%', weight: '52 kg' },
    prescriptions: [
      { name: 'IV Cefazolin 1g', dosage: 'Single stat dose pre-op', duration: 'Immediate' },
      { name: 'IV Paracetamol 1g', dosage: 'Infusion over 15 mins', duration: 'Stat' }
    ],
    emergencyContact: 'Chief Eze (Father) - +234 813 555 4400',
    address: '77 Allen Avenue, Ikeja, Lagos'
  }
];

export const initialDoctors = [
  {
    id: 'DOC-01',
    name: 'Dr. Amina Bello',
    department: 'General Medicine',
    specialization: 'Chief Medical Director & Consultant Physician',
    qualification: 'MBBS, FWACP, MSc Public Health',
    phone: '+234 803 123 4567',
    email: 'amina.bello@nairahospital.ng',
    experience: '18 Years',
    rating: 4.9,
    status: 'On Duty',
    consultationFee: 25000, // ₦25,000
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    schedule: {
      Monday: '08:00 - 15:00',
      Tuesday: '08:00 - 15:00',
      Wednesday: '10:00 - 18:00',
      Thursday: '08:00 - 15:00',
      Friday: '08:00 - 14:00',
      Saturday: 'On Call',
      Sunday: 'Off Duty'
    },
    loginAccess: {
      username: 'doc.amina',
      role: 'Chief Medical Director',
      twoFactor: true,
      lastLogin: 'Today, 08:14 AM',
      active: true
    }
  },
  {
    id: 'DOC-02',
    name: 'Dr. Chidi Okafor',
    department: 'Cardiology',
    specialization: 'Senior Consultant Interventional Cardiologist',
    qualification: 'MBBS, FWACS (Cardio), FACC',
    phone: '+234 802 234 5678',
    email: 'chidi.okafor@nairahospital.ng',
    experience: '15 Years',
    rating: 4.9,
    status: 'In Surgery',
    consultationFee: 30000,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    schedule: {
      Monday: '09:00 - 17:00 (Surgeries)',
      Tuesday: '09:00 - 16:00 (Clinic)',
      Wednesday: '09:00 - 17:00 (Surgeries)',
      Thursday: '10:00 - 16:00 (Clinic)',
      Friday: '09:00 - 14:00',
      Saturday: 'Emergency Only',
      Sunday: 'Off Duty'
    },
    loginAccess: {
      username: 'doc.chidi',
      role: 'Senior Consultant',
      twoFactor: true,
      lastLogin: 'Today, 07:45 AM',
      active: true
    }
  },
  {
    id: 'DOC-03',
    name: 'Dr. Babatunde Adeyemi',
    department: 'Orthopedics & Surgery',
    specialization: 'Consultant Orthopedic & Trauma Surgeon',
    qualification: 'MBBS, FMCOS, AO Fellow (Spine)',
    phone: '+234 809 345 6789',
    email: 'babatunde.adeyemi@nairahospital.ng',
    experience: '14 Years',
    rating: 4.8,
    status: 'On Duty',
    consultationFee: 25000,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    schedule: {
      Monday: '08:00 - 16:00',
      Tuesday: '08:00 - 16:00 (OT)',
      Wednesday: '08:00 - 16:00',
      Thursday: '08:00 - 16:00 (OT)',
      Friday: '08:00 - 15:00',
      Saturday: 'On Call',
      Sunday: 'Off Duty'
    },
    loginAccess: {
      username: 'doc.babatunde',
      role: 'Consultant Surgeon',
      twoFactor: true,
      lastLogin: 'Today, 08:30 AM',
      active: true
    }
  },
  {
    id: 'DOC-04',
    name: 'Dr. Folake Davies',
    department: 'Pediatrics',
    specialization: 'Consultant Pediatrician & Neonatologist',
    qualification: 'MBBS, FWACP (Paediatrics)',
    phone: '+234 814 456 7890',
    email: 'folake.davies@nairahospital.ng',
    experience: '11 Years',
    rating: 4.9,
    status: 'On Duty',
    consultationFee: 20000,
    avatar: 'https://images.unsplash.com/photo-1594824813511-536c64e52516?w=150&auto=format&fit=crop&q=80',
    schedule: {
      Monday: '08:30 - 15:30',
      Tuesday: '08:30 - 15:30',
      Wednesday: '08:30 - 15:30',
      Thursday: '08:30 - 15:30',
      Friday: '08:30 - 14:00',
      Saturday: 'NICU Rounds',
      Sunday: 'Off Duty'
    },
    loginAccess: {
      username: 'doc.folake',
      role: 'Consultant Pediatrician',
      twoFactor: true,
      lastLogin: 'Today, 09:10 AM',
      active: true
    }
  },
  {
    id: 'DOC-05',
    name: 'Dr. Samuel Okon',
    department: 'Neurology',
    specialization: 'Consultant Neurologist & Neuro-Rehabilitation',
    qualification: 'MBBS, FWACP, MRCP (UK)',
    phone: '+234 803 567 8901',
    email: 'samuel.okon@nairahospital.ng',
    experience: '16 Years',
    rating: 4.7,
    status: 'On Duty',
    consultationFee: 25000,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    schedule: {
      Monday: '09:00 - 16:00',
      Tuesday: '09:00 - 16:00',
      Wednesday: 'EEG Clinic',
      Thursday: '09:00 - 16:00',
      Friday: '09:00 - 14:00',
      Saturday: 'Off Duty',
      Sunday: 'Off Duty'
    },
    loginAccess: {
      username: 'doc.samuel',
      role: 'Consultant Neurologist',
      twoFactor: false,
      lastLogin: 'Yesterday, 04:22 PM',
      active: true
    }
  },
  {
    id: 'DOC-06',
    name: 'Dr. Halima Bello-Osagie',
    department: 'Obstetrics & Gynecology',
    specialization: 'Consultant Obstetrician & Gynecological Surgeon',
    qualification: 'MBBS, FWACS (OBGYN)',
    phone: '+234 811 678 9012',
    email: 'halima.osagie@nairahospital.ng',
    experience: '12 Years',
    rating: 4.9,
    status: 'On Duty',
    consultationFee: 25000,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    schedule: {
      Monday: '08:00 - 16:00',
      Tuesday: '08:00 - 16:00 (Antenatal)',
      Wednesday: '08:00 - 16:00 (Deliveries/OT)',
      Thursday: '08:00 - 16:00',
      Friday: '08:00 - 14:00',
      Saturday: 'Labor Ward On Call',
      Sunday: 'Off Duty'
    },
    loginAccess: {
      username: 'doc.halima',
      role: 'Consultant Gynecologist',
      twoFactor: true,
      lastLogin: 'Today, 08:00 AM',
      active: true
    }
  }
];

export const initialAppointments = [
  {
    id: 'APT-0201',
    time: '09:00 AM',
    date: '2026-11-18',
    patientName: 'Olumide Adebayo',
    patientAge: 42,
    patientPhone: '+234 803 456 7890',
    doctor: 'Dr. Chidi Okafor',
    department: 'Cardiology',
    reason: 'Hypertension Follow-up & ECG',
    type: 'Follow-up',
    priority: 'Normal',
    status: 'Completed'
  },
  {
    id: 'APT-0202',
    time: '09:45 AM',
    date: '2026-11-18',
    patientName: 'Grace Okafor',
    patientAge: 35,
    patientPhone: '+234 806 778 3344',
    doctor: 'Dr. Amina Bello',
    department: 'General Medicine',
    reason: 'Severe Migraine Assessment',
    type: 'Consultation',
    priority: 'Normal',
    status: 'In Consultation'
  },
  {
    id: 'APT-0203',
    time: '10:30 AM',
    date: '2026-11-18',
    patientName: 'Emeka Nwachukwu',
    patientAge: 56,
    patientPhone: '+234 805 678 1234',
    doctor: 'Dr. Babatunde Adeyemi',
    department: 'Orthopedics',
    reason: 'Spine MRI Review & Epidural Injection',
    type: 'Procedure',
    priority: 'Urgent',
    status: 'Confirmed'
  },
  {
    id: 'APT-0204',
    time: '11:15 AM',
    date: '2026-11-18',
    patientName: 'Zainab Danjuma',
    patientAge: 7,
    patientPhone: '+234 818 223 9900',
    doctor: 'Dr. Folake Davies',
    department: 'Pediatrics',
    reason: 'Pediatric Asthma Evaluation',
    type: 'Consultation',
    priority: 'Normal',
    status: 'Pending'
  },
  {
    id: 'APT-0205',
    time: '12:00 PM',
    date: '2026-11-18',
    patientName: 'Chioma Eze',
    patientAge: 19,
    patientPhone: '+234 813 555 4411',
    doctor: 'Dr. Samuel Okon',
    department: 'Emergency & Trauma',
    reason: 'Acute Abdominal Pain Triage',
    type: 'Emergency',
    priority: 'Emergency',
    status: 'Confirmed'
  },
  {
    id: 'APT-0206',
    time: '01:30 PM',
    date: '2026-11-18',
    patientName: 'Ibrahim Dangote',
    patientAge: 48,
    patientPhone: '+234 802 334 1122',
    doctor: 'Dr. Chidi Okafor',
    department: 'Cardiology',
    reason: 'Cardiac Stress Test Checkup',
    type: 'Diagnostics',
    priority: 'Normal',
    status: 'Pending'
  },
  {
    id: 'APT-0207',
    time: '02:15 PM',
    date: '2026-11-18',
    patientName: 'Mercy Johnson',
    patientAge: 31,
    patientPhone: '+234 809 778 6655',
    doctor: 'Dr. Halima Bello-Osagie',
    department: 'Obstetrics & Gynecology',
    reason: '2nd Trimester Ultrasound & Anatomy Scan',
    type: 'Antenatal',
    priority: 'Normal',
    status: 'Pending'
  },
  {
    id: 'APT-0208',
    time: '03:00 PM',
    date: '2026-11-18',
    patientName: 'Ayo Balogun',
    patientAge: 29,
    patientPhone: '+234 803 222 1100',
    doctor: 'Dr. Babatunde Adeyemi',
    department: 'Orthopedics',
    reason: 'Knee Meniscus Tear Evaluation',
    type: 'Consultation',
    priority: 'Normal',
    status: 'Cancelled'
  }
];

export const initialDepartments = [
  { id: 'DEP-01', code: 'CARD', name: 'Cardiology & Heart Institute', head: 'Dr. Chidi Okafor', doctorsCount: 6, bedsCount: 16, activeCases: 14, status: 'Active 24/7' },
  { id: 'DEP-02', code: 'ORTH', name: 'Orthopedics & Joint Surgery', head: 'Dr. Babatunde Adeyemi', doctorsCount: 5, bedsCount: 18, activeCases: 15, status: 'Active 24/7' },
  { id: 'DEP-03', code: 'PAED', name: 'Pediatrics & Neonatal Care', head: 'Dr. Folake Davies', doctorsCount: 7, bedsCount: 20, activeCases: 18, status: 'Active 24/7' },
  { id: 'DEP-04', code: 'OBGY', name: 'Obstetrics & Gynecology', head: 'Dr. Halima Bello-Osagie', doctorsCount: 6, bedsCount: 22, activeCases: 19, status: 'Active 24/7' },
  { id: 'DEP-05', code: 'NEUR', name: 'Neurology & Stroke Unit', head: 'Dr. Samuel Okon', doctorsCount: 4, bedsCount: 12, activeCases: 9, status: 'Active 24/7' },
  { id: 'DEP-06', code: 'SURG', name: 'General & Minimally Invasive Surgery', head: 'Dr. Amina Bello', doctorsCount: 8, bedsCount: 14, activeCases: 11, status: 'Active 24/7' },
  { id: 'DEP-07', code: 'ERTR', name: 'Emergency & Level-1 Trauma Centre', head: 'Dr. Babatunde Adeyemi', doctorsCount: 8, bedsCount: 12, activeCases: 8, status: 'Active 24/7' },
  { id: 'DEP-08', code: 'RADI', name: 'Radiology & Advanced Imaging', head: 'Dr. Kemi Adeleke', doctorsCount: 4, bedsCount: 6, activeCases: 22, status: 'Active 24/7' }
];

export const hospitalTreatments = [
  { id: 'TRT-01', name: 'Coronary Angiography & Stenting', category: 'Cardiology', duration: '90 mins', prep: '6h Fasting, Blood clotting panel', standardRate: 650000 },
  { id: 'TRT-02', name: 'Laparoscopic Appendectomy', category: 'Surgical', duration: '60 mins', prep: 'NPO 8 hours, Pre-op antibiotics', standardRate: 350000 },
  { id: 'TRT-03', name: 'Total Knee Replacement (Arthroplasty)', category: 'Orthopedics', duration: '120 mins', prep: 'Full pre-op screening & cross-match', standardRate: 1200000 },
  { id: 'TRT-04', name: 'Normal Spontaneous Delivery (Vaginal)', category: 'Obstetrics', duration: 'Variable', prep: 'Antenatal registration check', standardRate: 180000 },
  { id: 'TRT-05', name: 'Elective Caesarean Section (C-Section)', category: 'Obstetrics', duration: '75 mins', prep: 'Cross-match 2 units blood, NPO', standardRate: 450000 },
  { id: 'TRT-06', name: 'Brain MRI with Contrast 3.0 Tesla', category: 'Radiology', duration: '45 mins', prep: 'Check kidney function (eGFR), No metal', standardRate: 120000 },
  { id: 'TRT-07', name: 'Hemodialysis Single Session', category: 'Nephrology', duration: '240 mins', prep: 'Pre-dialysis weight & vitals', standardRate: 45000 },
  { id: 'TRT-08', name: 'Digital 12-Lead Electrocardiogram (ECG)', category: 'Cardiology', duration: '15 mins', prep: 'Resting 10 mins prior', standardRate: 15000 }
];

export const hospitalFacilities = [
  { name: 'Intensive Care Unit (ICU)', capacity: '12 Beds', occupied: '8 Beds (4 Free)', status: 'Operational', highlight: 'Ventilators: 100% Online', color: 'teal' },
  { name: 'Operation Theaters (4 Suites)', capacity: '4 Theaters', occupied: 'OT 1 & OT 3 Active', status: 'Active Surgery', highlight: 'Laminar Air Flow Certified', color: 'blue' },
  { name: 'Automated Blood Bank', capacity: '200 Units', occupied: '142 Units in Storage', status: 'Optimal Supply', highlight: 'O+ and B+ Surplus, AB- Needed', color: 'emerald' },
  { name: 'Diagnostic Imaging Center', capacity: '3T MRI, 128-CT, X-Ray', occupied: 'Available for Emergency', status: 'Operational', highlight: '24/7 Digital PACS reporting', color: 'teal' },
  { name: 'Emergency & Triage Bay', capacity: '16 Bays', occupied: '6 Bays In Use', status: 'Level-1 Ready', highlight: 'Average Triage Wait: 4 Mins', color: 'blue' },
  { name: 'Mobile Ambulance Fleet', capacity: '5 Ambulances', occupied: '2 Dispatched, 3 Standby', status: 'Ready 24/7', highlight: 'GPS Tracking & Paramedic Crew', color: 'emerald' }
];

export const treatmentCharges = [
  { code: 'CHG-101', service: 'General Doctor Consultation', category: 'Consultation', fee: 10000, hmoCovered: '100% Covered' },
  { code: 'CHG-102', service: 'Specialist Consultant Consultation', category: 'Consultation', fee: 25000, hmoCovered: '80% Covered' },
  { code: 'CHG-103', service: 'Emergency Room Triage & Care', category: 'Emergency', fee: 35000, hmoCovered: '100% Covered' },
  { code: 'CHG-104', service: 'General Ward Stay (Per Night)', category: 'Inpatient', fee: 20000, hmoCovered: '100% Covered' },
  { code: 'CHG-105', service: 'Private Executive Room (Per Night)', category: 'Inpatient', fee: 55000, hmoCovered: 'Co-pay ₦20,000' },
  { code: 'CHG-106', service: 'ICU Critical Care Day Rate', category: 'Inpatient', fee: 150000, hmoCovered: 'Pre-auth Required' },
  { code: 'CHG-107', service: 'Complete Blood Count (FBC + Diff)', category: 'Laboratory', fee: 8500, hmoCovered: '100% Covered' },
  { code: 'CHG-108', service: 'Comprehensive Metabolic Panel (CMP)', category: 'Laboratory', fee: 14000, hmoCovered: '100% Covered' },
  { code: 'CHG-109', service: 'Cardiac Troponin I Test (Rapid)', category: 'Laboratory', fee: 18000, hmoCovered: '100% Covered' },
  { code: 'CHG-110', service: '128-Slice CT Scan (Abdomen/Pelvis)', category: 'Radiology', fee: 95000, hmoCovered: 'Pre-auth Required' },
  { code: 'CHG-111', service: 'Brain MRI 3.0 Tesla with Contrast', category: 'Radiology', fee: 120000, hmoCovered: 'Pre-auth Required' },
  { code: 'CHG-112', service: 'Digital Chest X-Ray (2 Views)', category: 'Radiology', fee: 12000, hmoCovered: '100% Covered' },
  { code: 'CHG-113', service: 'Laparoscopic Cholecystectomy', category: 'Surgical', fee: 480000, hmoCovered: 'Pre-auth Required' },
  { code: 'CHG-114', service: 'Caesarean Section Package', category: 'Surgical', fee: 450000, hmoCovered: 'Pre-auth Required' }
];

export const initialStaff = [
  { id: 'STF-01', name: 'Sister Ngozi Uche', role: 'Head Nurse & Matron', department: 'Nursing Services', phone: '+234 803 234 1122', shift: 'Morning (07:00 - 15:00)', status: 'Active', joinDate: '2021-03-15' },
  { id: 'STF-02', name: 'Yusuf Aliyu', role: 'Chief Pharmacist', department: 'Pharmacy', phone: '+234 812 998 7766', shift: 'Morning (08:00 - 16:00)', status: 'Active', joinDate: '2022-01-10' },
  { id: 'STF-03', name: 'Dr. Kemi Adeleke', role: 'Chief Medical Lab Scientist', department: 'Pathology & Lab', phone: '+234 805 112 3344', shift: 'Day Shift (08:00 - 17:00)', status: 'Active', joinDate: '2020-08-01' },
  { id: 'STF-04', name: 'Patrick Bassey', role: 'Senior Radiology Technologist', department: 'Radiology', phone: '+234 807 445 6677', shift: 'Evening (14:00 - 22:00)', status: 'Active', joinDate: '2023-04-12' },
  { id: 'STF-05', name: 'Blessing Okafor', role: 'Staff Nurse (ICU Specialist)', department: 'Intensive Care Unit', phone: '+234 813 667 8899', shift: 'Night Shift (22:00 - 07:00)', status: 'Active', joinDate: '2023-09-01' },
  { id: 'STF-06', name: 'Tariq Bello', role: 'Hospital Billing Manager', department: 'Finance & Accounts', phone: '+234 802 888 4433', shift: 'Morning (08:00 - 16:30)', status: 'Active', joinDate: '2022-06-20' },
  { id: 'STF-07', name: 'Adaeze Nwosu', role: 'Lead Receptionist & Patient Relations', department: 'Front Desk', phone: '+234 809 333 2211', shift: 'Morning (07:00 - 15:00)', status: 'Active', joinDate: '2024-02-01' },
  { id: 'STF-08', name: 'Sunday Eze', role: 'Chief Biomedical Engineer', department: 'Facilities & Tech', phone: '+234 810 555 9988', shift: 'On Call (24/7)', status: 'Active', joinDate: '2021-11-15' }
];

export const initialRolesPermissions = [
  { role: 'Super Administrator', patients: true, doctors: true, billing: true, staff: true, inventory: true, reports: true, settings: true },
  { role: 'Consultant Doctor', patients: true, doctors: true, billing: false, staff: false, inventory: true, reports: true, settings: false },
  { role: 'Head Nurse / Matron', patients: true, doctors: false, billing: false, staff: true, inventory: true, reports: false, settings: false },
  { role: 'Chief Pharmacist', patients: false, doctors: false, billing: true, staff: false, inventory: true, reports: true, settings: false },
  { role: 'Lab Scientist', patients: true, doctors: false, billing: false, staff: false, inventory: true, reports: false, settings: false },
  { role: 'Billing Officer', patients: true, doctors: false, billing: true, staff: false, inventory: false, reports: true, settings: false },
  { role: 'Receptionist / Front Desk', patients: true, doctors: false, billing: true, staff: false, inventory: false, reports: false, settings: false }
];

export const staffDistributionData = [
  { name: 'Nursing Services', count: 48, percent: 38, color: '#00C2FF' },
  { name: 'Medical Doctors', count: 30, percent: 24, color: '#0A1030' },
  { name: 'Administration & Front Desk', count: 20, percent: 16, color: '#0E86D4' },
  { name: 'Laboratory & Pathology', count: 15, percent: 12, color: '#38BDF8' },
  { name: 'Pharmacy & Therapeutics', count: 12, percent: 10, color: '#1E3A8A' }
];

export const attendanceBarData = [
  { day: 'Mon', present: 118, late: 4, absent: 3 },
  { day: 'Tue', present: 122, late: 2, absent: 1 },
  { day: 'Wed', present: 120, late: 3, absent: 2 },
  { day: 'Thu', present: 123, late: 1, absent: 1 },
  { day: 'Fri', present: 119, late: 4, absent: 2 },
  { day: 'Sat', present: 88, late: 2, absent: 0 },
  { day: 'Sun', present: 82, late: 1, absent: 0 }
];

export const initialAttendance = [
  { id: 'ATT-01', staffName: 'Sister Ngozi Uche', role: 'Head Nurse', date: '2026-11-18', checkIn: '06:55 AM', checkOut: '--:--', status: 'Present', workHours: 'In Progress' },
  { id: 'ATT-02', staffName: 'Yusuf Aliyu', role: 'Chief Pharmacist', date: '2026-11-18', checkIn: '07:50 AM', checkOut: '--:--', status: 'Present', workHours: 'In Progress' },
  { id: 'ATT-03', staffName: 'Dr. Kemi Adeleke', role: 'Medical Lab Scientist', date: '2026-11-18', checkIn: '08:15 AM', checkOut: '--:--', status: 'Late', workHours: 'In Progress' },
  { id: 'ATT-04', staffName: 'Patrick Bassey', role: 'Radiology Tech', date: '2026-11-18', checkIn: '01:45 PM', checkOut: '--:--', status: 'Present', workHours: 'In Progress' },
  { id: 'ATT-05', staffName: 'Tariq Bello', role: 'Billing Manager', date: '2026-11-18', checkIn: '07:58 AM', checkOut: '--:--', status: 'Present', workHours: 'In Progress' },
  { id: 'ATT-06', staffName: 'Adaeze Nwosu', role: 'Receptionist', date: '2026-11-18', checkIn: '06:48 AM', checkOut: '--:--', status: 'Present', workHours: 'In Progress' }
];

export const initialBills = [
  {
    invoiceNo: 'INV-2024-0841',
    patientId: 'PAT-1001',
    patientName: 'Olumide Adebayo',
    date: '2026-11-15',
    services: 'Cardiology Admission (3 Days) + ECG + Troponin Test',
    amount: 185000,
    paid: 185000,
    due: 0,
    status: 'Paid',
    method: 'Bank Transfer (GTBank)',
    items: [
      { name: 'Cardiology Inpatient Ward (3 nights)', qty: 3, rate: 20000, total: 60000 },
      { name: 'Specialist Consultation (Dr. Chidi Okafor)', qty: 2, rate: 25000, total: 50000 },
      { name: '12-Lead ECG Diagnostics', qty: 1, rate: 15000, total: 15000 },
      { name: 'Cardiac Troponin I Test', qty: 1, rate: 18000, total: 18000 },
      { name: 'Medications & IV Infusions', qty: 1, rate: 42000, total: 42000 }
    ]
  },
  {
    invoiceNo: 'INV-2024-0842',
    patientId: 'PAT-1002',
    patientName: 'Fatima Abubakar',
    date: '2026-11-16',
    services: 'Elective Caesarean Section + Maternity Suite',
    amount: 520000,
    paid: 350000,
    due: 170000,
    status: 'Partial',
    method: 'POS Card Payment',
    items: [
      { name: 'Caesarean Delivery Surgical Fee', qty: 1, rate: 350000, total: 350000 },
      { name: 'Private Maternity Suite (2 nights)', qty: 2, rate: 55000, total: 110000 },
      { name: 'Neonatal Pediatric Initial Care', qty: 1, rate: 35000, total: 35000 },
      { name: 'Pharmacy & Surgical Consumables', qty: 1, rate: 25000, total: 25000 }
    ]
  },
  {
    invoiceNo: 'INV-2024-0843',
    patientId: 'PAT-1003',
    patientName: 'Emeka Nwachukwu',
    date: '2026-11-18',
    services: 'Orthopedic Consultation + Spine MRI Scan',
    amount: 145000,
    paid: 145000,
    due: 0,
    status: 'Paid',
    method: 'HMO Insurance (Leadway Health)',
    items: [
      { name: 'Consultant Orthopedic Fee', qty: 1, rate: 25000, total: 25000 },
      { name: 'Lumbar Spine MRI 3.0T', qty: 1, rate: 120000, total: 120000 }
    ]
  },
  {
    invoiceNo: 'INV-2024-0844',
    patientId: 'PAT-1005',
    patientName: 'Tunde Bakare',
    date: '2026-11-15',
    services: 'Stroke Unit Discharge + Brain CT + Intensive Care',
    amount: 380000,
    paid: 380000,
    due: 0,
    status: 'Paid',
    method: 'Bank Transfer (Zenith)',
    items: [
      { name: 'Neurology Inpatient Care (5 days)', qty: 5, rate: 25000, total: 125000 },
      { name: 'Brain CT Scan 128-Slice', qty: 1, rate: 95000, total: 95000 },
      { name: 'Neuro Physio Therapy Sessions', qty: 4, rate: 20000, total: 80000 },
      { name: 'Neuro Pharmacy Regimen', qty: 1, rate: 80000, total: 80000 }
    ]
  },
  {
    invoiceNo: 'INV-2024-0845',
    patientId: 'PAT-1008',
    patientName: 'Chioma Eze',
    date: '2026-11-18',
    services: 'Emergency Room Resuscitation + Pre-op Workup',
    amount: 295000,
    paid: 0,
    due: 295000,
    status: 'Unpaid',
    method: 'Pending Authorization',
    items: [
      { name: 'Emergency Level-1 Bay Admission', qty: 1, rate: 35000, total: 35000 },
      { name: 'Abdominal Ultrasound Scan', qty: 1, rate: 25000, total: 25000 },
      { name: 'Pre-op Blood Transfusion Crossmatch', qty: 2, rate: 30000, total: 60000 },
      { name: 'Surgery Deposit (Laparoscopic Appendectomy)', qty: 1, rate: 175000, total: 175000 }
    ]
  }
];

export const initialPaymentRecords = [
  { ref: 'TXN-984210', invoiceNo: 'INV-2024-0841', patient: 'Olumide Adebayo', date: '2026-11-15 14:22', method: 'GTBank NIP Transfer', amount: 185000, cashier: 'Tariq Bello', status: 'Verified' },
  { ref: 'TXN-984211', invoiceNo: 'INV-2024-0842', patient: 'Fatima Abubakar', date: '2026-11-16 11:05', method: 'POS Terminal (Stanbic)', amount: 350000, cashier: 'Tariq Bello', status: 'Verified' },
  { ref: 'TXN-984212', invoiceNo: 'INV-2024-0843', patient: 'Emeka Nwachukwu', date: '2026-11-18 10:15', method: 'Leadway Health Portal', amount: 145000, cashier: 'Adaeze Nwosu', status: 'Verified' },
  { ref: 'TXN-984213', invoiceNo: 'INV-2024-0844', patient: 'Tunde Bakare', date: '2026-11-15 16:40', method: 'Zenith Bank Transfer', amount: 380000, cashier: 'Tariq Bello', status: 'Verified' },
  { ref: 'TXN-984214', invoiceNo: 'INV-2024-0839', patient: 'Grace Okafor', date: '2026-11-18 09:30', method: 'Cash Deposit', amount: 35000, cashier: 'Adaeze Nwosu', status: 'Verified' }
];

export const initialRefundRecords = [
  { refundId: 'RFD-101', invoiceNo: 'INV-2024-0820', patient: 'Ifeoma Okoli', amount: 25000, reason: 'Cancelled Ultrasound Procedure', date: '2026-11-12', approvedBy: 'Dr. Amina Bello', status: 'Completed' },
  { refundId: 'RFD-102', invoiceNo: 'INV-2024-0831', patient: 'Bayo Adeleke', amount: 10000, reason: 'Duplicate Pharmacy Dispensation', date: '2026-11-14', approvedBy: 'Tariq Bello', status: 'Completed' }
];

export const initialMedicines = [
  { id: 'MED-01', name: 'Amoxicillin + Clavulanate 625mg', category: 'Antibiotics', dosageForm: 'Tablets', stock: 18, reorderLevel: 50, expiry: '2027-05-30', unitPrice: 4500, status: 'Low Stock' },
  { id: 'MED-02', name: 'Paracetamol 500mg IV Infusion (100ml)', category: 'Analgesics', dosageForm: 'IV Bottle', stock: 240, reorderLevel: 60, expiry: '2027-12-15', unitPrice: 1800, status: 'In Stock' },
  { id: 'MED-03', name: 'Ceftriaxone 1g Injection Vial', category: 'Antibiotics', dosageForm: 'Injectable', stock: 12, reorderLevel: 40, expiry: '2026-12-30', unitPrice: 3200, status: 'Low Stock' },
  { id: 'MED-04', name: 'Artemether + Lumefantrine 80/480mg', category: 'Antimalarial', dosageForm: 'Tablets', stock: 320, reorderLevel: 100, expiry: '2028-02-28', unitPrice: 2800, status: 'In Stock' },
  { id: 'MED-05', name: 'Insulin Glargine 100 IU/ml Pen', category: 'Endocrinology', dosageForm: 'Pre-filled Pen', stock: 8, reorderLevel: 25, expiry: '2027-04-10', unitPrice: 14500, status: 'Critical Low' },
  { id: 'MED-06', name: 'Salbutamol Inhaler 100mcg (200 Doses)', category: 'Respiratory', dosageForm: 'Aerosol Inhaler', stock: 65, reorderLevel: 30, expiry: '2027-09-18', unitPrice: 4200, status: 'In Stock' },
  { id: 'MED-07', name: 'Normal Saline 0.9% IV 500ml', category: 'IV Fluids', dosageForm: 'IV Bag', stock: 450, reorderLevel: 120, expiry: '2028-06-30', unitPrice: 1200, status: 'In Stock' },
  { id: 'MED-08', name: 'Amlodipine 10mg Tablets', category: 'Cardiovascular', dosageForm: 'Strip of 10', stock: 190, reorderLevel: 50, expiry: '2027-11-20', unitPrice: 2000, status: 'In Stock' }
];

export const initialMedicalEquipment = [
  { id: 'EQP-01', name: 'Dräger Evita V300 Critical Care Ventilator', model: 'EV-300-X', department: 'ICU', serialNo: 'DRG-ICU-8821', lastService: '2026-10-15', nextService: '2027-04-15', status: 'Operational' },
  { id: 'EQP-02', name: 'Philips HeartStart Defibrillator & Monitor', model: 'MRx Pro', department: 'Emergency & Trauma', serialNo: 'PHL-ER-1029', lastService: '2026-11-01', nextService: '2027-05-01', status: 'Operational' },
  { id: 'EQP-03', name: 'Mindray BeneVision N12 Patient Monitor', model: 'N12 Vitals', department: 'Operation Theater 2', serialNo: 'MDR-OT-4401', lastService: '2026-09-12', nextService: '2027-03-12', status: 'Operational' },
  { id: 'EQP-04', name: 'GE Optima 128-Slice CT Scanner', model: 'Optima CT660', department: 'Radiology', serialNo: 'GE-RAD-9912', lastService: '2026-11-10', nextService: '2027-02-10', status: 'Operational' },
  { id: 'EQP-05', name: 'Fresenius 5008S Hemodialysis Machine', model: '5008S CorDiax', department: 'Dialysis Unit', serialNo: 'FRS-DIA-3310', lastService: '2026-08-20', nextService: '2026-11-30', status: 'Service Due' },
  { id: 'EQP-06', name: 'Olympus EVIS EXERA III Endoscopy Tower', model: 'CV-190', department: 'Gastroenterology', serialNo: 'OLY-END-5520', lastService: '2026-07-14', nextService: '2027-01-14', status: 'Operational' }
];

export const initialPurchaseRecords = [
  { poNumber: 'PO-2024-0310', supplier: 'Emzor Pharmaceuticals Ltd', date: '2026-11-10', itemsSummary: 'IV Fluids, Antibiotics & Consumables', amount: 1450000, deliveryDate: '2026-11-14', status: 'Delivered' },
  { poNumber: 'PO-2024-0311', supplier: 'Fidson Healthcare Plc', date: '2026-11-12', itemsSummary: 'Antimalarials, Analgesics & Vitamins', amount: 890000, deliveryDate: '2026-11-17', status: 'Delivered' },
  { poNumber: 'PO-2024-0312', supplier: 'MedTech Diagnostics Nigeria', date: '2026-11-16', itemsSummary: 'Dialysis Cartridges & Lab Reagents', amount: 1250000, deliveryDate: '2026-11-22', status: 'In Transit' },
  { poNumber: 'PO-2024-0313', supplier: 'Swiss Pharma Nigeria (Swipha)', date: '2026-11-17', itemsSummary: 'Emergency Critical Insulin & Anesthesia', amount: 620000, deliveryDate: '2026-11-20', status: 'Pending Approval' }
];

export const userProfileData = {
  name: 'Dr. Amina Bello',
  title: 'Chief Medical Director & Lead Consultant',
  email: 'amina.bello@nairahospital.ng',
  phone: '+234 803 123 4567',
  role: 'Super Administrator',
  department: 'General Medicine & Executive Board',
  hospitalName: 'NAIRA Specialist Hospital & Medical Centre',
  location: 'Victoria Island, Lagos, Nigeria',
  licenseNo: 'MDCN-REG-34891',
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
  notifications: {
    emergencyBroadcasts: true,
    lowStockAlerts: true,
    financialSummaryDaily: true,
    admissionSmsAlerts: true,
    doctorShiftHandoff: false,
    securityAuditLog: true
  },
  preferences: {
    currencySymbol: '₦',
    timezone: 'Africa/Lagos (WAT, GMT+1)',
    taxRate: '7.5% VAT',
    emergencyHotline: '+234 800 NAIRA (62472)',
    autoBackup: 'Daily at 02:00 AM'
  }
};

// Additional Chart Datasets for Sub-menu Pages

export const patientsByDepartmentData = [
  { label: 'Cardiology', count: 340, percent: 27, color: '#00C2FF' },
  { label: 'Orthopedics', count: 285, percent: 23, color: '#0E86D4' },
  { label: 'Pediatrics', count: 250, percent: 20, color: '#1E3A8A' },
  { label: 'Obstetrics & Gyn', count: 215, percent: 17, color: '#38BDF8' },
  { label: 'Emergency & Others', count: 158, percent: 13, color: '#0077B6' }
];

export const newPatientsMonthlyData = [
  { label: 'Jan', value: 140 },
  { label: 'Feb', value: 165 },
  { label: 'Mar', value: 195 },
  { label: 'Apr', value: 180 },
  { label: 'May', value: 220 },
  { label: 'Jun', value: 245 },
  { label: 'Jul', value: 260 }
];

export const dailyAdmissionsData = [
  { label: 'Mon', value: 18 },
  { label: 'Tue', value: 24 },
  { label: 'Wed', value: 19 },
  { label: 'Thu', value: 28 },
  { label: 'Fri', value: 22 },
  { label: 'Sat', value: 14 },
  { label: 'Sun', value: 11 }
];

export const doctorsByDepartmentData = [
  { label: 'Cardiology', count: 8, percent: 17, color: '#00C2FF' },
  { label: 'Surgery & Ortho', count: 11, percent: 23, color: '#0E86D4' },
  { label: 'Pediatrics', count: 8, percent: 17, color: '#1E3A8A' },
  { label: 'Obstetrics & Gyn', count: 7, percent: 15, color: '#38BDF8' },
  { label: 'Emergency & Trauma', count: 8, percent: 17, color: '#0077B6' },
  { label: 'Neurology & Radiology', count: 6, percent: 11, color: '#0A1030' }
];

export const patientsPerDepartmentBarData = [
  { label: 'Cardio', value: 340 },
  { label: 'Ortho', value: 285 },
  { label: 'Paed', value: 250 },
  { label: 'OBGYN', value: 215 },
  { label: 'Neuro', value: 180 },
  { label: 'ER', value: 210 }
];

export const appointmentStatusPieData = [
  { label: 'Completed', count: 126, percent: 70, color: '#10B981' },
  { label: 'Pending', count: 34, percent: 19, color: '#F59E0B' },
  { label: 'Cancelled', count: 20, percent: 11, color: '#EF4444' }
];

export const appointmentsPerDayData = [
  { label: 'Mon', value: 32 },
  { label: 'Tue', value: 38 },
  { label: 'Wed', value: 35 },
  { label: 'Thu', value: 40 },
  { label: 'Fri', value: 34 },
  { label: 'Sat', value: 16 },
  { label: 'Sun', value: 12 }
];

export const appointmentsPerWeekData = [
  { label: 'Week 1', value: 42 },
  { label: 'Week 2', value: 48 },
  { label: 'Week 3', value: 54 },
  { label: 'Week 4', value: 46 }
];

export const servicesByCategoryData = [
  { label: 'Consultations', count: 24, percent: 28, color: '#00C2FF' },
  { label: 'Surgical Procedures', count: 18, percent: 21, color: '#0E86D4' },
  { label: 'Laboratory Tests', count: 19, percent: 22, color: '#38BDF8' },
  { label: 'Radiology / Imaging', count: 16, percent: 19, color: '#1E3A8A' },
  { label: 'Inpatient Suites', count: 8, percent: 10, color: '#0077B6' }
];

export const staffByRolePieData = [
  { label: 'Nursing Services', count: 48, percent: 38, color: '#00C2FF' },
  { label: 'Consultant Doctors', count: 30, percent: 24, color: '#0A1030' },
  { label: 'Administration', count: 20, percent: 16, color: '#0E86D4' },
  { label: 'Medical Lab Scientists', count: 15, percent: 12, color: '#38BDF8' },
  { label: 'Pharmacists & Techs', count: 12, percent: 10, color: '#1E3A8A' }
];

export const monthlyRevenueBarData = [
  { label: 'Jan', value: 2800000 },
  { label: 'Feb', value: 3150000 },
  { label: 'Mar', value: 3600000 },
  { label: 'Apr', value: 3450000 },
  { label: 'May', value: 3900000 },
  { label: 'Jun', value: 4120000 },
  { label: 'Jul', value: 4285000 }
];

export const paymentMethodsPieData = [
  { label: 'POS Card Terminals', count: 1850000, percent: 43, color: '#00C2FF' },
  { label: 'HMO Insurance Schemes', count: 1240000, percent: 29, color: '#0E86D4' },
  { label: 'Bank Transfers (NIP)', count: 810000, percent: 19, color: '#1E3A8A' },
  { label: 'Cash Desk', count: 385000, percent: 9, color: '#38BDF8' }
];

export const monthlyCollectionBarData = [
  { label: 'Jan', value: 2450000 },
  { label: 'Feb', value: 2800000 },
  { label: 'Mar', value: 3200000 },
  { label: 'Apr', value: 3100000 },
  { label: 'May', value: 3550000 },
  { label: 'Jun', value: 3720000 },
  { label: 'Jul', value: 3820000 }
];

export const revenueVsExpensesData = [
  { label: 'Jan', revenue: 2800000, expenses: 1900000 },
  { label: 'Feb', revenue: 3150000, expenses: 2100000 },
  { label: 'Mar', revenue: 3600000, expenses: 2350000 },
  { label: 'Apr', revenue: 3450000, expenses: 2200000 },
  { label: 'May', revenue: 3900000, expenses: 2450000 },
  { label: 'Jun', revenue: 4120000, expenses: 2600000 },
  { label: 'Jul', revenue: 4285000, expenses: 2700000 }
];
