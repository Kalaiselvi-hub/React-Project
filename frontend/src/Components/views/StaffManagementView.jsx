import React, { useState } from 'react';
import {
  UserCog,
  UserPlus,
  Shield,
  CalendarCheck2,
  PieChart as PieIcon,
  Search,
  Filter,
  Check,
  X,
  Phone,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { PieChartWidget } from '../charts/PieChartWidget';
import { AttendanceBarChart } from '../charts/AttendanceBarChart';
import {
  staffByRolePieData,
  attendanceBarData
} from '../../data/mockData';

export const StaffManagementView = () => {
  const {
    staffList,
    staffSubTab,
    navigateTo,
    rolesPermissions,
    attendance,
    setIsAddStaffModalOpen,
    addStaff,
    togglePermission
  } = useHospital();

  const [searchTerm, setSearchTerm] = useState('');

  // Inline form state
  const [formData, setFormData] = useState({
    name: '',
    role: 'Staff Nurse',
    department: 'Nursing Services',
    phone: '',
    shift: 'Morning (07:00 - 15:00)'
  });

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addStaff(formData);
    setFormData({
      name: '',
      role: 'Staff Nurse',
      department: 'Nursing Services',
      phone: '',
      shift: 'Morning (07:00 - 15:00)'
    });
    navigateTo('staff', 'list');
  };

  const filteredStaff = staffList.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-container staff-view">
      {/* Header */}
      <div className="view-header">
        <div>
          <h2 className="view-title">
            {staffSubTab === 'list' && 'Hospital Staff Directory'}
            {staffSubTab === 'add' && 'Onboard New Staff Member'}
            {staffSubTab === 'permissions' && 'Staff Roles & Shifts Permissions'}
            {staffSubTab === 'attendance' && 'Daily Attendance & Shift Logs'}
          </h2>
          <p className="view-description">
            {staffSubTab === 'list' && 'Nursing administration, allied healthcare personnel, laboratory scientists, and hospital technicians'}
            {staffSubTab === 'add' && 'Register employee credentials, duty shift timings, and department allocation'}
            {staffSubTab === 'permissions' && 'Module-level authorization matrix and system privilege switches'}
            {staffSubTab === 'attendance' && 'Biometric check-in timestamps and daily duty attendance compliance'}
          </p>
        </div>
        <div className="view-actions">
          <button
            className="btn btn-teal-primary"
            onClick={() => setIsAddStaffModalOpen(true)}
          >
            <UserPlus size={16} /> Add New Staff
          </button>
        </div>
      </div>

      {/* Tab 1: Staff List + Pie Chart for Staff by Role */}
      {staffSubTab === 'list' && (
        <div className="space-y-4">
          <div className="content-card">
            <div className="table-filter-bar">
              <div className="search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search staff by name, role or dept..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Staff ID</th>
                    <th>Full Name</th>
                    <th>Role / Designation</th>
                    <th>Department</th>
                    <th>Assigned Shift</th>
                    <th>Contact Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id}>
                      <td className="font-mono text-teal font-bold">{staff.id}</td>
                      <td>
                        <strong>{staff.name}</strong>
                      </td>
                      <td>{staff.role}</td>
                      <td>
                        <span className="badge badge-dept">{staff.department}</span>
                      </td>
                      <td className="font-mono text-sm">{staff.shift}</td>
                      <td className="font-mono text-sm">{staff.phone}</td>
                      <td>
                        <span className="badge badge-success">{staff.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visualizations below staff list */}
          <div className="dashboard-grid-layout">
            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <PieIcon size={18} className="text-teal" />
                  <div>
                    <h3>Staff by Role</h3>
                    <p className="card-subtext">Clinical, administrative, and allied healthcare split</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <PieChartWidget
                  data={staffByRolePieData}
                  centerTitle="125"
                  centerSubtitle="Personnel"
                />
              </div>
            </div>

            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <CalendarCheck2 size={18} className="text-teal" />
                  <div>
                    <h3>Weekly Attendance Trend</h3>
                    <p className="card-subtext">Daily shift reporting compliance</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <AttendanceBarChart data={attendanceBarData} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Add New Staff Form */}
      {staffSubTab === 'add' && (
        <div className="content-card max-w-4xl mx-auto">
          <div className="card-header-bar">
            <div className="card-header-title">
              <UserPlus size={20} className="text-teal" />
              <div>
                <h3>Onboard Hospital Personnel</h3>
                <p className="card-subtext">Register employee details, shift schedule, and department unit</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleInlineSubmit} className="p-4 form-grid">
            <div className="form-group col-span-2">
              <label>Full Staff Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Veronica Adeleke"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Designation / Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="form-control"
              >
                <option value="Staff Nurse">Staff Nurse</option>
                <option value="Senior Nurse">Senior Nurse (ICU)</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Medical Lab Scientist">Medical Lab Scientist</option>
                <option value="Radiology Technologist">Radiology Technologist</option>
                <option value="Front Desk Executive">Front Desk Executive</option>
                <option value="Billing Officer">Billing Officer</option>
              </select>
            </div>

            <div className="form-group">
              <label>Department *</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="form-control"
              >
                <option value="Nursing Services">Nursing Services</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Pathology & Lab">Pathology & Lab</option>
                <option value="Radiology">Radiology</option>
                <option value="Finance & Accounts">Finance & Accounts</option>
                <option value="Front Desk">Front Desk</option>
              </select>
            </div>

            <div className="form-group">
              <label>Work Shift *</label>
              <select
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                className="form-control"
              >
                <option value="Morning (07:00 - 15:00)">Morning (07:00 - 15:00)</option>
                <option value="Evening (14:00 - 22:00)">Evening (14:00 - 22:00)</option>
                <option value="Night Shift (22:00 - 07:00)">Night Shift (22:00 - 07:00)</option>
                <option value="Day Shift (08:00 - 17:00)">Day Shift (08:00 - 17:00)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+234 803 000 9988"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigateTo('staff', 'list')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-teal-primary">
                Register Staff Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Roles & Permissions Matrix */}
      {staffSubTab === 'permissions' && (
        <div className="content-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Shield size={18} className="text-teal" />
              <div>
                <h3>Access Control & Permission Matrix</h3>
                <p className="card-subtext">Toggle system access levels across hospital operational modules</p>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="naira-table permissions-matrix-table">
              <thead>
                <tr>
                  <th>Role / Designation</th>
                  <th className="text-center">Patients</th>
                  <th className="text-center">Doctors</th>
                  <th className="text-center">Billing</th>
                  <th className="text-center">Staff</th>
                  <th className="text-center">Inventory</th>
                  <th className="text-center">Reports</th>
                  <th className="text-center">Settings</th>
                </tr>
              </thead>
              <tbody>
                {rolesPermissions.map((item) => (
                  <tr key={item.role}>
                    <td>
                      <strong>{item.role}</strong>
                    </td>
                    {['patients', 'doctors', 'billing', 'staff', 'inventory', 'reports', 'settings'].map((perm) => (
                      <td key={perm} className="text-center">
                        <button
                          className={`perm-toggle-btn ${item[perm] ? 'allowed' : 'denied'}`}
                          onClick={() => togglePermission(item.role, perm)}
                          title={`Toggle ${perm} access for ${item.role}`}
                        >
                          {item[perm] ? <Check size={14} /> : <X size={14} />}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Attendance Table */}
      {staffSubTab === 'attendance' && (
        <div className="space-y-4">
          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <CalendarCheck2 size={18} className="text-teal" />
                <div>
                  <h3>Today's Shift Attendance Log</h3>
                  <p className="card-subtext">Biometric check-in timestamps and duty compliance</p>
                </div>
              </div>
              <span className="badge badge-teal">Date: 2026-11-18</span>
            </div>

            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Staff Name</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Attendance Status</th>
                    <th>Work Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((att) => (
                    <tr key={att.id}>
                      <td><strong>{att.staffName}</strong></td>
                      <td>{att.role}</td>
                      <td className="font-mono text-sm">{att.date}</td>
                      <td className="font-mono text-teal font-bold">{att.checkIn}</td>
                      <td className="font-mono text-muted">{att.checkOut}</td>
                      <td>
                        <span className={`status-pill ${att.status === 'Present' ? 'pill-confirmed' : 'pill-pending'}`}>
                          {att.status}
                        </span>
                      </td>
                      <td className="font-mono text-sm">{att.workHours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-card p-4">
            <h3 className="font-bold text-navy mb-3">Weekly Attendance Analytics</h3>
            <AttendanceBarChart data={attendanceBarData} />
          </div>
        </div>
      )}
    </div>
  );
};
