<template>
  <div class="task-column">
    <h2 class="column-title">{{ title }}</h2>
    <div class="main-content">
      <TasksList :tasks="tasks" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Task } from '@/models/task.model';
import TasksList from '@/components/TasksList/TasksList.vue';

defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.task-column {
  background-color: $background-color;
  border-radius: 8px;
  height: 100%;
  overflow: auto;
}

.column-title {
  font-size: 24px;
  color: #333;
  position: sticky;
  top: 0;
  background-color: $background-color;
  z-index: 1;
  padding: 16px;
  width: 100%;
}

.main-content {
  padding: 16px;
}
</style>
