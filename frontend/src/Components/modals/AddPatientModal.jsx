import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const AddPatientModal = () => {
  const { isAddPatientModalOpen, setIsAddPatientModalOpen, addPatient, doctors, departments } = useHospital();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: 'Male',
    age: '',
    bloodGroup: 'O+',
    department: 'General Medicine',
    doctor: 'Dr. Amina Bello',
    room: 'General Ward 1, Bed 04',
    diagnosis: '',
    emergencyContact: '',
    address: ''
  });

  if (!isAddPatientModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    addPatient({
      ...formData,
      age: parseInt(formData.age, 10) || 30
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box modal-md animate-scaleIn">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <UserPlus size={20} className="text-teal" />
            <h3 className="modal-title">Register New Patient</h3>
          </div>
          <button className="modal-close-btn" onClick={() => setIsAddPatientModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body form-grid">
          <div className="form-group col-span-2">
            <label>Full Patient Name *</label>
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
              placeholder="e.g. +234 803 123 4567"
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
              max="120"
              placeholder="e.g. 35"
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
            <label>Assign Doctor</label>
            <select
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="form-control"
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>{doc.name} ({doc.department})</option>
              ))}
            </select>
          </div>

          <div className="form-group col-span-2">
            <label>Primary Diagnosis / Symptoms</label>
            <input
              type="text"
              placeholder="e.g. Acute Malaria, high-grade fever, headache"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group col-span-2">
            <label>Emergency Contact</label>
            <input
              type="text"
              placeholder="e.g. Funke Fashola (Spouse) - +234 802 000 1122"
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

          <div className="modal-footer col-span-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsAddPatientModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-teal-primary">
              Admit & Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
