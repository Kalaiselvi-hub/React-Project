import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Bell,
  Plus,
  Clock,
  User,
  AlertCircle,
  FileText,
  UserPlus,
  CalendarPlus,
  Receipt,
  X,
  LogOut
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    patients,
    doctors,
    appointments,
    bills,
    userProfile,
    setActiveMenu,
    navigateTo,
    setSelectedPatient,
    setIsPatientModalOpen,
    setIsAddPatientModalOpen,
    setIsBookAppointmentModalOpen,
    setIsCreateBillModalOpen
  } = useHospital();

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileDropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutConfirm = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loginData');
      localStorage.removeItem('admin');
    } catch (err) {
      console.error('Error clearing storage:', err);
    }
    setShowLogoutConfirm(false);
    window.location.href = '/login';
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      setCurrentDate(
        now.toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtered search results across models
  const filteredPatients = searchQuery.trim()
    ? patients.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.phone.includes(searchQuery)
      ).slice(0, 3)
    : [];

  const filteredDoctors = searchQuery.trim()
    ? doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.department.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const notificationsList = [
    { id: 1, title: 'Low Stock Alert', desc: 'Insulin Glargine Pen stock is critically low (8 left)', time: '10m ago', urgent: true },
    { id: 2, title: 'New Emergency Patient', desc: 'Chioma Eze admitted to Emergency Bay 02', time: '25m ago', urgent: true },
    { id: 3, title: 'Payment Confirmed', desc: 'GTBank NIP Transfer ₦185,000 received for INV-0841', time: '1h ago', urgent: false },
    { id: 4, title: 'Doctor On-Call Update', desc: 'Dr. Halima Bello-Osagie started Labor Ward shift', time: '2h ago', urgent: false }
  ];

  return (
    <header className="naira-header">
      {/* Search Bar */}
      <div className="header-search-container">
        <Search size={18} className="search-icon text-muted" />
        <input
          type="text"
          placeholder="Search patients, doctors, appointments, invoices..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSearchDropdown(e.target.value.trim().length > 0);
          }}
          onFocus={() => {
            if (searchQuery.trim().length > 0) setShowSearchDropdown(true);
          }}
          className="header-search-input"
        />
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => {
              setSearchQuery('');
              setShowSearchDropdown(false);
            }}
          >
            <X size={14} />
          </button>
        )}

        {/* Live Search Quick Results Dropdown */}
        {showSearchDropdown && (
          <div className="search-results-dropdown">
            {filteredPatients.length === 0 && filteredDoctors.length === 0 ? (
              <div className="no-search-results">No records found for "{searchQuery}"</div>
            ) : (
              <>
                {filteredPatients.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-title">Patients</div>
                    {filteredPatients.map((p) => (
                      <div
                        key={p.id}
                        className="search-item"
                        onClick={() => {
                          setSelectedPatient(p);
                          setIsPatientModalOpen(true);
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                        }}
                      >
                        <div className="search-item-title">{p.name} ({p.id})</div>
                        <div className="search-item-sub">
                          {p.age}y • {p.gender} • {p.department} • <span className="status-pill">{p.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredDoctors.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-title">Doctors</div>
                    {filteredDoctors.map((d) => (
                      <div
                        key={d.id}
                        className="search-item"
                        onClick={() => {
                          setActiveMenu('doctors');
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                        }}
                      >
                        <div className="search-item-title">{d.name}</div>
                        <div className="search-item-sub">{d.department} • {d.specialization}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Action Icons & Profile */}
      <div className="header-right-actions">
        {/* Quick Action Buttons */}
        <div className="quick-actions-group">
          <button
            className="btn btn-outline-teal btn-sm"
            onClick={() => setIsAddPatientModalOpen(true)}
            title="Register Patient"
          >
            <UserPlus size={15} />
            <span className="hide-mobile">Add Patient</span>
          </button>
          <button
            className="btn btn-outline-teal btn-sm"
            onClick={() => setIsBookAppointmentModalOpen(true)}
            title="Book Appointment"
          >
            <CalendarPlus size={15} />
            <span className="hide-mobile">Book Apt</span>
          </button>
          <button
            className="btn btn-teal-primary btn-sm"
            onClick={() => setIsCreateBillModalOpen(true)}
            title="Create Invoice"
          >
            <Receipt size={15} />
            <span className="hide-mobile">New Bill</span>
          </button>
        </div>

        {/* Live Clock */}
        <div className="header-time-pill">
          <Clock size={14} className="text-teal" />
          <div className="time-text">
            <span className="clock-time">{currentTime || '12:00 PM'}</span>
            <span className="clock-date">{currentDate}</span>
          </div>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="notification-wrapper">
          <button
            className="header-icon-button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="notification-count-badge">4</span>
          </button>

          {showNotifications && (
            <div className="notifications-dropdown-menu">
              <div className="notif-header">
                <h3>Hospital Alerts</h3>
                <span className="notif-badge">4 New</span>
              </div>
              <div className="notif-list">
                {notificationsList.map((notif) => (
                  <div key={notif.id} className={`notif-item ${notif.urgent ? 'urgent' : ''}`}>
                    <div className="notif-item-header">
                      <span className="notif-title">{notif.title}</span>
                      <span className="notif-time">{notif.time}</span>
                    </div>
                    <p className="notif-desc">{notif.desc}</p>
                  </div>
                ))}
              </div>
              <div className="notif-footer">
                <button
                  className="btn-link"
                  onClick={() => {
                    setActiveMenu('settings');
                    setShowNotifications(false);
                  }}
                >
                  Manage Alert Preferences
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill & Dropdown */}
        <div className="header-profile-wrapper" ref={profileDropdownRef}>
          <div
            className="header-profile-pill"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
            title="Admin Profile"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="profile-avatar"
            />
            <div className="profile-info-text">
              <div className="profile-name-row">
                <span className="profile-name">{userProfile.name}</span>
                <span className="online-indicator"></span>
              </div>
              <span className="profile-role">{userProfile.role}</span>
            </div>
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileDropdown && (
            <div className="profile-dropdown-menu">
              <button
                type="button"
                className="profile-dropdown-item"
                onClick={() => {
                  setShowProfileDropdown(false);
                  if (navigateTo) {
                    navigateTo('settings', 'profile');
                  } else {
                    setActiveMenu('settings');
                  }
                }}
              >
                <User size={16} />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                className="profile-dropdown-item logout-item"
                onClick={() => {
                  setShowProfileDropdown(false);
                  setShowLogoutConfirm(true);
                }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div
          className="modal-backdrop"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="modal-box modal-logout-confirm animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-wrap">
                <LogOut size={20} className="logout-icon-danger" />
                <h3 className="modal-title">Confirm Logout</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowLogoutConfirm(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body logout-modal-body">
              <p className="logout-confirm-text">
                Are you sure you want to logout?
              </p>
            </div>
            <div className="modal-footer logout-modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary logout-cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger logout-confirm-btn"
                onClick={handleLogoutConfirm}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
