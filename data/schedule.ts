import { ScheduledClass } from '../types';

export const initialSchedule: ScheduledClass[] = [
  // Terça-feira
  { id: 'tec-a', workshop: 'Teclado', turma: 'A', dayOfWeek: 'Terça-feira', time: '08:00' },
  { id: 'mus-tec-a', workshop: 'Musicalização Teclado', turma: 'A', dayOfWeek: 'Terça-feira', time: '09:00' },
  { id: 'tec-b', workshop: 'Teclado', turma: 'B', dayOfWeek: 'Terça-feira', time: '14:00' },
  { id: 'mus-tec-b', workshop: 'Musicalização Teclado', turma: 'B', dayOfWeek: 'Terça-feira', time: '15:00' },
  { id: 'tec-c', workshop: 'Teclado', turma: 'C', dayOfWeek: 'Terça-feira', time: '16:00' },
  { id: 'tec-e', workshop: 'Teclado', turma: 'E', dayOfWeek: 'Terça-feira', time: '18:00' },

  // Quinta-feira
  { id: 'vio-a', workshop: 'Violão', turma: 'A', dayOfWeek: 'Quinta-feira', time: '08:00' },
  { id: 'vio-b', workshop: 'Violão', turma: 'B', dayOfWeek: 'Quinta-feira', time: '14:00' },
  { id: 'mus-vio-b', workshop: 'Musicalização Violão', turma: 'B', dayOfWeek: 'Quinta-feira', time: '15:00' },
  { id: 'vio-c', workshop: 'Violão', turma: 'C', dayOfWeek: 'Quinta-feira', time: '18:00' },

  // Sábado
  { id: 'tec-voc-a', workshop: 'Técnica Vocal', turma: 'A', dayOfWeek: 'Sábado', time: '08:00 - 10:00' },
  { id: 'tec-d', workshop: 'Teclado', turma: 'D', dayOfWeek: 'Sábado', time: '13:00' },
  { id: 'tec-f', workshop: 'Teclado', turma: 'F', dayOfWeek: 'Sábado', time: '14:00' },
  { id: 'mus-tec-c', workshop: 'Musicalização Teclado', turma: 'C', dayOfWeek: 'Sábado', time: '15:00' },
];