<template>
  <div class="project-list">
    <template v-if="loading">
      <ProjectItem loading class="item" />
      <ProjectItem loading class="item" />
      <ProjectItem loading class="item" />
    </template>
    <template v-else>
      <ProjectItem v-for="project in projects" :key="project._id" :project="project" class="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import ProjectItem from './ProjectItem/ProjectItem.vue';
import { onMounted, ref } from 'vue';
import { useProjectsStore } from '@/stores/projects.store';
import { storeToRefs } from 'pinia';

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
</script>

<style lang="scss" scoped>
.project-list {
  background-color: #f5f5f5;
}

.item {
  margin-bottom: 16px;
}
</style>
