import React, { useState } from 'react';
import { X, CalendarCheck } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const BookAppointmentModal = () => {
  const { isBookAppointmentModalOpen, setIsBookAppointmentModalOpen, bookAppointment, doctors, departments } = useHospital();

  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientAge: 30,
    department: 'Cardiology',
    doctor: 'Dr. Chidi Okafor',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    reason: '',
    type: 'Consultation',
    priority: 'Normal'
  });

  if (!isBookAppointmentModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName) return;
    bookAppointment(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box modal-md animate-scaleIn">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <CalendarCheck size={20} className="text-teal" />
            <h3 className="modal-title">Book New Appointment</h3>
          </div>
          <button className="modal-close-btn" onClick={() => setIsBookAppointmentModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body form-grid">
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
            <label>Phone Number *</label>
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
              max="120"
              placeholder="32"
              value={formData.patientAge}
              onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Select Department *</label>
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
            <label>Select Doctor *</label>
            <select
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="form-control"
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>{doc.name} - {doc.department}</option>
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
              <option value="12:15 PM">12:15 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Visit Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="form-control"
            >
              <option value="Consultation">General Consultation</option>
              <option value="Follow-up">Follow-up Visit</option>
              <option value="Procedure">Procedure / Minor Surgery</option>
              <option value="Diagnostics">Lab / Radiology Review</option>
              <option value="Antenatal">Antenatal Checkup</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="form-control"
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Emergency">Emergency Triage</option>
            </select>
          </div>

          <div className="form-group col-span-2">
            <label>Clinical Notes / Reason for Visit</label>
            <input
              type="text"
              placeholder="e.g. Persistent chest pain on exertion, shortness of breath"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="modal-footer col-span-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsBookAppointmentModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-teal-primary">
              Confirm & Book Slot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
