import React, { useState } from 'react';
import {
  CalendarCheck,
  Clock,
  Calendar as CalendarIcon,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Stethoscope,
  Phone
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { PieChartWidget } from '../charts/PieChartWidget';
import { BarChartWidget } from '../charts/BarChartWidget';

export const AppointmentsView = () => {
  const {
    stats,
    appointments,
    appointmentsSubTab,
    navigateTo,
    appointmentFilter,
    setAppointmentFilter,
    setIsBookAppointmentModalOpen,
    bookAppointment,
    updateAppointmentStatus,
    doctors,
    departments
  } = useHospital();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('2026-11-18');

  // Inline Book Appointment Form state
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientAge: 30,
    department: 'Cardiology',
    doctor: 'Dr. Chidi Okafor',
    date: '2026-11-18',
    time: '10:00 AM',
    reason: '',
    type: 'Consultation',
    priority: 'Normal'
  });

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName) return;
    bookAppointment(formData);
    setFormData({
      patientName: '',
      patientPhone: '',
      patientAge: 30,
      department: 'Cardiology',
      doctor: 'Dr. Chidi Okafor',
      date: '2026-11-18',
      time: '10:00 AM',
      reason: '',
      type: 'Consultation',
      priority: 'Normal'
    });
    navigateTo('appointments', 'today');
  };

  // Filter appointments
  const effectiveFilter = appointmentsSubTab === 'pending' ? 'Pending' : appointmentFilter;

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      effectiveFilter === 'All'
        ? true
        : apt.status.toLowerCase() === effectiveFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // Dynamic chart datasets derived from real API appointments
  const totalApts = appointments.length || 1;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;
  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const cancelledCount = appointments.filter((a) => a.status === 'Cancelled').length;
  const appointmentStatusPieData = [
    { label: 'Completed', count: completedCount, percent: Math.round((completedCount / totalApts) * 100), color: '#10B981' },
    { label: 'Pending', count: pendingCount, percent: Math.round((pendingCount / totalApts) * 100), color: '#F59E0B' },
    { label: 'Cancelled', count: cancelledCount, percent: Math.round((cancelledCount / totalApts) * 100), color: '#EF4444' },
  ];

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const appointmentsPerDayData = dayLabels.map((label, idx) => {
    const val = appointments.filter((a) => {
      const d = new Date(a.date);
      return !isNaN(d) && ((d.getDay() + 6) % 7) === idx;
    }).length;
    return { label, value: val };
  });

  const appointmentsPerWeekData = ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((label, idx) => {
    const val = appointments.filter((a) => {
      const d = new Date(a.date);
      return !isNaN(d) && Math.min(3, Math.floor((d.getDate() - 1) / 7)) === idx;
    }).length;
    return { label, value: val };
  });

  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-11-${dayNum.toString().padStart(2, '0')}`;
    const aptCount = dayNum === 18 ? 8 : (dayNum % 4 === 0 ? 5 : (dayNum % 2 === 0 ? 6 : 4));
    return { day: dayNum, date: dateStr, count: aptCount };
  });

  return (
    <div className="view-container appointments-view">
      {/* Header */}
      <div className="view-header">
        <div>
          <h2 className="view-title">
            {appointmentsSubTab === 'today' && 'All Appointments & Consultations'}
            {appointmentsSubTab === 'book' && 'Book New Appointment'}
            {appointmentsSubTab === 'calendar' && 'Appointment Calendar'}
            {appointmentsSubTab === 'pending' && 'Pending Appointment Requests'}
          </h2>
          <p className="view-description">
            {appointmentsSubTab === 'today' && 'Complete daily appointment schedule, triage priority, and doctor consultation status'}
            {appointmentsSubTab === 'book' && 'Schedule a specialist consultation slot with patient contact and symptoms'}
            {appointmentsSubTab === 'calendar' && 'Interactive monthly clinic calendar showing scheduled consultations'}
            {appointmentsSubTab === 'pending' && 'Review unconfirmed consultation requests awaiting triage check-in'}
          </p>
        </div>
        <div className="view-actions">
          <button
            className="btn btn-teal-primary"
            onClick={() => setIsBookAppointmentModalOpen(true)}
          >
            <Plus size={16} /> Book Appointment
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards (Clickable Filter cards!) */}
      <div className="stats-grid-4 mb-4">
        <div
          className={`stat-card cursor-pointer ${effectiveFilter === 'All' ? 'ring-teal' : ''}`}
          onClick={() => {
            setAppointmentFilter('All');
            if (appointmentsSubTab === 'pending') navigateTo('appointments', 'today');
          }}
        >
          <div className="stat-card-header">
            <span className="stat-label">Total Appointments</span>
            <div className="stat-icon-pill icon-blue">
              <CalendarCheck size={20} />
            </div>
          </div>
          <div className="stat-value">{stats.appointments}</div>
          <div className="stat-footer">
            <span className="stat-period">All scheduled bookings</span>
          </div>
        </div>

        <div
          className={`stat-card cursor-pointer ${effectiveFilter === 'Pending' ? 'ring-amber' : ''}`}
          onClick={() => {
            setAppointmentFilter('Pending');
            navigateTo('appointments', 'pending');
          }}
        >
          <div className="stat-card-header">
            <span className="stat-label">Pending Confirmation</span>
            <div className="stat-icon-pill icon-amber">
              <Clock size={20} />
            </div>
          </div>
          <div className="stat-value text-amber">{stats.appointmentsPending}</div>
          <div className="stat-footer">
            <span className="stat-badge-amber">Awaiting Triage / Check-in</span>
          </div>
        </div>

        <div
          className={`stat-card cursor-pointer ${effectiveFilter === 'Completed' ? 'ring-teal' : ''}`}
          onClick={() => {
            setAppointmentFilter('Completed');
            navigateTo('appointments', 'today');
          }}
        >
          <div className="stat-card-header">
            <span className="stat-label">Completed</span>
            <div className="stat-icon-pill icon-teal">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="stat-value text-teal">{stats.appointmentsCompleted}</div>
          <div className="stat-footer">
            <span className="stat-badge-teal">Successfully Consulted</span>
          </div>
        </div>

        <div
          className={`stat-card cursor-pointer ${effectiveFilter === 'Cancelled' ? 'ring-rose' : ''}`}
          onClick={() => {
            setAppointmentFilter('Cancelled');
            navigateTo('appointments', 'today');
          }}
        >
          <div className="stat-card-header">
            <span className="stat-label">Cancelled / No-Show</span>
            <div className="stat-icon-pill icon-rose">
              <XCircle size={20} />
            </div>
          </div>
          <div className="stat-value text-rose">{stats.appointmentsCancelled}</div>
          <div className="stat-footer">
            <span className="stat-period">Requires Rescheduling</span>
          </div>
        </div>
      </div>

      {/* Sub-tab 1 & 4: Appointments Table (All or Pending) + Charts */}
      {(appointmentsSubTab === 'today' || appointmentsSubTab === 'pending') && (
        <div className="space-y-4">
          <div className="content-card">
            <div className="table-filter-bar">
              <div className="search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search patient, doctor, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <Filter size={16} className="text-muted" />
                <span className="filter-label">Filter:</span>
                {['All', 'Pending', 'In Consultation', 'Confirmed', 'Completed', 'Cancelled'].map((f) => (
                  <button
                    key={f}
                    className={`filter-chip ${effectiveFilter === f ? 'active' : ''}`}
                    onClick={() => setAppointmentFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Apt ID</th>
                    <th>Time Slot</th>
                    <th>Patient Name & Phone</th>
                    <th>Assigned Doctor</th>
                    <th>Department</th>
                    <th>Visit Type</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th className="text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-muted">
                        No appointments matching selected status "{effectiveFilter}".
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td className="font-mono text-teal font-bold">{apt.id}</td>
                        <td className="font-mono font-bold">{apt.time}</td>
                        <td>
                          <strong>{apt.patientName}</strong>
                          <div className="text-xs text-muted">{apt.patientPhone}</div>
                        </td>
                        <td>{apt.doctor}</td>
                        <td>
                          <span className="badge badge-dept">{apt.department}</span>
                        </td>
                        <td>
                          <span className="badge badge-info">{apt.type}</span>
                        </td>
                        <td>
                          <span className={`priority-tag priority-${apt.priority.toLowerCase()}`}>
                            {apt.priority}
                          </span>
                        </td>
                        <td>
                          <span className={`status-pill pill-${apt.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="text-right">
                          <select
                            className="form-control form-control-sm select-status-compact"
                            value={apt.status}
                            onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Consultation">In Consultation</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts: Pie Chart for Appointment Status + Bar Chart for Appointments per Day */}
          <div className="dashboard-grid-layout">
            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <CheckCircle2 size={18} className="text-teal" />
                  <div>
                    <h3>Appointment Status Breakdown</h3>
                    <p className="card-subtext">Completed, pending triage, and cancellations</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <PieChartWidget
                  data={appointmentStatusPieData}
                  centerTitle="180"
                  centerSubtitle="Appointments"
                />
              </div>
            </div>

            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <CalendarCheck size={18} className="text-teal" />
                  <div>
                    <h3>Appointments per Day</h3>
                    <p className="card-subtext">Consultation load across the week</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <BarChartWidget data={appointmentsPerDayData} unit="Consultations" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Calendar View + Bar Chart for Appointments per Week */}
      {appointmentsSubTab === 'calendar' && (
        <div className="space-y-4">
          <div className="content-card p-4">
            <div className="card-header-bar mb-3">
              <div className="card-header-title">
                <CalendarIcon size={18} className="text-teal" />
                <div>
                  <h3>Appointments per Week (Weekly Volume)</h3>
                  <p className="card-subtext">Weekly scheduling load progression for November 2026</p>
                </div>
              </div>
              <span className="badge badge-teal">Total: 180 Consultations</span>
            </div>
            <BarChartWidget data={appointmentsPerWeekData} unit="Appointments" barColor="#00C2FF" />
          </div>

          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <CalendarIcon size={18} className="text-teal" />
                <div>
                  <h3>Monthly Clinic Calendar</h3>
                  <p className="card-subtext">Click any day to view scheduled patient sessions</p>
                </div>
              </div>
              <div className="calendar-nav-controls">
                <button className="btn-icon-nav"><ChevronLeft size={16} /></button>
                <span className="calendar-month-title font-bold">November 2026</span>
                <button className="btn-icon-nav"><ChevronRight size={16} /></button>
              </div>
            </div>

            <div className="calendar-month-grid p-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <div key={d} className="calendar-day-header">{d}</div>
              ))}

              {calendarDays.map((item) => {
                const isSelected = selectedCalendarDate === item.date;
                const isToday = item.day === 18;
                return (
                  <div
                    key={item.day}
                    className={`calendar-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => setSelectedCalendarDate(item.date)}
                  >
                    <div className="cell-day-num">{item.day}</div>
                    <div className="cell-appointment-badge">
                      <span className="dot-teal"></span> {item.count} appointments
                    </div>
                    {isToday && <span className="today-chip">Today</span>}
                  </div>
                );
              })}
            </div>

            {/* Selected Date Appointments Drawer */}
            <div className="selected-date-strip p-4 border-t">
              <h4 className="font-bold text-navy mb-3">
                Scheduled for {selectedCalendarDate} (8 Consultations Active)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {appointments.slice(0, 3).map((apt) => (
                  <div key={apt.id} className="calendar-apt-pill">
                    <div className="apt-time-badge">{apt.time}</div>
                    <div className="apt-details">
                      <div className="font-bold">{apt.patientName}</div>
                      <div className="text-xs text-muted">{apt.doctor} • {apt.department}</div>
                    </div>
                    <span className={`status-pill pill-${apt.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Book Appointment Form */}
      {appointmentsSubTab === 'book' && (
        <div className="content-card max-w-4xl mx-auto">
          <div className="card-header-bar">
            <div className="card-header-title">
              <CalendarCheck size={20} className="text-teal" />
              <div>
                <h3>Book Clinic Appointment</h3>
                <p className="card-subtext">Reserve physician consultation slot and set triage priority</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleInlineSubmit} className="p-4 form-grid">
            <div className="form-group col-span-2">
              <label>Patient Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Adeola Johnson"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Contact Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+234 802 334 5566"
                value={formData.patientPhone}
                onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Patient Age</label>
              <input
                type="number"
                min="0"
                placeholder="30"
                value={formData.patientAge}
                onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Specialty Department *</label>
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
              <label>Consulting Physician *</label>
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

            <div className="form-group">
              <label>Appointment Date *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Time Slot *</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="form-control"
              >
                <option value="08:30 AM">08:30 AM</option>
                <option value="09:15 AM">09:15 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:45 AM">10:45 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
              </select>
            </div>

            <div className="form-group col-span-2">
              <label>Symptoms / Clinical Reason</label>
              <input
                type="text"
                placeholder="e.g. Chest pain on exertion, hypertension review"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigateTo('appointments', 'today')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-teal-primary">
                Confirm & Book Appointment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
