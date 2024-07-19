<template>
  <div class="project-list">
    <template v-if="!loading">
      <ProjectItem
        v-for="project in projects"
        :key="project._id"
        :project="project"
        :active="currentProjectId === project._id"
        class="item"
        @click="handleClick(project._id)"
      />
    </template>
    <template v-else>
      <ProjectItem v-for="i in getRandomNumber()" :key="i" loading class="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import ProjectItem from './ProjectItem/ProjectItem.vue';
import { computed, onMounted, ref } from 'vue';
import { useProjectsStore } from '@/stores/projects.store';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { RouteNames } from '@/router/router';

const router = useRouter();
const route = useRoute();
const { fetchProjects } = useProjectsStore();
const { projects } = storeToRefs(useProjectsStore());

const loading = ref(false);

onMounted(async () => {
  try {
    loading.value = true;
    await fetchProjects();
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
});

const handleClick = (projectId: string) => {
  router.push({ name: RouteNames.project, params: { projectId } });
};

const currentProjectId = computed(() => route.params.projectId);

const getRandomNumber = () => Math.floor(Math.random() * 4);
</script>

<style lang="scss" scoped>
.project-list {
  background-color: #f5f5f5;
}

.item {
  margin-bottom: 16px;
}
</style>
