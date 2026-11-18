import React, { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Lock,
  Building2,
  ShieldCheck,
  Check,
  Save,
  KeyRound,
  Phone,
  Mail,
  MapPin,
  Clock,
  Wallet
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const UserSettingsView = () => {
  const {
    userProfile,
    settingsSubTab,
    navigateTo,
    updateUserProfile,
    toggleNotification,
    showToast
  } = useHospital();

  // Profile Edit Form State
  const [profileForm, setProfileForm] = useState({
    name: userProfile.name,
    title: userProfile.title,
    email: userProfile.email,
    phone: userProfile.phone,
    department: userProfile.department,
    location: userProfile.location
  });

  // Password Change Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (val) => {
    setPasswordForm({ ...passwordForm, newPassword: val });
    let strength = 0;
    if (val.length >= 8) strength += 25;
    if (/[A-Z]/.test(val)) strength += 25;
    if (/[0-9]/.test(val)) strength += 25;
    if (/[^A-Za-z0-9]/.test(val)) strength += 25;
    setPasswordStrength(strength);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    navigateTo('settings', 'profile');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.newPassword || passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('Passwords do not match or are empty!', 'error');
      return;
    }
    showToast('Administrator password updated successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordStrength(0);
    navigateTo('settings', 'profile');
  };

  return (
    <div className="view-container settings-view">
      {/* Header */}
      <div className="view-header">
        <div>
          <h2 className="view-title">
            {settingsSubTab === 'profile' && 'Administrator Profile'}
            {settingsSubTab === 'edit' && 'Edit Profile Information'}
            {settingsSubTab === 'notifications' && 'System Notification Rules'}
            {settingsSubTab === 'password' && 'Security & Password Credentials'}
            {settingsSubTab === 'preferences' && 'NAIRA Hospital Localization Preferences'}
          </h2>
          <p className="view-description">
            {settingsSubTab === 'profile' && 'Verified credentials, executive board roles, and institutional affiliations'}
            {settingsSubTab === 'edit' && 'Update clinical designation, contact numbers, and office department'}
            {settingsSubTab === 'notifications' && 'Emergency code blue dispatch, critical low-stock alerts, and daily financial summaries'}
            {settingsSubTab === 'password' && 'Encrypted authentication credentials and two-factor authenticator controls'}
            {settingsSubTab === 'preferences' && 'Hospital currency symbol (₦), African/Lagos timezone, and trauma hotline parameters'}
          </p>
        </div>
      </div>

      {/* Tab 1: Profile View */}
      {settingsSubTab === 'profile' && (
        <div className="profile-layout-grid">
          <div className="content-card profile-card p-4">
            <div className="profile-card-top text-center">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="profile-large-avatar mx-auto mb-3"
              />
              <h3 className="profile-full-name">{userProfile.name}</h3>
              <p className="profile-title-text text-teal font-bold">{userProfile.title}</p>
              <span className="badge badge-dept mt-2">{userProfile.role}</span>
            </div>

            <div className="profile-info-list mt-4">
              <div className="profile-info-item">
                <Mail size={16} className="text-teal" />
                <div>
                  <span className="text-muted text-xs">Email Address</span>
                  <div className="font-bold">{userProfile.email}</div>
                </div>
              </div>

              <div className="profile-info-item">
                <Phone size={16} className="text-teal" />
                <div>
                  <span className="text-muted text-xs">Direct Line</span>
                  <div className="font-bold">{userProfile.phone}</div>
                </div>
              </div>

              <div className="profile-info-item">
                <Building2 size={16} className="text-teal" />
                <div>
                  <span className="text-muted text-xs">Hospital Centre</span>
                  <div className="font-bold">{userProfile.hospitalName}</div>
                </div>
              </div>

              <div className="profile-info-item">
                <MapPin size={16} className="text-teal" />
                <div>
                  <span className="text-muted text-xs">Location</span>
                  <div className="font-bold">{userProfile.location}</div>
                </div>
              </div>
            </div>

            <div className="profile-card-footer mt-4">
              <button
                className="btn btn-teal-primary w-full"
                onClick={() => navigateTo('settings', 'edit')}
              >
                Edit Administrator Details
              </button>
            </div>
          </div>

          <div className="content-card p-4">
            <h3 className="font-bold text-navy mb-3">Security & Account Summary</h3>
            <div className="security-summary-boxes grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="security-badge-card">
                <div className="sec-icon icon-teal">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <strong>Two-Factor Authentication</strong>
                  <p className="text-xs text-muted">Secured via Google Authenticator (Active)</p>
                </div>
              </div>

              <div className="security-badge-card">
                <div className="sec-icon icon-navy">
                  <KeyRound size={20} />
                </div>
                <div>
                  <strong>Session Active</strong>
                  <p className="text-xs text-muted">IP: 102.89.44.12 (Lagos, Nigeria)</p>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-navy mt-4 mb-2">Active Privileges</h4>
            <div className="privilege-tags flex flex-wrap gap-2">
              <span className="badge badge-teal">Super Administrator</span>
              <span className="badge badge-teal">Full EHR Access</span>
              <span className="badge badge-teal">Billing & Revenue Sign-off</span>
              <span className="badge badge-teal">Pharmacy Procurement Audit</span>
              <span className="badge badge-teal">Clinical Staff Management</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Edit Profile Form */}
      {settingsSubTab === 'edit' && (
        <div className="content-card max-w-4xl mx-auto">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Settings size={20} className="text-teal" />
              <div>
                <h3>Edit Profile Information</h3>
                <p className="card-subtext">Update name, contact info, and medical executive title</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="p-4 form-grid">
            <div className="form-group col-span-2">
              <label>Full Administrator Name *</label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Executive Title</label>
              <input
                type="text"
                value={profileForm.title}
                onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                required
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                required
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Medical Location</label>
              <input
                type="text"
                value={profileForm.location}
                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigateTo('settings', 'profile')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-teal-primary">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Notifications Toggles */}
      {settingsSubTab === 'notifications' && (
        <div className="content-card max-w-4xl mx-auto">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Bell size={18} className="text-teal" />
              <div>
                <h3>Notification & Alert Dispatch Rules</h3>
                <p className="card-subtext">Configure hospital emergency broadcasts, SMS gateway, and daily digests</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Emergency Code Blue Broadcasts</strong>
                <p className="text-xs text-muted">Immediate high-priority alert for critical resuscitation events</p>
              </div>
              <button
                className={`switch-toggle ${userProfile.notifications?.emergencyBroadcasts ? 'active' : ''}`}
                onClick={() => toggleNotification('emergencyBroadcasts')}
              >
                <span className="switch-thumb"></span>
              </button>
            </div>

            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Critical Low Stock Alerts (&lt; 10 Units)</strong>
                <p className="text-xs text-muted">Trigger notifications when emergency medications reach threshold</p>
              </div>
              <button
                className={`switch-toggle ${userProfile.notifications?.lowStockAlerts ? 'active' : ''}`}
                onClick={() => toggleNotification('lowStockAlerts')}
              >
                <span className="switch-thumb"></span>
              </button>
            </div>

            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Daily Financial Revenue Summary (08:00 PM)</strong>
                <p className="text-xs text-muted">Automated digest of total POS, bank transfer, and cash collections</p>
              </div>
              <button
                className={`switch-toggle ${userProfile.notifications?.financialSummaryDaily ? 'active' : ''}`}
                onClick={() => toggleNotification('financialSummaryDaily')}
              >
                <span className="switch-thumb"></span>
              </button>
            </div>

            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Patient Admission & Discharge SMS Alerts</strong>
                <p className="text-xs text-muted">Automated SMS to attending doctors when patients are admitted</p>
              </div>
              <button
                className={`switch-toggle ${userProfile.notifications?.admissionSmsAlerts ? 'active' : ''}`}
                onClick={() => toggleNotification('admissionSmsAlerts')}
              >
                <span className="switch-thumb"></span>
              </button>
            </div>

            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Security Audit Log Notifications</strong>
                <p className="text-xs text-muted">Alert administrator upon failed doctor login attempts or role modifications</p>
              </div>
              <button
                className={`switch-toggle ${userProfile.notifications?.securityAuditLog ? 'active' : ''}`}
                onClick={() => toggleNotification('securityAuditLog')}
              >
                <span className="switch-thumb"></span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Change Password */}
      {settingsSubTab === 'password' && (
        <div className="content-card max-w-2xl mx-auto">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Lock size={18} className="text-teal" />
              <div>
                <h3>Change Administrator Password</h3>
                <p className="card-subtext">Ensure high security with a strong combination of characters</p>
              </div>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="p-4 space-y-4">
            <div className="form-group">
              <label>Current Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>New Password *</label>
              <input
                type="password"
                required
                placeholder="Enter new strong password"
                value={passwordForm.newPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="form-control"
              />
              {/* Strength Meter */}
              <div className="password-strength-container mt-2">
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${passwordStrength}%`,
                      backgroundColor:
                        passwordStrength <= 25
                          ? '#EF4444'
                          : passwordStrength <= 50
                          ? '#F59E0B'
                          : passwordStrength <= 75
                          ? '#00C2FF'
                          : '#10B981'
                    }}
                  ></div>
                </div>
                <div className="strength-label mt-1 text-xs text-muted">
                  Strength: {passwordStrength === 100 ? 'Very Strong' : passwordStrength >= 50 ? 'Moderate' : 'Weak'}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password *</label>
              <input
                type="password"
                required
                placeholder="Re-type new password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigateTo('settings', 'profile')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-teal-primary">
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 5: Hospital Preferences */}
      {settingsSubTab === 'preferences' && (
        <div className="content-card max-w-3xl mx-auto p-4">
          <div className="card-header-bar mb-3">
            <div className="card-header-title">
              <Building2 size={18} className="text-teal" />
              <div>
                <h3>Hospital System Localization & Parameters</h3>
                <p className="card-subtext">Currency, timezone, and emergency operational values</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="pref-row">
              <div className="pref-label">
                <Wallet size={16} className="text-teal" />
                <span>Primary Hospital Currency</span>
              </div>
              <strong className="font-mono text-teal">₦ Nigerian Naira (NGN)</strong>
            </div>

            <div className="pref-row">
              <div className="pref-label">
                <Clock size={16} className="text-teal" />
                <span>Hospital Timezone</span>
              </div>
              <strong>Africa/Lagos (WAT, GMT+1)</strong>
            </div>

            <div className="pref-row">
              <div className="pref-label">
                <Phone size={16} className="text-rose" />
                <span>Emergency Trauma Hotline</span>
              </div>
              <strong className="font-mono">+234 800 NAIRA (62472)</strong>
            </div>

            <div className="pref-row">
              <div className="pref-label">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Encrypted EHR Cloud Backup</span>
              </div>
              <span className="badge badge-success">Automated Daily at 02:00 AM</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
