import React, { useState } from 'react';
import { X, Stethoscope } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const AddDoctorModal = () => {
  const { isAddDoctorModalOpen, setIsAddDoctorModalOpen, addDoctor, departments } = useHospital();

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

  if (!isAddDoctorModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    addDoctor({
      ...formData,
      consultationFee: parseInt(formData.consultationFee, 10) || 20000
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box modal-md animate-scaleIn">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Stethoscope size={20} className="text-teal" />
            <h3 className="modal-title">Add New Doctor</h3>
          </div>
          <button className="modal-close-btn" onClick={() => setIsAddDoctorModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body form-grid">
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
            <label>Medical Department *</label>
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
              placeholder="e.g. Consultant Neurosurgeon"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Medical Qualifications</label>
            <input
              type="text"
              placeholder="e.g. MBBS, FWACS, FICS"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Years of Clinical Experience</label>
            <input
              type="text"
              placeholder="e.g. 10 Years"
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
              placeholder="e.g. +234 803 555 7788"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="e.g. doctor@nairahospital.ng"
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

          <div className="modal-footer col-span-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsAddDoctorModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-teal-primary">
              Register Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
