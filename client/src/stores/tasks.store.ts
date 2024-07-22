import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { NewTask, Task } from '@/models/task.model';
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

  const createTask = async (newTask: NewTask) => {
    const task = await tasksService.createTask(newTask);
    tasks.value.push(task);
  };

  const updateTask = async (task: Task) => {
    const updatedTask = await tasksService.updateTask(task);
    const index = tasks.value.findIndex((t) => t._id === updatedTask._id);
    tasks.value[index] = updatedTask;
  };

  const deleteTask = async (taskId: string) => {
    await tasksService.deleteTask(taskId);
    tasks.value = tasks.value.filter((task) => task._id !== taskId);
  };

  return { tasks, fetchTasks, loadingTasks, updateTask, createTask, deleteTask };
});
