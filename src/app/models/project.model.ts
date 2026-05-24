export interface Deliverable {
  id: number;
  description: string;
  dueDate: string;
  delivered: boolean;
  file: string;
}

export interface Comment {
  user: string;
  message: string;
  date: string;
}

export interface Project {
  id: number;
  name: string;
  client: string;
  priority: 'Alta' | 'Media' | 'Baja';
  status: 'En progreso' | 'Finalizado' | 'Atrasado';
  progress: number;
  deliverables: Deliverable[];
  comments: Comment[];
}