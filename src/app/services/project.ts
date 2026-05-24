import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [
    {
      id: 1,
      name: 'Sistema Ecommerce',
      client: 'Falabella',
      priority: 'Alta',
      status: 'En progreso',
      progress: 65,
      deliverables: [
        {
          id: 1,
          description: 'Diseño Frontend',
          dueDate: '2026-05-30',
          delivered: true,
          file: 'frontend.pdf'
        },
        {
          id: 2,
          description: 'Backend API',
          dueDate: '2026-06-05',
          delivered: false,
          file: 'api.zip'
        }
      ],
      comments: [
        {
          user: 'Cliente',
          message: 'Buen avance del proyecto.',
          date: '2026-05-20'
        }
      ]
    },

    {
      id: 2,
      name: 'Dashboard BI',
      client: 'Banco Chile',
      priority: 'Media',
      status: 'Atrasado',
      progress: 40,
      deliverables: [
        {
          id: 1,
          description: 'Modelo de datos',
          dueDate: '2026-05-15',
          delivered: false,
          file: 'modelo.sql'
        }
      ],
      comments: [
        {
          user: 'Cliente',
          message: 'Se requiere acelerar entregas.',
          date: '2026-05-18'
        }
      ]
    }
  ];

  getProjects(): Project[] {
    return this.projects;
  }
}