import React, { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import DoctorsView from './views/DoctorsView';
import EmergencyView from './views/EmergencyView';
import ChatView from './views/ChatView';
import MedicineView from './views/MedicineView';
import { AppView, Doctor, Appointment } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Simple State for Demo
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '101',
      doctorId: '1',
      doctorName: 'Dr. Aditi Sharma',
      date: '24 Oct 2023',
      time: '4:00 PM',
      status: 'Confirmed'
    }
  ]);

  const handleBook = (doctor: Doctor) => {
    if (confirm(`Confirm booking with ${doctor.name} on ${doctor.nextAvailableSlot}?`)) {
        const newApt: Appointment = {
            id: Date.now().toString(),
            doctorId: doctor.id,
            doctorName: doctor.name,
            date: doctor.nextAvailableSlot.split(',')[0],
            time: doctor.nextAvailableSlot.split(',')[1] || '10:00 AM',
            status: 'Confirmed'
        };
        setAppointments(prev => [...prev, newApt]);
        setCurrentView(AppView.DASHBOARD);
        alert('Appointment Confirmed!');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard userName="Sanjay" appointments={appointments} onChangeView={setCurrentView} />;
      case AppView.DOCTORS:
        return <DoctorsView onBook={handleBook} />;
      case AppView.EMERGENCY:
        return <EmergencyView />;
      case AppView.CHAT:
        return <ChatView />;
      case AppView.MEDICINE:
        return <MedicineView />;
      case AppView.VIDEO_CALL:
        return <div className="flex items-center justify-center h-full text-slate-500 bg-white rounded-xl">Video Consultation Feature Coming Soon</div>;
      case AppView.PROFILE:
        return <div className="flex items-center justify-center h-full text-slate-500 bg-white rounded-xl">Profile Management Coming Soon</div>;
      default:
        return <Dashboard userName="Sanjay" appointments={appointments} onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 z-10">
           <button 
             onClick={() => setIsMobileMenuOpen(true)}
             className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
           >
             <Menu className="w-6 h-6" />
           </button>

           <div className="flex-1 md:flex-none"></div>

           <div className="flex items-center space-x-4">
             <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
             <div className="flex items-center space-x-2 pl-4 border-l border-slate-100">
               <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                 SJ
               </div>
               <span className="hidden md:block text-sm font-medium text-slate-700">Sanjay J.</span>
             </div>
           </div>
        </header>

        {/* Scrollable Main View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;