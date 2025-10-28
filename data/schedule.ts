export interface ScheduledClass {
  id: string;
  workshop: string;
  turma: string;
  dayOfWeek: string;
  time: string;
}

export const schedule: ScheduledClass[] = [
  // Musicalização
  { id: 'mus-a', workshop: 'Musicalização', turma: 'A', dayOfWeek: 'Segunda-feira', time: '08:00' },
  { id: 'mus-b', workshop: 'Musicalização', turma: 'B', dayOfWeek: 'Segunda-feira', time: '09:00' },
  { id: 'mus-c', workshop: 'Musicalização', turma: 'C', dayOfWeek: 'Terça-feira', time: '14:00' },

  // Violão
  { id: 'vio-a', workshop: 'Violão', turma: 'A', dayOfWeek: 'Segunda-feira', time: '10:00' },
  { id: 'vio-b', workshop: 'Violão', turma: 'B', dayOfWeek: 'Quarta-feira', time: '15:00' },
  { id: 'vio-c', workshop: 'Violão', turma: 'C', dayOfWeek: 'Sexta-feira', time: '09:00' },

  // Teclado
  { id: 'tec-a', workshop: 'Teclado', turma: 'A', dayOfWeek: 'Terça-feira', time: '08:00' },
  { id: 'tec-b', workshop: 'Teclado', turma: 'B', dayOfWeek: 'Terça-feira', time: '09:00' },
  { id: 'tec-c', workshop: 'Teclado', turma: 'C', dayOfWeek: 'Quinta-feira', time: '16:00' },
  
  // Canto Coral
  { id: 'can-a', workshop: 'Canto Coral', turma: 'A', dayOfWeek: 'Quarta-feira', time: '10:00' },
  { id: 'can-b', workshop: 'Canto Coral', turma: 'B', dayOfWeek: 'Sexta-feira', time: '11:00' },

  // Bateria
  { id: 'bat-a', workshop: 'Bateria', turma: 'A', dayOfWeek: 'Quinta-feira', time: '10:00' },
  { id: 'bat-b', workshop: 'Bateria', turma: 'B', dayOfWeek: 'Sábado', time: '09:00' },
];
