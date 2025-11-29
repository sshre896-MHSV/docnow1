import React from 'react';
import { Activity, Calendar, Clock, MapPin, Heart, Thermometer, Pill } from 'lucide-react';
import { AppView, Appointment } from '../types';

interface DashboardProps {
  userName: string;
  appointments: Appointment[];
  onChangeView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, appointments, onChangeView }) => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hello, {userName}</h2>
          <p className="text-slate-500">How are you feeling today?</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span>Bangalore, India</span>
        </div>
      </header>

      {/* Health Score Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2">
          <div className="p-2 bg-rose-100 rounded-full text-rose-600">
            <Heart className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-slate-800">72</span>
          <span className="text-xs text-slate-500">Heart Rate (bpm)</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2">
          <div className="p-2 bg-blue-100 rounded-full text-blue-600">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-slate-800">110/70</span>
          <span className="text-xs text-slate-500">Blood Pressure</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2">
          <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
            <Thermometer className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-slate-800">98.6°F</span>
          <span className="text-xs text-slate-500">Body Temp</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2">
          <div className="p-2 bg-green-100 rounded-full text-green-600">
            <Clock className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-slate-800">7.5h</span>
          <span className="text-xs text-slate-500">Sleep Avg</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Upcoming Appointments</h3>
            <button 
              onClick={() => onChangeView(AppView.DOCTORS)}
              className="text-sm text-blue-600 hover:underline"
            >
              Book New
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {appointments.length > 0 ? (
              appointments.map((apt) => (
                <div key={apt.id} className="p-4 border-b border-slate-100 last:border-0 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                      {apt.date.split(' ')[0]}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{apt.doctorName}</h4>
                      <p className="text-sm text-slate-500">{apt.time} • {apt.status}</p>
                    </div>
                  </div>
                  <button className="text-sm px-3 py-1 bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200">
                    Reschedule
                  </button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No upcoming appointments
              </div>
            )}
          </div>

          {/* Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex justify-between items-center shadow-lg">
            <div>
              <h3 className="font-bold text-lg mb-1">Feeling unwell?</h3>
              <p className="text-blue-100 text-sm mb-4">Check your symptoms instantly with our AI.</p>
              <button 
                onClick={() => onChangeView(AppView.CHAT)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition"
              >
                Start Symptom Check
              </button>
            </div>
            <Activity className="w-16 h-16 opacity-20" />
          </div>
        </div>

        {/* Quick Actions / Queue */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Smart Queue Status</h3>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
             <div className="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-500 mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-slate-800">4</span>
             </div>
             <p className="font-medium text-slate-800">Patients ahead of you</p>
             <p className="text-sm text-slate-500 mt-1">Est. Wait: 15 mins</p>
             <div className="mt-4 pt-4 border-t border-slate-100">
               <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">Doctor is In</span>
             </div>
          </div>

          <h3 className="font-semibold text-slate-800 pt-2">Daily Meds</h3>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3">
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                   <Pill className="w-4 h-4" />
                 </div>
                 <div className="text-sm">
                   <p className="font-medium">Vitamin D</p>
                   <p className="text-slate-500 text-xs">After Lunch</p>
                 </div>
               </div>
               <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" defaultChecked />
             </div>
             <div className="flex items-center justify-between opacity-50">
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                   <Pill className="w-4 h-4" />
                 </div>
                 <div className="text-sm">
                   <p className="font-medium">Thyronorm</p>
                   <p className="text-slate-500 text-xs">Before Breakfast</p>
                 </div>
               </div>
               <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" checked disabled />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;