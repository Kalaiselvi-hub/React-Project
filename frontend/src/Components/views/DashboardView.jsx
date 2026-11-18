import React from 'react';
import {
  Users,
  Stethoscope,
  CalendarCheck,
  Wallet,
  TrendingUp,
  Clock,
  ArrowUpRight,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  Bed,
  Activity,
  HeartPulse,
  Truck
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { PatientDemographicsChart } from '../charts/PatientDemographicsChart';
import { AdmissionsBarChart } from '../charts/AdmissionsBarChart';

export const DashboardView = () => {
  const {
    stats,
    appointments,
    patientDemographicsData,
    admissionsBarData,
    dashboardSubTab,
    navigateTo,
    setSelectedPatient,
    patients,
    facilities,
    setIsPatientModalOpen,
    setIsAddPatientModalOpen,
    setIsBookAppointmentModalOpen,
    setIsCreateBillModalOpen,
    updateAppointmentStatus
  } = useHospital();

  const todayAppointments = appointments.slice(0, 5);

  const handleViewPatientByName = (name) => {
    const found = patients.find((p) => p.name === name);
    if (found) {
      setSelectedPatient(found);
      setIsPatientModalOpen(true);
    } else {
      navigateTo('patients', 'list');
    }
  };

  return (
    <div className="view-container dashboard-view">
      {/* Top Welcome & KPI Header */}
      <div className="view-header">
        <div>
          <h2 className="view-title">
            {dashboardSubTab === 'overview' && 'Executive Hospital Dashboard'}
            {dashboardSubTab === 'liveStatus' && 'Hospital Live Operational Status'}
            {dashboardSubTab === 'quickStats' && 'Hospital Quick Performance Indicators'}
          </h2>
          <p className="view-description">
            {dashboardSubTab === 'overview' && 'Real-time clinical, operational and financial performance indicators for NAIRA Medical Centre'}
            {dashboardSubTab === 'liveStatus' && 'Real-time monitoring of ICU occupancy, triage bay load, blood bank units, and ambulance logistics'}
            {dashboardSubTab === 'quickStats' && 'High-level metric summaries, admission volume tracking, and revenue trends'}
          </p>
        </div>
        <div className="view-actions">
          <button
            className="btn btn-outline-teal"
            onClick={() => setIsBookAppointmentModalOpen(true)}
          >
            <CalendarCheck size={16} /> Book Appointment
          </button>
          <button
            className="btn btn-teal-primary"
            onClick={() => setIsAddPatientModalOpen(true)}
          >
            <Plus size={16} /> New Admission
          </button>
        </div>
      </div>

      {/* 4 Main Stat Cards (Always prominent on overview & quickStats) */}
      {(dashboardSubTab === 'overview' || dashboardSubTab === 'quickStats') && (
        <div className="stats-grid-4">
          {/* Card 1: Total Patients */}
          <div className="stat-card" onClick={() => navigateTo('patients', 'list')}>
            <div className="stat-card-header">
              <span className="stat-label">Total Patients</span>
              <div className="stat-icon-pill icon-teal">
                <Users size={20} />
              </div>
            </div>
            <div className="stat-value">{stats.totalPatients.toLocaleString()}</div>
            <div className="stat-footer">
              <span className="stat-trend trend-up">
                <TrendingUp size={14} /> +12.4%
              </span>
              <span className="stat-period">vs last month</span>
            </div>
            <div className="stat-sub-info">
              <strong>{stats.admissionsTotal}</strong> currently admitted
            </div>
          </div>

          {/* Card 2: Total Doctors */}
          <div className="stat-card" onClick={() => navigateTo('doctors', 'list')}>
            <div className="stat-card-header">
              <span className="stat-label">Total Doctors</span>
              <div className="stat-icon-pill icon-navy">
                <Stethoscope size={20} />
              </div>
            </div>
            <div className="stat-value">{stats.totalDoctors}</div>
            <div className="stat-footer">
              <span className="stat-badge-info">8 Departments</span>
              <span className="stat-period">24/7 Coverage</span>
            </div>
            <div className="stat-sub-info text-emerald">
              ● 9 Specialists on active duty
            </div>
          </div>

          {/* Card 3: Appointments */}
          <div className="stat-card" onClick={() => navigateTo('appointments', 'today')}>
            <div className="stat-card-header">
              <span className="stat-label">Appointments</span>
              <div className="stat-icon-pill icon-blue">
                <CalendarCheck size={20} />
              </div>
            </div>
            <div className="stat-value">{stats.appointments}</div>
            <div className="stat-footer">
              <span className="stat-badge-amber">{stats.appointmentsPending} Pending</span>
              <span className="stat-badge-teal">{stats.appointmentsCompleted} Done</span>
            </div>
            <div className="stat-sub-info">
              {stats.appointmentsCancelled} Cancelled this week
            </div>
          </div>

          {/* Card 4: Revenue */}
          <div className="stat-card stat-card-highlight" onClick={() => navigateTo('billing', 'overview')}>
            <div className="stat-card-header">
              <span className="stat-label">Revenue</span>
              <div className="stat-icon-pill icon-revenue">
                <Wallet size={20} />
              </div>
            </div>
            <div className="stat-value font-mono">₦{stats.revenue.toLocaleString()}</div>
            <div className="stat-footer">
              <span className="stat-trend trend-up">
                <TrendingUp size={14} /> +18.6%
              </span>
              <span className="stat-period">Monthly Target Met</span>
            </div>
            <div className="stat-sub-info text-teal">
              ₦342,500 collected today
            </div>
          </div>
        </div>
      )}

      {/* Mode 1: Overview */}
      {dashboardSubTab === 'overview' && (
        <div className="dashboard-grid-layout">
          {/* Left Column: Today's Appointments Table + Admissions Bar Chart */}
          <div className="dashboard-main-col">
            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <Clock size={18} className="text-teal" />
                  <h3>Today's Consultations & Appointments</h3>
                </div>
                <button
                  className="btn-link"
                  onClick={() => navigateTo('appointments', 'today')}
                >
                  View All (180) →
                </button>
              </div>

              <div className="table-responsive">
                <table className="naira-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Patient Name</th>
                      <th>Age</th>
                      <th>Doctor</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td className="font-mono text-bold text-teal">{apt.time}</td>
                        <td>
                          <div
                            className="patient-name-link"
                            onClick={() => handleViewPatientByName(apt.patientName)}
                          >
                            {apt.patientName}
                          </div>
                        </td>
                        <td>{apt.patientAge}y</td>
                        <td>{apt.doctor}</td>
                        <td>
                          <span className="badge badge-dept">{apt.department}</span>
                        </td>
                        <td>
                          <span className={`status-pill pill-${apt.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="action-buttons-row justify-end">
                            {apt.status === 'Pending' && (
                              <button
                                className="btn-icon-check"
                                title="Mark In Consultation"
                                onClick={() => updateAppointmentStatus(apt.id, 'In Consultation')}
                              >
                                <CheckCircle2 size={16} />
                              </button>
                            )}
                            {apt.status === 'In Consultation' && (
                              <button
                                className="btn-icon-check"
                                title="Mark Completed"
                                onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                              >
                                <UserCheck size={16} />
                              </button>
                            )}
                            <button
                              className="btn-icon-view"
                              title="View Patient Record"
                              onClick={() => handleViewPatientByName(apt.patientName)}
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="card-footer-strip">
                <span className="text-muted">Showing 5 of {appointments.length} appointments scheduled today</span>
                <button
                  className="btn btn-outline-teal btn-sm"
                  onClick={() => setIsBookAppointmentModalOpen(true)}
                >
                  + Book Slot
                </button>
              </div>
            </div>

            {/* Admissions Bar Chart Card */}
            <div className="content-card mt-4">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <TrendingUp size={18} className="text-teal" />
                  <div>
                    <h3>Admissions vs Discharges Trend</h3>
                    <p className="card-subtext">Monthly hospital patient influx and successful recovery discharge rates</p>
                  </div>
                </div>
                <span className="badge badge-teal">Jan - Jul 2026</span>
              </div>
              <div className="p-3">
                <AdmissionsBarChart data={admissionsBarData} />
              </div>
            </div>
          </div>

          {/* Right Column: Demographics & Operational Summary */}
          <div className="dashboard-side-col">
            {/* Patient Demographics Pie Chart */}
            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <Users size={18} className="text-teal" />
                  <h3>Patient Demographics</h3>
                </div>
              </div>
              <div className="p-3">
                <PatientDemographicsChart data={patientDemographicsData} />
              </div>
            </div>

            {/* Quick Department & Bed Summary */}
            <div className="content-card mt-4">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <ArrowUpRight size={18} className="text-teal" />
                  <h3>Facility Capacity</h3>
                </div>
                <span className="badge badge-success">Normal Ops</span>
              </div>
              <div className="capacity-list p-3">
                <div className="capacity-item">
                  <div className="capacity-label-row">
                    <span>General Wards</span>
                    <strong>62 / 80 Beds</strong>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: '77%', backgroundColor: '#00C2FF' }}></div>
                  </div>
                </div>

                <div className="capacity-item mt-3">
                  <div className="capacity-label-row">
                    <span>ICU Critical Care</span>
                    <strong className="text-rose">8 / 12 Beds (66%)</strong>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: '66%', backgroundColor: '#EF4444' }}></div>
                  </div>
                </div>

                <div className="capacity-item mt-3">
                  <div className="capacity-label-row">
                    <span>Maternity Suites</span>
                    <strong>14 / 20 Beds</strong>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: '70%', backgroundColor: '#10B981' }}></div>
                  </div>
                </div>

                <div className="quick-actions-box mt-4">
                  <button
                    className="quick-action-btn"
                    onClick={() => setIsCreateBillModalOpen(true)}
                  >
                    Create Patient Invoice
                  </button>
                  <button
                    className="quick-action-btn"
                    onClick={() => navigateTo('services', 'charges')}
                  >
                    Hospital Price Catalog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Live Status */}
      {dashboardSubTab === 'liveStatus' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="content-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <Bed size={24} className="text-teal" />
                <div>
                  <h4 className="font-bold text-navy">ICU Critical Care Bed Status</h4>
                  <span className="text-xs text-muted">8 Occupied / 4 Available</span>
                </div>
              </div>
              <div className="progress-bar-bg mt-3">
                <div className="progress-bar-fill" style={{ width: '66%', backgroundColor: '#00C2FF' }}></div>
              </div>
              <p className="text-xs text-muted mt-2">Ventilators connected to 6 units. 2 emergency reserve bays ready.</p>
            </div>

            <div className="content-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <Activity size={24} className="text-emerald" />
                <div>
                  <h4 className="font-bold text-navy">Emergency Room Triage</h4>
                  <span className="text-xs text-muted">Level 1 - Green Response</span>
                </div>
              </div>
              <div className="progress-bar-bg mt-3">
                <div className="progress-bar-fill" style={{ width: '37%', backgroundColor: '#10B981' }}></div>
              </div>
              <p className="text-xs text-muted mt-2">6 of 16 triage bays occupied. Average wait time: 4 minutes.</p>
            </div>

            <div className="content-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <Truck size={24} className="text-teal" />
                <div>
                  <h4 className="font-bold text-navy">Mobile Ambulance Fleet</h4>
                  <span className="text-xs text-muted">3 Standby / 2 In Transit</span>
                </div>
              </div>
              <div className="progress-bar-bg mt-3">
                <div className="progress-bar-fill" style={{ width: '60%', backgroundColor: '#00C2FF' }}></div>
              </div>
              <p className="text-xs text-muted mt-2">GPS telemetry active. 2 paramedics assigned to each dispatched vehicle.</p>
            </div>
          </div>

          <div className="content-card p-4">
            <h3 className="font-bold text-navy mb-3">Live Departmental Operational Units</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {facilities.map((fac, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border rounded-md">
                  <div className="font-bold text-navy">{fac.name}</div>
                  <div className="text-sm text-teal font-mono">{fac.occupied}</div>
                  <div className="text-xs text-muted mt-1">{fac.highlight}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Quick Stats */}
      {dashboardSubTab === 'quickStats' && (
        <div className="dashboard-grid-layout">
          <div className="dashboard-main-col">
            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <TrendingUp size={18} className="text-teal" />
                  <h3>Admissions vs Discharges Comparison</h3>
                </div>
              </div>
              <div className="p-4">
                <AdmissionsBarChart data={admissionsBarData} />
              </div>
            </div>
          </div>

          <div className="dashboard-side-col">
            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <Users size={18} className="text-teal" />
                  <h3>Demographics Ratio</h3>
                </div>
              </div>
              <div className="p-3">
                <PatientDemographicsChart data={patientDemographicsData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
