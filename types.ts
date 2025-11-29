export enum DoctorStatus {
  AVAILABLE = 'Available',
  BUSY = 'Busy',
  OFFLINE = 'Offline'
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  image: string;
  status: DoctorStatus;
  location: string;
  fee: number;
  nextAvailableSlot: string;
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  requiresPrescription: boolean;
}

export interface CartItem extends Medicine {
  quantity: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface UserProfile {
  name: string;
  age: number;
  bloodGroup: string;
  phone: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  history: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isSymptomCheck?: boolean;
}

export enum AppView {
  DASHBOARD = 'dashboard',
  DOCTORS = 'doctors',
  EMERGENCY = 'emergency',
  MEDICINE = 'medicine',
  CHAT = 'chat',
  PROFILE = 'profile',
  VIDEO_CALL = 'video_call'
}