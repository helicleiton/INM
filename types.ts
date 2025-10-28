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
  workshop: string;
  turma: string;
  dayOfWeek?: string;
  time?: string;
}