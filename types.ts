export type UserRole = 'admin' | 'vocal_teacher';

export interface ScheduledClass {
  id: string;
  workshop: string;
  turma: string;
  dayOfWeek: string;
  time: string;
}

export interface Lesson {
  id: string;
  date: string; // YYYY-MM-DD
  workshop: string;
  turma: string;
  topic: string;
  content: string; // Markdown content
  materials: string[];
  attendance: { [studentId: string]: 'present' | 'absent' | 'late' };
}

export interface Student {
  id: string;
  name: string;
  age: number;
  contact: string;
  workshop: string;
  turma: string;
  dayOfWeek: string;
  time: string;
}