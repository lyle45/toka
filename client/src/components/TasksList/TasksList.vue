<template>
  <template v-if="!loadingTasks">
    <TaskItem v-for="task in tasks" :key="task._id" :task="task" />
  </template>
  <template v-else>
    <TaskItem v-for="i in getRandomNumber()" :key="i" loading />
  </template>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Task } from '@/models/task.model';
import TaskItem from '@/components/TasksList/TaskItem/TaskItem.vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/tasks.store';

const { loadingTasks } = storeToRefs(useTasksStore());

defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
});

const getRandomNumber = () => Math.floor(Math.random() * 3) + 1;
</script>
