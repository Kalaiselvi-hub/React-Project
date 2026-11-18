import React from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';

// Views
import { DashboardView } from './components/views/DashboardView';
import { PatientsView } from './components/views/PatientsView';
import { DoctorsView } from './components/views/DoctorsView';
import { AppointmentsView } from './components/views/AppointmentsView';
import { ServicesView } from './components/views/ServicesView';
import { StaffManagementView } from './components/views/StaffManagementView';
import { BillingFinanceView } from './components/views/BillingFinanceView';
import { ReportsAnalyticsView } from './components/views/ReportsAnalyticsView';
import { InventoryView } from './components/views/InventoryView';
import { UserSettingsView } from './components/views/UserSettingsView';

// Modals
import { AddPatientModal } from './components/modals/AddPatientModal';
import { PatientRecordsModal } from './components/modals/PatientRecordsModal';
import { AddDoctorModal } from './components/modals/AddDoctorModal';
import { BookAppointmentModal } from './components/modals/BookAppointmentModal';
import { CreateBillModal } from './components/modals/CreateBillModal';
import { InvoiceDetailModal } from './components/modals/InvoiceDetailModal';
import { AddStaffModal } from './components/modals/AddStaffModal';
import { AdjustStockModal } from './components/modals/AdjustStockModal';

const MainLayout = () => {
  const { activeMenu } = useHospital();

  const renderActiveView = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardView />;
      case 'patients':
        return <PatientsView />;
      case 'doctors':
        return <DoctorsView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'services':
        return <ServicesView />;
      case 'staff':
        return <StaffManagementView />;
      case 'billing':
        return <BillingFinanceView />;
      case 'reports':
        return <ReportsAnalyticsView />;
      case 'inventory':
        return <InventoryView />;
      case 'settings':
        return <UserSettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="naira-app-container">
      {/* Left Sidebar Menu */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="naira-main-area">
        <Header />
        <main className="naira-content-scroll">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals */}
      <AddPatientModal />
      <PatientRecordsModal />
      <AddDoctorModal />
      <BookAppointmentModal />
      <CreateBillModal />
      <InvoiceDetailModal />
      <AddStaffModal />
      <AdjustStockModal />

      {/* Toast Banner */}
      <Toast />
    </div>
  );
};

function App() {
  return (
    <HospitalProvider>
      <MainLayout />
    </HospitalProvider>
  );
}

export default App;
