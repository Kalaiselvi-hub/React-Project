import React, { useState } from 'react';
import {
  Stethoscope,
  UserPlus,
  Building2,
  Calendar,
  Lock,
  Phone,
  Mail,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  KeyRound,
  Eye,
  Users
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { PieChartWidget } from '../charts/PieChartWidget';
import { BarChartWidget } from '../charts/BarChartWidget';
import {
  doctorsByDepartmentData,
  patientsPerDepartmentBarData
} from '../../data/mockData';

export const DoctorsView = () => {
  const {
    doctors,
    doctorsSubTab,
    navigateTo,
    departments,
    toggleDoctorDuty,
    toggleDoctorLoginStatus,
    setIsAddDoctorModalOpen,
    addDoctor,
    showToast
  } = useHospital();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');

  // Inline form state for "Add New Doctor"
  const [formData, setFormData] = useState({
    name: '',
    department: 'Cardiology',
    specialization: '',
    qualification: 'MBBS, FWACS',
    phone: '',
    email: '',
    experience: '5 Years',
    consultationFee: 20000
  });

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    addDoctor({
      ...formData,
      consultationFee: parseInt(formData.consultationFee, 10) || 20000
    });
    setFormData({
      name: '',
      department: 'Cardiology',
      specialization: '',
      qualification: 'MBBS, FWACS',
      phone: '',
      email: '',
      experience: '5 Years',
      consultationFee: 20000
    });
    navigateTo('doctors', 'list');
  };

  const filteredDoctors = doctors.filter((doc) => {
    if (selectedDeptFilter === 'All') return true;
    return doc.department.toLowerCase().includes(selectedDeptFilter.toLowerCase());
  });

  return (
    <div className="view-container doctors-view">
      {/* Header */}
      <div className="view-header">
        <div>
          <h2 className="view-title">
            {doctorsSubTab === 'list' && 'Doctor Directory'}
            {doctorsSubTab === 'add' && 'Add New Doctor'}
            {doctorsSubTab === 'departments' && 'Hospital Departments'}
            {doctorsSubTab === 'schedules' && 'Doctor Duty Schedules'}
            {doctorsSubTab === 'loginAccess' && 'Doctor Portal Login Access'}
          </h2>
          <p className="view-description">
            {doctorsSubTab === 'list' && 'Medical specialists, clinical qualifications, duty availability, and consultation tariffs'}
            {doctorsSubTab === 'add' && 'Register consultant credentials, department affiliation, and clinical fee structure'}
            {doctorsSubTab === 'departments' && 'Departmental leadership, specialty capacity, and bed allocations'}
            {doctorsSubTab === 'schedules' && 'Weekly duty roster across operating theaters, wards, and on-call shifts'}
            {doctorsSubTab === 'loginAccess' && 'Physician EHR portal security, two-factor authentication, and credential status'}
          </p>
        </div>
        <div className="view-actions">
          <button
            className="btn btn-teal-primary"
            onClick={() => setIsAddDoctorModalOpen(true)}
          >
            <UserPlus size={16} /> Add New Doctor
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Doctor List + Pie Chart for Doctors by Department */}
      {doctorsSubTab === 'list' && (
        <div className="space-y-4">
          <div className="content-card">
            <div className="table-filter-bar">
              <div className="filter-group">
                <span className="filter-label">Department:</span>
                <button
                  className={`filter-chip ${selectedDeptFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setSelectedDeptFilter('All')}
                >
                  All Departments
                </button>
                {departments.slice(0, 5).map((d) => (
                  <button
                    key={d.id}
                    className={`filter-chip ${selectedDeptFilter === d.name ? 'active' : ''}`}
                    onClick={() => setSelectedDeptFilter(d.name)}
                  >
                    {d.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="view-toggle-buttons">
                <button
                  className={`btn-toggle-view ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Card Grid
                </button>
                <button
                  className={`btn-toggle-view ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  Table View
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="doctor-cards-grid p-4">
                {filteredDoctors.map((doc) => (
                  <div key={doc.id} className="doctor-profile-card">
                    <div className="doc-card-top">
                      <img src={doc.avatar} alt={doc.name} className="doc-avatar-img" />
                      <div className="doc-status-badge-wrap">
                        <button
                          className={`doc-duty-badge duty-${doc.status.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => toggleDoctorDuty(doc.id)}
                          title="Click to toggle duty status"
                        >
                          ● {doc.status}
                        </button>
                      </div>
                    </div>

                    <div className="doc-card-body">
                      <h3 className="doc-name">{doc.name}</h3>
                      <p className="doc-spec">{doc.specialization}</p>
                      <span className="badge badge-dept mb-2">{doc.department}</span>

                      <div className="doc-meta-info">
                        <div className="meta-row">
                          <span className="text-muted">Experience:</span>
                          <strong>{doc.experience}</strong>
                        </div>
                        <div className="meta-row">
                          <span className="text-muted">Consultation:</span>
                          <strong className="text-teal font-mono">₦{doc.consultationFee.toLocaleString()}</strong>
                        </div>
                        <div className="meta-row">
                          <span className="text-muted">Rating:</span>
                          <span className="rating-pill">
                            <Star size={13} fill="#F59E0B" color="#F59E0B" /> {doc.rating} / 5.0
                          </span>
                        </div>
                      </div>

                      <div className="doc-contact-info mt-3">
                        <div className="contact-row">
                          <Phone size={13} className="text-muted" />
                          <span>{doc.phone}</span>
                        </div>
                        <div className="contact-row">
                          <Mail size={13} className="text-muted" />
                          <span>{doc.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="doc-card-footer">
                      <button
                        className="btn btn-outline-teal btn-sm w-full"
                        onClick={() => navigateTo('doctors', 'schedules')}
                      >
                        <Clock size={14} /> View Weekly Schedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="naira-table">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Department</th>
                      <th>Specialization</th>
                      <th>Phone</th>
                      <th>Consultation (₦)</th>
                      <th>Status</th>
                      <th className="text-right">Duty Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctors.map((doc) => (
                      <tr key={doc.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <img src={doc.avatar} alt={doc.name} className="avatar-xs" />
                            <div>
                              <strong>{doc.name}</strong>
                              <div className="text-xs text-muted">{doc.qualification}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-dept">{doc.department}</span>
                        </td>
                        <td>{doc.specialization}</td>
                        <td className="font-mono text-sm">{doc.phone}</td>
                        <td className="font-mono text-teal font-bold">₦{doc.consultationFee.toLocaleString()}</td>
                        <td>
                          <span className={`status-pill pill-${doc.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="text-right">
                          <button
                            className="btn btn-outline-teal btn-sm"
                            onClick={() => toggleDoctorDuty(doc.id)}
                          >
                            Toggle Duty
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pie Chart for Doctors by Department */}
          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <Stethoscope size={18} className="text-teal" />
                <div>
                  <h3>Doctors by Department</h3>
                  <p className="card-subtext">Clinical specialists distribution across hospital divisions</p>
                </div>
              </div>
            </div>
            <div className="p-3">
              <PieChartWidget
                data={doctorsByDepartmentData}
                centerTitle="48"
                centerSubtitle="Consultants"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Add New Doctor Form */}
      {doctorsSubTab === 'add' && (
        <div className="content-card max-w-4xl mx-auto">
          <div className="card-header-bar">
            <div className="card-header-title">
              <UserPlus size={20} className="text-teal" />
              <div>
                <h3>Register Specialist Consultant</h3>
                <p className="card-subtext">Add credentials, department assignment, and consultation tariffs</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleInlineSubmit} className="p-4 form-grid">
            <div className="form-group col-span-2">
              <label>Doctor Full Name (with Title) *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Kelechi Nwosu"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Department *</label>
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
              <label>Specialization Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Consultant Cardiologist"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Medical Qualifications</label>
              <input
                type="text"
                placeholder="MBBS, FWACS, MRCP"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Years of Clinical Experience</label>
              <input
                type="text"
                placeholder="10 Years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+234 803 555 7788"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="doctor@nairahospital.ng"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group col-span-2">
              <label>Consultation Fee (in Nigerian Naira ₦) *</label>
              <input
                type="number"
                required
                min="0"
                step="1000"
                placeholder="25000"
                value={formData.consultationFee}
                onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigateTo('doctors', 'list')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-teal-primary">
                Save Doctor Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sub-tab 3: Departments + Charts (Pie: Doctors per Dept, Bar: Patients per Dept) */}
      {doctorsSubTab === 'departments' && (
        <div className="space-y-4">
          <div className="dashboard-grid-layout">
            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <Stethoscope size={18} className="text-teal" />
                  <div>
                    <h3>Doctors per Department</h3>
                    <p className="card-subtext">Physician allocation per medical wing</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <PieChartWidget
                  data={doctorsByDepartmentData}
                  centerTitle="48"
                  centerSubtitle="Doctors"
                />
              </div>
            </div>

            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <Users size={18} className="text-teal" />
                  <div>
                    <h3>Patients per Department</h3>
                    <p className="card-subtext">Inpatient & outpatient patient volume</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <BarChartWidget data={patientsPerDepartmentBarData} unit="Patients" />
              </div>
            </div>
          </div>

          <div className="departments-grid">
            {departments.map((dept) => (
              <div key={dept.id} className="content-card dept-card">
                <div className="dept-card-header">
                  <div className="dept-code-pill">{dept.code}</div>
                  <span className="badge badge-success">{dept.status}</span>
                </div>
                <h3 className="dept-name">{dept.name}</h3>
                <p className="dept-head">
                  <span className="text-muted">Head of Dept:</span> <strong>{dept.head}</strong>
                </p>

                <div className="dept-stats-row mt-3">
                  <div className="dept-stat-box">
                    <span className="stat-num">{dept.doctorsCount}</span>
                    <span className="stat-label">Doctors</span>
                  </div>
                  <div className="dept-stat-box">
                    <span className="stat-num">{dept.bedsCount}</span>
                    <span className="stat-label">Beds</span>
                  </div>
                  <div className="dept-stat-box">
                    <span className="stat-num text-teal">{dept.activeCases}</span>
                    <span className="stat-label">Active Cases</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 4: Doctor Schedules */}
      {doctorsSubTab === 'schedules' && (
        <div className="content-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Calendar size={18} className="text-teal" />
              <div>
                <h3>Weekly Consultant Duty Roster</h3>
                <p className="card-subtext">Operating theater, clinic consultation, and on-call rotation</p>
              </div>
            </div>
            <span className="badge badge-teal">Week 47 • November 2026</span>
          </div>

          <div className="table-responsive">
            <table className="naira-table schedule-table">
              <thead>
                <tr>
                  <th>Doctor & Specialty</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <strong>{doc.name}</strong>
                      <div className="text-xs text-teal">{doc.department}</div>
                    </td>
                    <td><span className="shift-pill">{doc.schedule?.Monday || '08:00 - 16:00'}</span></td>
                    <td><span className="shift-pill">{doc.schedule?.Tuesday || '08:00 - 16:00'}</span></td>
                    <td><span className="shift-pill">{doc.schedule?.Wednesday || '08:00 - 16:00'}</span></td>
                    <td><span className="shift-pill">{doc.schedule?.Thursday || '08:00 - 16:00'}</span></td>
                    <td><span className="shift-pill">{doc.schedule?.Friday || '08:00 - 14:00'}</span></td>
                    <td><span className="shift-pill on-call">{doc.schedule?.Saturday || 'On Call'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-tab 5: Doctor Login Access */}
      {doctorsSubTab === 'loginAccess' && (
        <div className="content-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Lock size={18} className="text-teal" />
              <div>
                <h3>Physician Portal Security & Credentials</h3>
                <p className="card-subtext">Manage electronic health records (EHR) access, 2FA, and authentication status</p>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="naira-table">
              <thead>
                <tr>
                  <th>Physician</th>
                  <th>Username</th>
                  <th>Security Role</th>
                  <th>2-Factor Auth (2FA)</th>
                  <th>Last Portal Access</th>
                  <th>Account Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <strong>{doc.name}</strong>
                      <div className="text-xs text-muted">{doc.email}</div>
                    </td>
                    <td className="font-mono text-teal">{doc.loginAccess?.username || 'doc.user'}</td>
                    <td>
                      <span className="badge badge-dept">{doc.loginAccess?.role || 'Consultant'}</span>
                    </td>
                    <td>
                      {doc.loginAccess?.twoFactor ? (
                        <span className="badge badge-success flex items-center gap-1 w-max">
                          <ShieldCheck size={13} /> Enabled (OTP)
                        </span>
                      ) : (
                        <span className="badge badge-warning flex items-center gap-1 w-max">
                          <XCircle size={13} /> Disabled
                        </span>
                      )}
                    </td>
                    <td className="text-sm">{doc.loginAccess?.lastLogin || 'Recent'}</td>
                    <td>
                      <span
                        className={`status-pill ${
                          doc.loginAccess?.active ? 'pill-confirmed' : 'pill-cancelled'
                        }`}
                      >
                        {doc.loginAccess?.active ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="action-buttons-row justify-end">
                        <button
                          className="btn btn-outline-teal btn-sm"
                          onClick={() => toggleDoctorLoginStatus(doc.id)}
                        >
                          {doc.loginAccess?.active ? 'Suspend' : 'Activate'}
                        </button>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => showToast(`Password reset link sent to ${doc.email}`)}
                          title="Reset Password"
                        >
                          <KeyRound size={14} /> Reset
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
