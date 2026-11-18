import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  FileText,
  UserCheck,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle2,
  HeartPulse,
  Activity,
  Phone,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { PieChartWidget } from '../charts/PieChartWidget';
import { BarChartWidget } from '../charts/BarChartWidget';
import {
  patientsByDepartmentData,
  newPatientsMonthlyData,
  dailyAdmissionsData
} from '../../data/mockData';

export const PatientsView = () => {
  const {
    patients,
    patientsSubTab,
    navigateTo,
    setSelectedPatient,
    setIsPatientModalOpen,
    setIsAddPatientModalOpen,
    dischargePatient,
    deletePatient,
    addPatient,
    doctors,
    departments
  } = useHospital();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Form state for inline "Add New Patient"
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: 'Male',
    age: '',
    bloodGroup: 'O+',
    department: 'General Medicine',
    doctor: 'Dr. Amina Bello',
    diagnosis: '',
    emergencyContact: '',
    address: ''
  });

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    addPatient({
      ...formData,
      age: parseInt(formData.age, 10) || 30
    });
    setFormData({
      name: '',
      phone: '',
      gender: 'Male',
      age: '',
      bloodGroup: 'O+',
      department: 'General Medicine',
      doctor: 'Dr. Amina Bello',
      diagnosis: '',
      emergencyContact: '',
      address: ''
    });
    navigateTo('patients', 'list');
  };

  const handleOpenPatientRecord = (patient) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  };

  // Filtered patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'All' ? true : p.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const dischargedPatients = patients.filter((p) => p.status === 'Discharged');

  return (
    <div className="view-container patients-view">
      {/* Header */}
      <div className="view-header">
        <div>
          <h2 className="view-title">
            {patientsSubTab === 'list' && 'Patient Directory'}
            {patientsSubTab === 'add' && 'Add New Patient'}
            {patientsSubTab === 'records' && 'Clinical Patient Records'}
            {patientsSubTab === 'admissions' && 'Admissions & Discharged Patients'}
          </h2>
          <p className="view-description">
            {patientsSubTab === 'list' && 'Active inpatient and outpatient registry with primary attending doctor and department'}
            {patientsSubTab === 'add' && 'Register a new patient admission with emergency contact, assigned physician, and diagnosis'}
            {patientsSubTab === 'records' && 'Electronic health records, vital signs history, and active medication regimens'}
            {patientsSubTab === 'admissions' && 'Discharge log, recovery outcome history, and daily admission velocity'}
          </p>
        </div>
        <div className="view-actions">
          <button
            className="btn btn-teal-primary"
            onClick={() => setIsAddPatientModalOpen(true)}
          >
            <UserPlus size={16} /> Register Patient
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Patient List Table + Visualizations */}
      {patientsSubTab === 'list' && (
        <div className="space-y-4">
          <div className="content-card">
            <div className="table-filter-bar">
              <div className="search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search by ID, Name or Phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <Filter size={16} className="text-muted" />
                <span className="filter-label">Status:</span>
                {['All', 'Admitted', 'Outpatient', 'Discharged'].map((st) => (
                  <button
                    key={st}
                    className={`filter-chip ${statusFilter === st ? 'active' : ''}`}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Patient Name</th>
                    <th>Age / Sex</th>
                    <th>Contact Phone</th>
                    <th>Blood Group</th>
                    <th>Assigned Doctor</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-muted">
                        No patient records found matching current criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((p) => (
                      <tr key={p.id}>
                        <td className="font-mono font-bold text-teal">{p.id}</td>
                        <td>
                          <div
                            className="patient-name-link"
                            onClick={() => handleOpenPatientRecord(p)}
                          >
                            {p.name}
                          </div>
                        </td>
                        <td>
                          {p.age}y / <span className="text-muted">{p.gender}</span>
                        </td>
                        <td className="font-mono text-sm">{p.phone}</td>
                        <td>
                          <span className="blood-badge">{p.bloodGroup}</span>
                        </td>
                        <td>{p.doctor}</td>
                        <td>
                          <span className="badge badge-dept">{p.department}</span>
                        </td>
                        <td>
                          <span className={`status-pill pill-${p.status.toLowerCase()}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="action-buttons-row justify-end">
                            <button
                              className="btn-icon-view"
                              title="View Full Clinical Record"
                              onClick={() => handleOpenPatientRecord(p)}
                            >
                              <Eye size={16} />
                            </button>
                            {p.status !== 'Discharged' && (
                              <button
                                className="btn-icon-check"
                                title="Mark as Discharged"
                                onClick={() => dischargePatient(p.id)}
                              >
                                <UserCheck size={16} />
                              </button>
                            )}
                            <button
                              className="btn-icon-danger"
                              title="Remove Record"
                              onClick={() => {
                                if (window.confirm(`Delete record for ${p.name}?`)) {
                                deletePatient(p.id);
                              }
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="card-footer-strip">
            <span className="text-muted">
              Displaying {filteredPatients.length} of {patients.length} total registered patients
            </span>
            <button
              className="btn btn-outline-teal btn-sm"
              onClick={() => setIsAddPatientModalOpen(true)}
            >
              + Quick Register
            </button>
          </div>
        </div>

        {/* Visual Charts: Pie Chart for Patient by Dept + Bar Chart for New Patients per Month */}
        <div className="dashboard-grid-layout">
          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <Users size={18} className="text-teal" />
                <div>
                  <h3>Patient by Department</h3>
                  <p className="card-subtext">Clinical distribution of inpatient & outpatient caseload</p>
                </div>
              </div>
            </div>
            <div className="p-3">
              <PieChartWidget
                data={patientsByDepartmentData}
                centerTitle="1,248"
                centerSubtitle="Total Patients"
              />
            </div>
          </div>

          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <TrendingUp size={18} className="text-teal" />
                <div>
                  <h3>New Patients per Month</h3>
                  <p className="card-subtext">Monthly patient intake volume trajectory</p>
                </div>
              </div>
            </div>
            <div className="p-3">
              <BarChartWidget data={newPatientsMonthlyData} unit="Patients" />
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Sub-tab 2: Add New Patient Form */}
      {patientsSubTab === 'add' && (
        <div className="content-card max-w-4xl mx-auto">
          <div className="card-header-bar">
            <div className="card-header-title">
              <UserPlus size={20} className="text-teal" />
              <div>
                <h3>Add New Patient Registration</h3>
                <p className="card-subtext">Register inpatient or outpatient file with clinical diagnosis</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleInlineSubmit} className="p-4 form-grid">
            <div className="form-group col-span-2">
              <label>Patient Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Babajide Fashola"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+234 803 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="form-control"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Age (Years) *</label>
              <input
                type="number"
                required
                min="0"
                placeholder="35"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="form-control"
              >
                <option value="O+">O Positive (O+)</option>
                <option value="O-">O Negative (O-)</option>
                <option value="A+">A Positive (A+)</option>
                <option value="A-">A Negative (A-)</option>
                <option value="B+">B Positive (B+)</option>
                <option value="B-">B Negative (B-)</option>
                <option value="AB+">AB Positive (AB+)</option>
                <option value="AB-">AB Negative (AB-)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="form-control"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Assigned Physician</label>
              <select
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                className="form-control"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.name}>{d.name} ({d.department})</option>
                ))}
              </select>
            </div>

            <div className="form-group col-span-2">
              <label>Clinical Diagnosis / Admission Notes</label>
              <input
                type="text"
                placeholder="e.g. Acute chest pain, shortness of breath on exertion"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group col-span-2">
              <label>Emergency Contact</label>
              <input
                type="text"
                placeholder="e.g. Adeola Fashola (Sister) - +234 802 111 2233"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group col-span-2">
              <label>Residential Address</label>
              <input
                type="text"
                placeholder="e.g. 15 Adeola Odeku St, Victoria Island, Lagos"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigateTo('patients', 'list')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-teal-primary">
                Admit Patient Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sub-tab 3: Patient Records */}
      {patientsSubTab === 'records' && (
        <div className="patient-records-grid">
          {patients.map((p) => (
            <div key={p.id} className="content-card patient-record-preview-card">
              <div className="preview-card-header">
                <div className="avatar-pill">
                  {p.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="preview-patient-name">{p.name}</h4>
                  <span className="font-mono text-teal text-sm">{p.id}</span>
                </div>
                <span className={`status-pill pill-${p.status.toLowerCase()}`}>
                  {p.status}
                </span>
              </div>

              <div className="preview-card-body">
                <div className="preview-row">
                  <span className="text-muted">Age/Gender:</span>
                  <span>{p.age}y • {p.gender}</span>
                </div>
                <div className="preview-row">
                  <span className="text-muted">Diagnosis:</span>
                  <strong className="text-navy">{p.diagnosis || 'Clinical evaluation'}</strong>
                </div>
                <div className="preview-row">
                  <span className="text-muted">Doctor:</span>
                  <span>{p.doctor}</span>
                </div>
                <div className="preview-row">
                  <span className="text-muted">Vitals BP:</span>
                  <span className="font-mono text-teal">{p.vitals?.bp || '120/80'}</span>
                </div>
              </div>

              <div className="preview-card-footer">
                <button
                  className="btn btn-outline-teal btn-sm w-full"
                  onClick={() => handleOpenPatientRecord(p)}
                >
                  <Eye size={14} /> Open Full Medical File
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-tab 4: Admissions & Discharged */}
      {(patientsSubTab === 'admissions' || patientsSubTab === 'discharged') && (
        <div className="space-y-4">
          {/* Bar Chart for Daily Admissions */}
          <div className="content-card p-4">
            <div className="card-header-bar mb-3">
              <div className="card-header-title">
                <Activity size={18} className="text-teal" />
                <div>
                  <h3>Daily Admissions (Current Week)</h3>
                  <p className="card-subtext">Number of patients admitted to inpatient wards per day</p>
                </div>
              </div>
              <span className="badge badge-teal">Total: 136 Admissions</span>
            </div>
            <BarChartWidget data={dailyAdmissionsData} unit="Admissions" barColor="#00C2FF" />
          </div>

          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <UserCheck size={18} className="text-teal" />
                <div>
                  <h3>Discharged Patients & Recovery History</h3>
                  <p className="card-subtext">Patients successfully discharged following treatment completion</p>
                </div>
              </div>
              <span className="badge badge-teal">{dischargedPatients.length} Recovered Patients</span>
            </div>

            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Discharge Date</th>
                    <th>Attending Doctor</th>
                    <th>Final Diagnosis</th>
                    <th>Recovery Status</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dischargedPatients.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        No discharged patients in current cycle.
                      </td>
                    </tr>
                  ) : (
                    dischargedPatients.map((p) => (
                      <tr key={p.id}>
                        <td className="font-mono text-teal font-bold">{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.age}y</td>
                        <td className="font-mono">{p.dischargeDate || '2026-11-15'}</td>
                        <td>{p.doctor}</td>
                        <td>{p.diagnosis}</td>
                        <td>
                          <span className="badge badge-success">Recovered & Discharged</span>
                        </td>
                        <td className="text-right">
                          <button
                            className="btn btn-outline-teal btn-sm"
                            onClick={() => handleOpenPatientRecord(p)}
                          >
                            <Eye size={14} /> View File
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
