import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Sidebar } from './Components/Sidebar';
import { Header } from './Components/Header';
import { Toast } from './Components/Toast';
import { LoginScreen } from './Components/LoginScreen';

// Views
import { DashboardView } from './Components/views/DashboardView';
import { PatientsView } from './Components/views/PatientsView';
import { DoctorsView } from './Components/views/DoctorsView';
import { AppointmentsView } from './Components/views/AppointmentsView';
import { ServicesView } from './Components/views/ServicesView';
import { StaffManagementView } from './Components/views/StaffManagementView';
import { BillingFinanceView } from './Components/views/BillingFinanceView';
import { ReportsAnalyticsView } from './Components/views/ReportsAnalyticsView';
import { InventoryView } from './Components/views/InventoryView';
import { UserSettingsView } from './Components/views/UserSettingsView';

// Modals
import { AddPatientModal } from './Components/modals/AddPatientModal';
import { PatientRecordsModal } from './Components/modals/PatientRecordsModal';
import { AddDoctorModal } from './Components/modals/AddDoctorModal';
import { BookAppointmentModal } from './Components/modals/BookAppointmentModal';
import { CreateBillModal } from './Components/modals/CreateBillModal';
import { InvoiceDetailModal } from './Components/modals/InvoiceDetailModal';
import { AddStaffModal } from './Components/modals/AddStaffModal';
import { AdjustStockModal } from './Components/modals/AdjustStockModal';

const MainLayout = () => {
  const { activeMenu, isAuthenticated, isDemoMode } = useHospital();

  if (!isAuthenticated && !isDemoMode) {
    return (
      <>
        <LoginScreen />
        <Toast />
      </>
    );
  }

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
