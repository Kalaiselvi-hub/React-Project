import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, Activity, AlertCircle } from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const LoginScreen = () => {
  const { login, enterDemoMode, authLoading } = useHospital();
  const [email, setEmail] = useState('chief.doctor@nairahospital.com');
  const [password, setPassword] = useState('Password@123');
  const [totpCode, setTotpCode] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login({
        email: email.trim(),
        password,
        rememberMe,
        ...(requires2FA && totpCode ? { totpCode } : {}),
      });
      if (res?.requires2FA) {
        setRequires2FA(true);
      }
    } catch (err) {
      setError(err.message || 'Unable to sign in. Check that the backend API is running.');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-card-body">
          <div className="login-heading">
            <div
              className="login-logo"
            >
              <Activity size={28} />
            </div>
            <h4 className="fw-bold mb-1 text-dark">NAIRA Hospital CRM</h4>
            <p className="text-muted small mb-0">Sign in to connect with live Hospital API</p>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-start gap-2 py-2 small" role="alert">
              <AlertCircle size={16} className="mt-1 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">Admin Email</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Mail size={16} className="text-muted" />
                </span>
                <input
                  type="email"
                  className="form-control border-start-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chief.doctor@nairahospital.com"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Lock size={16} className="text-muted" />
                </span>
                <input
                  type="password"
                  className="form-control border-start-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {requires2FA && (
              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">2FA Verification Code</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <ShieldCheck size={16} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value)}
                    placeholder="6-digit TOTP code"
                    required
                  />
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  id="rememberMeCheck"
                  type="checkbox"
                  className="form-check-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMeCheck" className="form-check-label small text-muted">
                  Remember session (30d)
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold rounded-3"
              disabled={authLoading}
            >
              {authLoading ? 'Connecting...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-link btn-sm text-decoration-none text-muted"
              onClick={enterDemoMode}
            >
              Continue in Offline Demo Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
