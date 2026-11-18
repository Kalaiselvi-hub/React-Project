import React from 'react';
import { X, Heart, Activity, Thermometer, ShieldCheck, FileText, Pill, Printer, UserCheck } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const PatientRecordsModal = () => {
  const { selectedPatient, isPatientModalOpen, setIsPatientModalOpen, dischargePatient } = useHospital();

  if (!isPatientModalOpen || !selectedPatient) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box modal-lg animate-scaleIn">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Activity size={20} className="text-teal" />
            <div>
              <h3 className="modal-title">Clinical Medical Record: {selectedPatient.name}</h3>
              <p className="modal-subtitle">Patient ID: <strong>{selectedPatient.id}</strong> • Blood Group: <strong>{selectedPatient.bloodGroup}</strong></p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setIsPatientModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body patient-record-body">
          {/* Top Info Banner */}
          <div className="patient-record-banner">
            <div className="banner-avatar">
              {selectedPatient.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="banner-details">
              <h4>{selectedPatient.name}</h4>
              <p>
                {selectedPatient.age} Years • {selectedPatient.gender} • Phone: {selectedPatient.phone}
              </p>
              <div className="banner-meta-row">
                <span className="badge badge-dept">{selectedPatient.department}</span>
                <span className="badge badge-doctor">Attending: {selectedPatient.doctor}</span>
                <span className={`status-pill ${selectedPatient.status.toLowerCase()}`}>
                  {selectedPatient.status}
                </span>
                {selectedPatient.room && (
                  <span className="badge badge-room">{selectedPatient.room}</span>
                )}
              </div>
            </div>
          </div>

          {/* Vitals Grid */}
          <div className="record-section-title">Latest Vital Signs</div>
          <div className="vitals-grid">
            <div className="vital-card">
              <div className="vital-header">
                <Heart size={16} className="text-rose" />
                <span>Blood Pressure</span>
              </div>
              <div className="vital-value">{selectedPatient.vitals?.bp || '120/80 mmHg'}</div>
              <div className="vital-sub">Normal Range</div>
            </div>

            <div className="vital-card">
              <div className="vital-header">
                <Activity size={16} className="text-teal" />
                <span>Heart Rate / Pulse</span>
              </div>
              <div className="vital-value">{selectedPatient.vitals?.pulse || '72 bpm'}</div>
              <div className="vital-sub">Resting Rhythm</div>
            </div>

            <div className="vital-card">
              <div className="vital-header">
                <Thermometer size={16} className="text-amber" />
                <span>Body Temp</span>
              </div>
              <div className="vital-value">{selectedPatient.vitals?.temp || '36.8 °C'}</div>
              <div className="vital-sub">Oral Thermometry</div>
            </div>

            <div className="vital-card">
              <div className="vital-header">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Oxygen Saturation</span>
              </div>
              <div className="vital-value">{selectedPatient.vitals?.spo2 || '98%'}</div>
              <div className="vital-sub">SpO2 Ambient</div>
            </div>
          </div>

          {/* Diagnosis & Prescriptions */}
          <div className="record-grid-two-col">
            <div className="record-box">
              <div className="box-title">
                <FileText size={16} className="text-teal" />
                <span>Primary Diagnosis & History</span>
              </div>
              <div className="diagnosis-highlight">
                {selectedPatient.diagnosis || 'Clinical evaluation in progress'}
              </div>
              <div className="record-info-list">
                <div><strong>Admitted On:</strong> {selectedPatient.admissionDate}</div>
                {selectedPatient.dischargeDate && (
                  <div><strong>Discharged On:</strong> {selectedPatient.dischargeDate}</div>
                )}
                <div><strong>Emergency Contact:</strong> {selectedPatient.emergencyContact || 'None recorded'}</div>
                <div><strong>Residential Address:</strong> {selectedPatient.address || 'Victoria Island, Lagos'}</div>
              </div>
            </div>

            <div className="record-box">
              <div className="box-title">
                <Pill size={16} className="text-teal" />
                <span>Active Prescriptions & Regimen</span>
              </div>
              <div className="prescriptions-list">
                {selectedPatient.prescriptions && selectedPatient.prescriptions.length > 0 ? (
                  selectedPatient.prescriptions.map((rx, idx) => (
                    <div key={idx} className="prescription-pill-item">
                      <div className="rx-name">{rx.name}</div>
                      <div className="rx-details">
                        <span>{rx.dosage}</span> • <span className="text-muted">{rx.duration}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No active medications registered.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {selectedPatient.status !== 'Discharged' && (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => {
                dischargePatient(selectedPatient.id);
                setIsPatientModalOpen(false);
              }}
            >
              <UserCheck size={16} />
              Process Patient Discharge
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => window.print()}
          >
            <Printer size={16} />
            Print Medical File
          </button>
          <button
            type="button"
            className="btn btn-teal-primary"
            onClick={() => setIsPatientModalOpen(false)}
          >
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
};
