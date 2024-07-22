<template>
  <div class="page-container">
    <div class="project-details">
      <h1 class="project-title">{{ currentProject?.name }}</h1>
      <p class="project-description">{{ currentProject?.description }}</p>
    </div>
    <TasksBoard :tasks="tasks" />
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, watch } from 'vue';
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';
import TasksBoard from '@/components/TasksBoard/TasksBoard.vue';
import { useProjectsStore } from '@/stores/projects.store';

const { fetchTasks } = useTasksStore();
const { projects } = storeToRefs(useProjectsStore());
const { tasks } = storeToRefs(useTasksStore());

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const { projectId } = toRefs(props);

const currentProject = computed(() =>
  projects.value.find((project) => project._id === projectId.value)
);

watch(
  projectId,
  async () => {
    try {
      await fetchTasks({ projectId: projectId.value });
    } catch (e) {
      console.log(e);
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.project-details {
  padding: 16px 16px 0 16px;
  margin-bottom: 16px;
}

.project-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
}

.project-description {
  font-size: 16px;
  color: #666;
}
</style>
