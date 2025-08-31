export interface Hospital {
  id: string;
  name: string;
  location: string;
  email: string;
  phone: string;
}

export interface Patient {
  id: string;
  uid: string;
  name: string;
  email: string;
  phone: string;
  hospitalId: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  hospitalId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  token: number;
}

export interface Queue {
  hospitalId: string;
  currentNumber: number;
  estimatedWaitMinutes: number;
}
