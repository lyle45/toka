<template>
  <div class="tasks-board">
    <!-- a bit of div soup here since bootstrap grid doesn't account for margin on the same element -->
    <div class="col-4">
      <TasksColumn
        class="margin-right"
        :tasks="createdTasks"
        :project-id="projectId"
        :task-state="TaskStates.CREATED"
        title="Created Tasks"
      />
    </div>
    <div class="col-4">
      <TasksColumn
        class="margin-right"
        :tasks="inProgressTasks"
        :project-id="projectId"
        :task-state="TaskStates.IN_PROGRESS"
        title="In Progress Tasks"
      />
    </div>
    <div class="col-4">
      <TasksColumn
        :tasks="completedTasks"
        :project-id="projectId"
        :task-state="TaskStates.COMPLETED"
        title="Completed Tasks"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, toRefs } from 'vue';
import type { Task } from '@/models/task.model';
import { TaskStates } from '@/models/task.model';
import TasksColumn from '@/components/TasksBoard/TasksColumn/TasksColumn.vue';

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
});

const { tasks } = toRefs(props);

const createdTasks = computed(() =>
  tasks.value.filter((task) => task.state === TaskStates.CREATED)
);
const inProgressTasks = computed(() =>
  tasks.value.filter((task) => task.state === TaskStates.IN_PROGRESS)
);
const completedTasks = computed(() =>
  tasks.value.filter((task) => task.state === TaskStates.COMPLETED)
);
</script>

<style scoped lang="scss">
.tasks-board {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.margin-right {
  margin-right: 16px;
}
</style>
