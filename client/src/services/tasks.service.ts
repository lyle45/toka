import { httpService } from '@/services/http.service';
import type { NewTask, Task } from '@/models/task.model';

export interface GetTasksParams {
  projectId?: string;
}

export class TasksService {
  public slug = '/api/tasks';

  public async getTasks({ projectId }: GetTasksParams = {}) {
    const response = await httpService.get<Task[]>(this.slug, { params: { projectId } });
    return response.data;
  }

  public async getTask(taskId: string) {
    const response = await httpService.get<Task>(`${this.slug}/${taskId}`);
    return response.data;
  }

  public async createTask(task: NewTask) {
    const response = await httpService.post<Task>(this.slug, task);
    return response.data;
  }

  public async updateTask(task: Task) {
    const response = await httpService.put<Task>(`${this.slug}/${task._id}`, task);
    return response.data;
  }

  public async deleteTask(taskId: string) {
    const response = await httpService.delete<{ id: string }>(`${this.slug}/${taskId}`);
    return response.data;
  }

  public async searchTasks(searchParams: { query: string }) {
    const response = await httpService.post<Task[]>(`${this.slug}/search`, searchParams);
    return response.data;
  }
}

export const tasksService = new TasksService();
