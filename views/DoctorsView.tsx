import React, { useState } from 'react';
import { Star, MapPin, Clock, Video, Filter } from 'lucide-react';
import { Doctor, DoctorStatus } from '../types';
import { MOCK_DOCTORS } from '../constants';

interface DoctorsViewProps {
  onBook: (doctor: Doctor) => void;
}

const DoctorsView: React.FC<DoctorsViewProps> = ({ onBook }) => {
  const [filter, setFilter] = useState('');

  const filteredDoctors = MOCK_DOCTORS.filter(d => 
    d.name.toLowerCase().includes(filter.toLowerCase()) || 
    d.specialization.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search doctors, specializations..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
        <div className="flex space-x-2">
           <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Sort by Rating</button>
           <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Availability</button>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
            <div className="p-5 flex items-start space-x-4">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-20 h-20 rounded-xl object-cover border border-slate-100"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900">{doctor.name}</h3>
                  <div className="flex items-center text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {doctor.rating}
                  </div>
                </div>
                <p className="text-sm text-blue-600 font-medium">{doctor.specialization}</p>
                <p className="text-xs text-slate-500 mt-1">{doctor.experience} years exp.</p>
                
                <div className="flex items-center mt-2 text-xs text-slate-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {doctor.location}
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-sm">
               <div className="flex flex-col">
                 <span className="text-slate-500 text-xs">Next Slot</span>
                 <span className="font-semibold text-slate-700">{doctor.nextAvailableSlot}</span>
               </div>
               <div className="flex flex-col text-right">
                 <span className="text-slate-500 text-xs">Consultation Fee</span>
                 <span className="font-semibold text-slate-700">₹{doctor.fee}</span>
               </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex space-x-2">
              <button 
                onClick={() => onBook(doctor)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition"
              >
                Book Visit
              </button>
              <button className="px-3 py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50">
                <Video className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsView;