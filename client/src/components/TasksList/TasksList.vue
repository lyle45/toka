<template>
  <TaskItem v-for="task in tasks" :key="task._id" :task="task" />
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Task } from '@/models/task.model';
import TaskItem from '@/components/TasksList/TaskItem/TaskItem.vue';

defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
});
</script>
