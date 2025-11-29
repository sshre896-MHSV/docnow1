import { Doctor, DoctorStatus, Medicine } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Aditi Sharma',
    specialization: 'Cardiologist',
    experience: 12,
    rating: 4.8,
    image: 'https://picsum.photos/100/100?random=1',
    status: DoctorStatus.AVAILABLE,
    location: 'Bangalore, Indiranagar',
    fee: 800,
    nextAvailableSlot: 'Today, 4:00 PM'
  },
  {
    id: '2',
    name: 'Dr. Rajesh Koothrappali',
    specialization: 'General Physician',
    experience: 8,
    rating: 4.5,
    image: 'https://picsum.photos/100/100?random=2',
    status: DoctorStatus.BUSY,
    location: 'Mumbai, Bandra',
    fee: 500,
    nextAvailableSlot: 'Tomorrow, 10:00 AM'
  },
  {
    id: '3',
    name: 'Dr. Sarah Jenkin',
    specialization: 'Pediatrician',
    experience: 15,
    rating: 4.9,
    image: 'https://picsum.photos/100/100?random=3',
    status: DoctorStatus.AVAILABLE,
    location: 'Delhi, CP',
    fee: 1200,
    nextAvailableSlot: 'Today, 2:30 PM'
  },
  {
    id: '4',
    name: 'Dr. John Doe',
    specialization: 'Orthopedic',
    experience: 20,
    rating: 4.7,
    image: 'https://picsum.photos/100/100?random=4',
    status: DoctorStatus.OFFLINE,
    location: 'Chennai, T. Nagar',
    fee: 1000,
    nextAvailableSlot: 'Mon, 11:00 AM'
  }
];

export const MOCK_MEDICINES: Medicine[] = [
  {
    id: 'm1',
    name: 'Paracetamol 650mg',
    price: 30,
    category: 'Fever',
    image: 'https://picsum.photos/200/200?random=10',
    requiresPrescription: false
  },
  {
    id: 'm2',
    name: 'Azithromycin 500mg',
    price: 120,
    category: 'Antibiotic',
    image: 'https://picsum.photos/200/200?random=11',
    requiresPrescription: true
  },
  {
    id: 'm3',
    name: 'Vitamin C + Zinc',
    price: 85,
    category: 'Supplements',
    image: 'https://picsum.photos/200/200?random=12',
    requiresPrescription: false
  },
  {
    id: 'm4',
    name: 'Cough Syrup',
    price: 110,
    category: 'Cold & Flu',
    image: 'https://picsum.photos/200/200?random=13',
    requiresPrescription: false
  }
];