import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  projects: Project[] = [];
  filteredProjects: Project[] = [];

  searchText = '';
  selectedClient = '';
  selectedStatus = '';
  selectedPriority = '';

  totalProjects = 0;
  inProgress = 0;
  finished = 0;
  late = 0;

  clients: string[] = [];

  constructor(private projectService: ProjectService) {
    this.projects = this.projectService.getProjects();
    this.filteredProjects = this.projects;

    this.clients = [...new Set(this.projects.map(project => project.client))];

    this.updateSummary();
  }

  updateSummary(): void {
    this.totalProjects = this.projects.length;
    this.inProgress = this.projects.filter(p => p.status === 'En progreso').length;
    this.finished = this.projects.filter(p => p.status === 'Finalizado').length;
    this.late = this.projects.filter(p => p.status === 'Atrasado').length;
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase();

    this.filteredProjects = this.projects.filter(project => {
      const matchSearch =
        project.name.toLowerCase().includes(search) ||
        project.deliverables.some(deliverable =>
          deliverable.description.toLowerCase().includes(search)
        );

      const matchClient =
        this.selectedClient === '' || project.client === this.selectedClient;

      const matchStatus =
        this.selectedStatus === '' || project.status === this.selectedStatus;

      const matchPriority =
        this.selectedPriority === '' || project.priority === this.selectedPriority;

      return matchSearch && matchClient && matchStatus && matchPriority;
    });
  }

  changeStatus(project: Project, newStatus: 'En progreso' | 'Finalizado' | 'Atrasado'): void {
    project.status = newStatus;

    if (newStatus === 'Finalizado') {
      project.progress = 100;
    }

    this.updateSummary();
    this.applyFilters();
  }

  hasLateDeliverables(project: Project): boolean {
    const today = new Date();

    return project.deliverables.some(deliverable =>
      !deliverable.delivered && new Date(deliverable.dueDate) < today
    );
  }
}