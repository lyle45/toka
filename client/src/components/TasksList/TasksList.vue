<template>
  <div class="tasks-list">
    <template v-if="!loadingTasks">
      <template v-if="tasks.length">
        <TaskItem v-for="task in tasks" :key="task._id" :task="task" />
      </template>
      <div v-else class="no-tasks">No tasks available</div>
    </template>
    <template v-else>
      <TaskItem v-for="i in getRandomNumber()" :key="i" loading />
    </template>
  </div>
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

<style scoped lang="scss">
.tasks-list {
  background-color: #f5f5f5;
}

.no-tasks {
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: #999;
}
</style>
