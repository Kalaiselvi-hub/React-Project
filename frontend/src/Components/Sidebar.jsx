import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarCheck,
  BriefcaseMedical,
  UserCog,
  ReceiptText,
  BarChart3,
  Package,
  Settings,
  Activity,
  HeartPulse,
  Bed,
  PhoneCall,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const Sidebar = () => {
  const {
    activeMenu,
    navigateTo,
    dashboardSubTab,
    patientsSubTab,
    doctorsSubTab,
    appointmentsSubTab,
    servicesSubTab,
    staffSubTab,
    billingSubTab,
    reportsSubTab,
    inventorySubTab,
    settingsSubTab,
    appointmentFilter,
    appointments,
    medicines,
    stats
  } = useHospital();

  // Keep track of which menus are expanded
  // By default, the active menu is expanded
  const [expandedMenus, setExpandedMenus] = useState({
    [activeMenu]: true
  });

  // Keep activeMenu expanded when activeMenu changes
  useEffect(() => {
    setExpandedMenus((prev) => ({
      ...prev,
      [activeMenu]: true
    }));
  }, [activeMenu]);

  const toggleExpand = (menuId, defaultSubTab) => {
    setExpandedMenus((prev) => {
      const isCurrentlyExpanded = !!prev[menuId];
      return {
        ...prev,
        [menuId]: !isCurrentlyExpanded
      };
    });
    // If selecting a new menu, navigate to it and its default sub-tab
    if (activeMenu !== menuId) {
      navigateTo(menuId, defaultSubTab);
    }
  };

  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const lowStockCount = medicines.filter((m) => m.status.includes('Low')).length;

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      defaultSubTab: 'overview',
      currentSubTab: dashboardSubTab,
      subItems: [
        { id: 'overview', label: 'Overview' },
        { id: 'liveStatus', label: 'Live Status' },
        { id: 'quickStats', label: 'Quick Stats' }
      ]
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: Users,
      badge: `${stats.admissionsTotal} in`,
      badgeColor: 'teal',
      defaultSubTab: 'list',
      currentSubTab: patientsSubTab,
      subItems: [
        { id: 'list', label: 'Patient List' },
        { id: 'add', label: 'Add New Patient' },
        { id: 'records', label: 'Patient Records' },
        { id: 'admissions', label: 'Admissions' }
      ]
    },
    {
      id: 'doctors',
      label: 'Doctors',
      icon: Stethoscope,
      defaultSubTab: 'list',
      currentSubTab: doctorsSubTab,
      subItems: [
        { id: 'list', label: 'Doctor Directory' },
        { id: 'add', label: 'Add New Doctor' },
        { id: 'departments', label: 'Departments' },
        { id: 'schedules', label: 'Doctor Schedules' },
        { id: 'loginAccess', label: 'Portal Login Access' }
      ]
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: CalendarCheck,
      badge: pendingCount > 0 ? `${pendingCount}` : null,
      badgeColor: 'teal',
      defaultSubTab: 'today',
      currentSubTab: appointmentFilter === 'Pending' ? 'pending' : appointmentsSubTab,
      subItems: [
        { id: 'today', label: 'All Appointments' },
        { id: 'book', label: 'Book Appointment' },
        { id: 'calendar', label: 'Appointment Calendar' },
        { id: 'pending', label: 'Pending Requests' }
      ]
    },
    {
      id: 'services',
      label: 'Services',
      icon: BriefcaseMedical,
      defaultSubTab: 'departments',
      currentSubTab: servicesSubTab,
      subItems: [
        { id: 'departments', label: 'All Services' },
        { id: 'treatments', label: 'Add New Service' },
        { id: 'facilities', label: 'Hospital Facilities' },
        { id: 'charges', label: 'Service Categories' }
      ]
    },
    {
      id: 'staff',
      label: 'Staff Management',
      icon: UserCog,
      defaultSubTab: 'list',
      currentSubTab: staffSubTab,
      subItems: [
        { id: 'list', label: 'Staff List' },
        { id: 'add', label: 'Add New Staff' },
        { id: 'permissions', label: 'Roles & Shifts' },
        { id: 'attendance', label: 'Attendance' }
      ]
    },
    {
      id: 'billing',
      label: 'Billing & Finance',
      icon: ReceiptText,
      defaultSubTab: 'overview',
      currentSubTab: billingSubTab,
      subItems: [
        { id: 'overview', label: 'Invoices' },
        { id: 'createBill', label: 'New Bill' },
        { id: 'payments', label: 'Payments' },
        { id: 'pending', label: 'Insurance' },
        { id: 'refunds', label: 'Reports' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      defaultSubTab: 'patient',
      currentSubTab: reportsSubTab,
      subItems: [
        { id: 'patient', label: 'Patient Reports' },
        { id: 'appointment', label: 'Appointment Reports' },
        { id: 'revenue', label: 'Revenue Reports' },
        { id: 'doctor', label: 'Doctor Performance' }
      ]
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: Package,
      badge: lowStockCount > 0 ? `${lowStockCount} low` : null,
      badgeColor: 'amber',
      defaultSubTab: 'medicines',
      currentSubTab: inventorySubTab,
      subItems: [
        { id: 'medicines', label: 'Medicine Stock' },
        { id: 'equipment', label: 'Medical Equipment' },
        { id: 'stockMgmt', label: 'Stock Management' },
        { id: 'lowStock', label: 'Low Stock Alerts' },
        { id: 'purchases', label: 'Purchase Records' }
      ]
    },
    {
      id: 'settings',
      label: 'User Settings',
      icon: Settings,
      defaultSubTab: 'profile',
      currentSubTab: settingsSubTab,
      subItems: [
        { id: 'profile', label: 'Admin Profile' },
        { id: 'edit', label: 'Edit Profile' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'password', label: 'Change Password' },
        { id: 'preferences', label: 'Hospital Preferences' }
      ]
    }
  ];

  return (
    <aside className="naira-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-logo-icon">
          <HeartPulse size={26} color="#00C2FF" />
        </div>
        <div className="brand-text-block">
          <h1 className="brand-name">
            NAIRA <span className="brand-tag">MED</span>
          </h1>
          <p className="brand-subtitle">Specialist Hospital Admin</p>
        </div>
      </div>

      {/* Main Nav Menu with Collapsible Sub-menus */}
      <nav className="sidebar-nav">
        <div className="nav-group-label">HOSPITAL MANAGEMENT</div>
        {menuStructure.map((menu) => {
          const Icon = menu.icon;
          const isActive = activeMenu === menu.id;
          const isExpanded = !!expandedMenus[menu.id];

          return (
            <div key={menu.id} className="menu-group-wrapper">
              {/* Main Menu Button */}
              <button
                type="button"
                onClick={() => toggleExpand(menu.id, menu.defaultSubTab)}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                aria-expanded={isExpanded}
              >
                <div className="nav-item-content">
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-label">{menu.label}</span>
                </div>

                <div className="nav-item-right flex items-center gap-2">
                  {menu.badge && (
                    <span className={`nav-badge badge-${menu.badgeColor || 'default'}`}>
                      {menu.badge}
                    </span>
                  )}
                  <span className={`nav-arrow ${isExpanded ? 'arrow-expanded' : ''}`}>
                    {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  </span>
                </div>
              </button>

              {/* Collapsible Sub-menu List */}
              {isExpanded && (
                <div className="sidebar-sub-menu animate-fadeIn">
                  {menu.subItems.map((sub) => {
                    const isSubActive = isActive && menu.currentSubTab === sub.id;

                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateTo(menu.id, sub.id);
                        }}
                        className={`sub-menu-item ${isSubActive ? 'active-sub-item' : ''}`}
                      >
                        <span className="sub-menu-dot"></span>
                        <span className="sub-menu-label">{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Hospital Live Status Card */}
      <div className="sidebar-bottom-card">
        <div className="bottom-card-header">
          <div className="status-live-dot"></div>
          <span className="live-status-title">Emergency Live Status</span>
        </div>
        <div className="bottom-card-stat">
          <Bed size={15} color="#00C2FF" />
          <span>ICU Beds: <strong>{stats.icuBedsOccupied}/{stats.icuBedsTotal} Occupied</strong></span>
        </div>
        <div className="bottom-card-stat">
          <Activity size={15} color="#10B981" />
          <span>ER Triage: <strong>Level-1 Ready</strong></span>
        </div>
        <div className="bottom-emergency-btn">
          <PhoneCall size={13} />
          <span>ER: +234 800 NAIRA</span>
        </div>
      </div>
    </aside>
  );
};
