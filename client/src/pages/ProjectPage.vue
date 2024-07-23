<template>
  <div class="page-container">
    <div v-if="!loadingProjects" class="project-details">
      <h1 class="project-title">{{ currentProject?.name }}</h1>
      <p class="project-description">{{ currentProject?.description }}</p>
    </div>
    <div v-else class="project-details-skeleton">
      <Skeletor width="40%" height="32px" pill class="skeleton-title" />
      <Skeletor width="80%" height="16px" pill class="skeleton-description" />
      <Skeletor width="75%" height="16px" pill class="skeleton-description" />
      <Skeletor width="90%" height="16px" pill class="skeleton-description" />
    </div>
    <TasksBoard :tasks="tasks" :project-id="projectId" />
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, watch } from 'vue';
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';
import TasksBoard from '@/components/TasksBoard/TasksBoard.vue';
import { useProjectsStore } from '@/stores/projects.store';
import { Skeletor } from 'vue-skeletor';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { RouteNames } from '@/router/router';

const router = useRouter();
const { fetchTasks } = useTasksStore();
const { projects, loadingProjects } = storeToRefs(useProjectsStore());
const { tasks } = storeToRefs(useTasksStore());
const toast = useToast();

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
      toast.error("Something happened, couldn't get tasks");
      await router.push({ name: RouteNames.home });
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
  position: relative;
}

.project-details {
  min-height: 115px;
  max-height: 180px;
  overflow: auto;
  padding: 16px 16px 0 16px;
  margin-bottom: 16px;
  word-break: break-word;
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

.project-details-skeleton {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

.skeleton-title {
  align-self: center;
  margin-bottom: 12px;
}

.skeleton-description {
  margin-bottom: 8px;
}
</style>
