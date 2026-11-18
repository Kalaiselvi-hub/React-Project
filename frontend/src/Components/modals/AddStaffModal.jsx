import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const AddStaffModal = () => {
  const { isAddStaffModalOpen, setIsAddStaffModalOpen, addStaff } = useHospital();

  const [formData, setFormData] = useState({
    name: '',
    role: 'Staff Nurse',
    department: 'Nursing Services',
    phone: '',
    shift: 'Morning (07:00 - 15:00)'
  });

  if (!isAddStaffModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addStaff(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box modal-md animate-scaleIn">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <UserPlus size={20} className="text-teal" />
            <h3 className="modal-title">Register New Staff Member</h3>
          </div>
          <button className="modal-close-btn" onClick={() => setIsAddStaffModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body form-grid">
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
              <option value="Biomedical Technician">Biomedical Technician</option>
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
              <option value="Facilities & Tech">Facilities & Tech</option>
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
            <label>Contact Phone Number *</label>
            <input
              type="tel"
              required
              placeholder="+234 803 000 9988"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="modal-footer col-span-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsAddStaffModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-teal-primary">
              Save Staff Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
