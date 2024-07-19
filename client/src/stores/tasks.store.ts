import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/models/task.model';
import { type GetTasksParams, tasksService } from '@/services/tasks.service';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);

  const fetchTasks = async (params: GetTasksParams) => {
    tasks.value = await tasksService.getTasks(params);
  };

  return { tasks, fetchTasks };
});
