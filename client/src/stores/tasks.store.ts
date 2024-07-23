import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import type { NewTask, Task } from '@/models/task.model';
import { type GetTasksParams, tasksService } from '@/services/tasks.service';
import { useProjectsStore } from '@/stores/projects.store';

export const useTasksStore = defineStore('tasks', () => {
  const { currentProjectId } = storeToRefs(useProjectsStore());

  const tasks = ref<Task[]>([]);
  const loadingTasks = ref(false);
  const filterText = ref('');

  const filteredTasks = computed(() =>
    !filterText.value
      ? tasks.value
      : tasks.value.filter((task) => task.title.includes(filterText.value))
  );

  const fetchTasks = async (params: GetTasksParams) => {
    try {
      loadingTasks.value = true;
      tasks.value = await tasksService.getTasks(params);
    } finally {
      loadingTasks.value = false;
    }
  };

  const addTaskToStore = (task: Task) => {
    if (task.projectId === currentProjectId.value) {
      tasks.value.push(task);
    }
  };

  const createTask = async (newTask: NewTask) => {
    const task = await tasksService.createTask(newTask);
    addTaskToStore(task);
  };

  const updateTaskInStore = (task: Task) => {
    if (task.projectId === currentProjectId.value) {
      const index = tasks.value.findIndex((p) => p._id === task._id);
      tasks.value[index] = task;
    }
  };

  const updateTask = async (task: Task) => {
    const updatedTask = await tasksService.updateTask(task);
    updateTaskInStore(updatedTask);
  };

  const deleteTaskFromStore = (taskId: string) => {
    if (taskId === currentProjectId.value) {
      const index = tasks.value.findIndex((task) => task._id === taskId);
      index > -1 && tasks.value.splice(index, 1);
    }
  };

  const deleteTask = async (taskId: string) => {
    await tasksService.deleteTask(taskId);
    deleteTaskFromStore(taskId);
  };

  return {
    tasks,
    loadingTasks,
    filteredTasks,
    filterText,
    fetchTasks,
    addTaskToStore,
    createTask,
    updateTaskInStore,
    updateTask,
    deleteTaskFromStore,
    deleteTask,
  };
});
