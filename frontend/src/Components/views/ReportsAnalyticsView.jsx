import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  CalendarCheck,
  TrendingUp,
  Stethoscope,
  Download,
  Filter,
  Calendar,
  FileSpreadsheet,
  FileText,
  Star,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const ReportsAnalyticsView = () => {
  const {
    reportsSubTab,
    doctors,
    stats,
    showToast
  } = useHospital();

  const [dateRange, setDateRange] = useState('This Month');

  const handleExport = (type) => {
    showToast(`Exporting ${reportsSubTab.toUpperCase()} report as ${type.toUpperCase()}...`);
  };

  return (
    <div className="view-container reports-view">
      {/* Header */}
      <div className="view-header">
        <div>
          <h2 className="view-title">
            {reportsSubTab === 'patient' && 'Patient Inflow & Clinical Intake Reports'}
            {reportsSubTab === 'appointment' && 'Appointment & Consultation Load Analytics'}
            {reportsSubTab === 'revenue' && 'Financial Revenue & Departmental Tariffs (₦)'}
            {reportsSubTab === 'doctor' && 'Physician Productivity & Clinical Ratings'}
          </h2>
          <p className="view-description">
            {reportsSubTab === 'patient' && 'Inpatient bed turnover, admission diagnostics breakdown, and average length of stay'}
            {reportsSubTab === 'appointment' && 'Consultation completion percentages, peak clinic booking hours, and no-show rates'}
            {reportsSubTab === 'revenue' && 'Monthly departmental earnings in Nigerian Naira (₦), HMO ratios, and cash recovery'}
            {reportsSubTab === 'doctor' && 'Specialist consultation volume, surgical load, and verified patient satisfaction scores'}
          </p>
        </div>
        <div className="view-actions">
          <div className="flex gap-2">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => handleExport('csv')}
            >
              <FileSpreadsheet size={15} /> Export CSV
            </button>
            <button
              className="btn btn-outline-teal btn-sm"
              onClick={() => handleExport('pdf')}
            >
              <FileText size={15} /> Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Date Filter Bar */}
      <div className="content-card mb-4 p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-teal" />
          <span className="font-bold text-navy text-sm">Reporting Period:</span>
          {['Today', 'This Week', 'This Month', 'This Quarter', 'Year 2026'].map((period) => (
            <button
              key={period}
              className={`filter-chip ${dateRange === period ? 'active' : ''}`}
              onClick={() => setDateRange(period)}
            >
              {period}
            </button>
          ))}
        </div>
        <div className="text-xs text-muted">
          Data synchronized as of today (18 Nov 2026, 17:50 WAT)
        </div>
      </div>

      {/* Tab 1: Patient Reports */}
      {reportsSubTab === 'patient' && (
        <div className="space-y-4">
          <div className="stats-grid-4">
            <div className="stat-card">
              <span className="stat-label">Total Registered</span>
              <div className="stat-value">{stats.totalPatients}</div>
              <div className="stat-footer text-teal">+12.4% vs last cycle</div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Average Length of Stay</span>
              <div className="stat-value">3.4 Days</div>
              <div className="stat-footer text-emerald">Optimal Bed Turnover</div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Bed Occupancy Rate</span>
              <div className="stat-value text-teal">70.0%</div>
              <div className="stat-footer">84 of 120 Beds Occupied</div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Re-admission Rate</span>
              <div className="stat-value text-emerald">2.8%</div>
              <div className="stat-footer">Benchmark &lt; 5.0%</div>
            </div>
          </div>

          <div className="content-card p-4">
            <h3 className="font-bold text-navy mb-2">Inpatient Admission Diagnosis Breakdown</h3>
            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Clinical Specialty</th>
                    <th>Inpatients</th>
                    <th>Average Stay</th>
                    <th>Discharge Status</th>
                    <th>Bed Capacity Load</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cardiology & Heart Care</td>
                    <td className="font-bold">14 Patients</td>
                    <td>4.2 Days</td>
                    <td><span className="badge badge-success">88% Discharged Recovered</span></td>
                    <td>87% Capacity</td>
                  </tr>
                  <tr>
                    <td>Orthopedics & Joint Care</td>
                    <td className="font-bold">15 Patients</td>
                    <td>5.1 Days</td>
                    <td><span className="badge badge-success">92% Discharged Recovered</span></td>
                    <td>83% Capacity</td>
                  </tr>
                  <tr>
                    <td>Pediatrics & Neonatal</td>
                    <td className="font-bold">18 Patients</td>
                    <td>2.6 Days</td>
                    <td><span className="badge badge-success">95% Discharged Recovered</span></td>
                    <td>90% Capacity</td>
                  </tr>
                  <tr>
                    <td>Obstetrics & Gynecology</td>
                    <td className="font-bold">19 Patients</td>
                    <td>2.9 Days</td>
                    <td><span className="badge badge-success">98% Discharged Recovered</span></td>
                    <td>86% Capacity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Appointment Reports */}
      {reportsSubTab === 'appointment' && (
        <div className="space-y-4">
          <div className="stats-grid-4">
            <div className="stat-card">
              <span className="stat-label">Total Scheduled</span>
              <div className="stat-value">{stats.appointments}</div>
              <div className="stat-footer">Monthly Volume</div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Completion Rate</span>
              <div className="stat-value text-emerald">70.0%</div>
              <div className="stat-footer">{stats.appointmentsCompleted} Completed</div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Pending Confirmation</span>
              <div className="stat-value text-amber">18.9%</div>
              <div className="stat-footer">{stats.appointmentsPending} Pending</div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Cancellation Rate</span>
              <div className="stat-value text-rose">11.1%</div>
              <div className="stat-footer">{stats.appointmentsCancelled} Cancelled</div>
            </div>
          </div>

          <div className="content-card p-4">
            <h3 className="font-bold text-navy mb-2">Peak Booking Hours Analysis</h3>
            <p className="text-sm text-muted mb-4">Hourly distribution of outpatient consultation loads</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="peak-hour-box">
                <div className="hour-label">08:00 AM - 10:00 AM</div>
                <div className="hour-val font-mono text-teal">32 Patients</div>
                <div className="text-xs text-muted">Early Morning Slot</div>
              </div>
              <div className="peak-hour-box peak-highlight">
                <div className="hour-label">10:00 AM - 01:00 PM</div>
                <div className="hour-val font-mono text-navy font-bold">88 Patients (Peak)</div>
                <div className="text-xs text-teal">High Clinical Density</div>
              </div>
              <div className="peak-hour-box">
                <div className="hour-label">02:00 PM - 04:00 PM</div>
                <div className="hour-val font-mono text-teal">42 Patients</div>
                <div className="text-xs text-muted">Afternoon Consultations</div>
              </div>
              <div className="peak-hour-box">
                <div className="hour-label">04:00 PM - 07:00 PM</div>
                <div className="hour-val font-mono text-teal">18 Patients</div>
                <div className="text-xs text-muted">Evening Reviews</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Revenue Reports */}
      {reportsSubTab === 'revenue' && (
        <div className="space-y-4">
          <div className="stats-grid-4">
            <div className="stat-card stat-card-highlight">
              <span className="stat-label">Total Invoiced</span>
              <div className="stat-value font-mono">₦4,285,000</div>
              <div className="stat-footer text-teal">+18.6% Monthly Growth</div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Net Collected</span>
              <div className="stat-value font-mono text-emerald">₦3,820,000</div>
              <div className="stat-footer">89.1% Cash Inflow</div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Pending Invoices</span>
              <div className="stat-value font-mono text-rose">₦465,000</div>
              <div className="stat-footer">Under HMO Reconciliation</div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Average Invoice Value</span>
              <div className="stat-value font-mono text-navy">₦42,850</div>
              <div className="stat-footer">Per Patient Cycle</div>
            </div>
          </div>

          <div className="content-card p-4">
            <h3 className="font-bold text-navy mb-3">Department Revenue Contribution (₦)</h3>
            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Invoiced Revenue (₦)</th>
                    <th>Share %</th>
                    <th>HMO Coverage Ratio</th>
                    <th>Collection Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Cardiology & Heart Institute</strong></td>
                    <td className="font-mono font-bold text-navy">₦1,420,000</td>
                    <td>33.1%</td>
                    <td>75% HMO / 25% Self-Pay</td>
                    <td><span className="badge badge-success">92% Collected</span></td>
                  </tr>
                  <tr>
                    <td><strong>Orthopedics & Surgical Wing</strong></td>
                    <td className="font-mono font-bold text-navy">₦1,210,000</td>
                    <td>28.2%</td>
                    <td>60% HMO / 40% Self-Pay</td>
                    <td><span className="badge badge-success">86% Collected</span></td>
                  </tr>
                  <tr>
                    <td><strong>Obstetrics & Maternity Suites</strong></td>
                    <td className="font-mono font-bold text-navy">₦680,000</td>
                    <td>15.9%</td>
                    <td>50% HMO / 50% Self-Pay</td>
                    <td><span className="badge badge-success">95% Collected</span></td>
                  </tr>
                  <tr>
                    <td><strong>Diagnostic Radiology & CT/MRI</strong></td>
                    <td className="font-mono font-bold text-navy">₦525,000</td>
                    <td>12.3%</td>
                    <td>80% HMO / 20% Self-Pay</td>
                    <td><span className="badge badge-success">88% Collected</span></td>
                  </tr>
                  <tr>
                    <td><strong>General Medicine & Emergency</strong></td>
                    <td className="font-mono font-bold text-navy">₦450,000</td>
                    <td>10.5%</td>
                    <td>65% HMO / 35% Self-Pay</td>
                    <td><span className="badge badge-success">84% Collected</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Doctor Performance */}
      {reportsSubTab === 'doctor' && (
        <div className="content-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Stethoscope size={18} className="text-teal" />
              <div>
                <h3>Physician Productivity & Clinical Satisfaction</h3>
                <p className="card-subtext">Consultations performed, surgery counts, and patient satisfaction ratings</p>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="naira-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Consultations</th>
                  <th>Surgeries</th>
                  <th>Patient Rating</th>
                  <th>Avg Wait Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <strong>{doc.name}</strong>
                      <div className="text-xs text-muted">{doc.specialization}</div>
                    </td>
                    <td>
                      <span className="badge badge-dept">{doc.department}</span>
                    </td>
                    <td className="font-mono font-bold">42</td>
                    <td className="font-mono font-bold text-teal">6</td>
                    <td>
                      <span className="rating-pill">
                        <Star size={13} fill="#F59E0B" color="#F59E0B" /> {doc.rating} / 5.0
                      </span>
                    </td>
                    <td className="font-mono text-sm">12 mins</td>
                    <td>
                      <span className={`status-pill pill-${doc.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {doc.status}
                      </span>
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
