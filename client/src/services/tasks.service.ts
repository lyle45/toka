import { httpService } from '@/services/http-service/http.service';
import type { Task } from '@/models/task.model';

export class TasksService {
  public slug = '/api/tasks';

  public async getTasks() {
    const response = await httpService.get<Task[]>(this.slug);
    return response.data;
  }

  public async getTask(taskId: string) {
    const response = await httpService.get<Task>(`${this.slug}/${taskId}`);
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
