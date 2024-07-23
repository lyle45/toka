<template>
  <div class="project-list">
    <template v-if="!loadingProjects">
      <div v-if="filteredProjects.length">
        <div v-for="project in filteredProjects" :key="project._id" :ref="itemRefFunction(project)">
          <ProjectItem
            :project="project"
            :active="currentProjectId === project._id"
            class="item"
            @click="handleClick(project._id)"
          />
        </div>
      </div>
      <div v-else class="no-projects">No projects available</div>
    </template>
    <template v-else>
      <ProjectItem v-for="i in getRandomNumber()" :key="i" loading class="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import ProjectItem from './ProjectItem/ProjectItem.vue';
import { type ComponentPublicInstance, computed, ref, watch } from 'vue';
import { useProjectsStore } from '@/stores/projects.store';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { RouteNames } from '@/router/router';
import type { Project } from '@/models/project.model';
import scrollIntoView from 'scroll-into-view-if-needed';

const router = useRouter();
const route = useRoute();
const { filteredProjects, loadingProjects } = storeToRefs(useProjectsStore());

const projectElements = ref<Record<string, HTMLDivElement | null>>({});

const itemRefFunction =
  (project: Project) => (element: Element | ComponentPublicInstance | null) => {
    if (element instanceof HTMLDivElement) {
      projectElements.value[project._id] = element;
    }
  };

const scrollToItem = (projectId: string) => {
  const element = projectElements.value[projectId];
  if (element) {
    scrollIntoView(element, {
      behavior: 'smooth',
      block: 'center',
      scrollMode: 'if-needed',
    });
  }
};

watch(
  () => [route.params.projectId as string, filteredProjects.value] as const,
  async ([newProjectId]) => {
    // Have to wait for items to mount after fetching
    setTimeout(() => {
      scrollToItem(newProjectId);
    });
  },
  { immediate: true }
);

const handleClick = (projectId: string) => {
  router.push({ name: RouteNames.project, params: { projectId } });
};

const currentProjectId = computed(() => route.params.projectId);

const getRandomNumber = () => Math.floor(Math.random() * 3) + 1;
</script>

<style lang="scss" scoped>
.project-list {
  background-color: #f5f5f5;
}

.item {
  margin-bottom: 16px;
}

.no-projects {
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: #999;
}
</style>
