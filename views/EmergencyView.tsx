import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Ambulance, ShieldAlert, Navigation } from 'lucide-react';
import { findNearbyHospitals } from '../services/geminiService';

const EmergencyView: React.FC = () => {
  const [location, setLocation] = useState<string>('Detecting location...');
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sosSent, setSosSent] = useState(false);

  useEffect(() => {
    // Simulate Geo Location
    setTimeout(() => {
      setLocation('Indiranagar, Bangalore, KA');
      fetchHospitals('Indiranagar, Bangalore');
    }, 1500);
  }, []);

  const fetchHospitals = async (loc: string) => {
    setLoading(true);
    // Use Gemini Grounding (Mocked somewhat if API key fails, but structured for success)
    const result = await findNearbyHospitals(loc);
    setLoading(false);
    
    // Parse result purely for demo display if chunks aren't perfectly structured
    // In a real app, we'd use the typed chunks.
    if (result.chunks && result.chunks.length > 0) {
        setHospitals(result.chunks.filter(c => c.googleMapsMetadata));
    } else {
        // Fallback mock if API limit reached or key missing in demo
        setHospitals([
            { dummy: true, name: 'Manipal Hospital', address: 'Old Airport Road', rating: '4.8' },
            { dummy: true, name: 'Chinmaya Mission Hospital', address: 'Indiranagar 1st Stage', rating: '4.2' },
        ]);
    }
  };

  const handleSOS = () => {
    setSosSent(true);
    // Simulate API call to backend
    setTimeout(() => setSosSent(false), 5000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start space-x-3">
        <ShieldAlert className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-lg font-bold text-red-700">Emergency Mode Active</h2>
          <p className="text-red-600 text-sm">Your location is being tracked. Guardian notified.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
        <div className="p-6 text-center space-y-4">
           <button 
             onClick={handleSOS}
             className={`w-40 h-40 rounded-full flex flex-col items-center justify-center mx-auto shadow-xl transition-all ${sosSent ? 'bg-green-600 scale-95' : 'bg-red-600 hover:bg-red-700 active:scale-95'}`}
           >
             <div className="text-white font-bold text-3xl">{sosSent ? 'SENT' : 'SOS'}</div>
             <div className="text-red-100 text-sm mt-1">{sosSent ? 'Alert Sent' : 'Tap to Alert'}</div>
           </button>
           <p className="text-slate-500 text-sm">
             Pressing SOS sends an alert to your emergency contacts: <br/>
             <strong>Mom (+91 98765 43210)</strong>
           </p>
        </div>
        
        <div className="grid grid-cols-2 border-t border-slate-100">
          <button className="p-4 flex flex-col items-center justify-center hover:bg-slate-50 border-r border-slate-100 transition">
            <Phone className="w-8 h-8 text-green-600 mb-2" />
            <span className="font-semibold text-slate-700">Call Ambulance</span>
            <span className="text-xs text-slate-400">108 / 102</span>
          </button>
          <button className="p-4 flex flex-col items-center justify-center hover:bg-slate-50 transition">
            <Phone className="w-8 h-8 text-blue-600 mb-2" />
            <span className="font-semibold text-slate-700">Call Police</span>
            <span className="text-xs text-slate-400">100</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            Nearest Hospitals
          </h3>
          <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{location}</span>
        </div>

        {loading ? (
            <div className="text-center py-8 text-slate-400">Finding nearest help...</div>
        ) : (
            <div className="space-y-3">
                {hospitals.map((h, idx) => {
                    const meta = h.googleMapsMetadata;
                    // Handle both Gemini Grounding format and fallback format
                    const name = meta?.place?.name || h.name || 'Unknown Hospital';
                    const addr = meta?.place?.formattedAddress || h.address || 'Address unavailable';
                    const rating = meta?.place?.rating || h.rating || 'N/A';

                    return (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div>
                                <h4 className="font-semibold text-slate-900">{name}</h4>
                                <p className="text-sm text-slate-500">{addr}</p>
                                <div className="flex items-center mt-1 text-xs text-orange-500">
                                    <span>★ {rating}</span>
                                </div>
                            </div>
                            <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                                <Navigation className="w-5 h-5" />
                            </button>
                        </div>
                    );
                })}
            </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyView;