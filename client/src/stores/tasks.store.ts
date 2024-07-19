import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/models/task.model';
import { type GetTasksParams, tasksService } from '@/services/tasks.service';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const loadingTasks = ref(false);

  const fetchTasks = async (params: GetTasksParams) => {
    try {
      loadingTasks.value = true;
      tasks.value = await tasksService.getTasks(params);
    } finally {
      loadingTasks.value = false;
    }
  };

  return { tasks, fetchTasks, loadingTasks };
});
