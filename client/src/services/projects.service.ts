import { httpService } from '@/services/http.service';
import type { Project } from '@/models/project.model';

class ProjectsService {
  public slug = 'api/projects';

  public async getProjects() {
    const response = await httpService.get<Project[]>(this.slug);
    return response.data;
  }

  public async getProject(projectId: string) {
    const response = await httpService.get<Project>(`${this.slug}/${projectId}`);
    return response.data;
  }

  public async createProject(project: Omit<Project, '_id'>) {
    const response = await httpService.post<Project>(this.slug, project);
    return response.data;
  }

  public async updateProject(project: Project) {
    const response = await httpService.put<Project>(`${this.slug}/${project._id}`, project);
    return response.data;
  }

  public async deleteProject(projectId: string) {
    const response = await httpService.delete<{ id: string }>(`${this.slug}/${projectId}`);
    return response.data;
  }

  public async searchProjects(searchParams: { query: string }) {
    const response = await httpService.post<Project[]>(`${this.slug}/search`, searchParams);
    return response.data;
  }
}

export const projectsService = new ProjectsService();
