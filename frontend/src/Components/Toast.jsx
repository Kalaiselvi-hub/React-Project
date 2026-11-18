import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const Toast = () => {
  const { toast } = useHospital();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="toast-icon text-emerald" />,
    warning: <AlertTriangle size={18} className="toast-icon text-amber" />,
    error: <XCircle size={18} className="toast-icon text-rose" />,
    info: <Info size={18} className="toast-icon text-teal" />
  };

  return (
    <div className={`toast-notification toast-${toast.type || 'success'}`}>
      {icons[toast.type] || icons.success}
      <span className="toast-message">{toast.message}</span>
    </div>
  );
};
