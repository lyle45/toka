<template>
  <nav class="sidebar">
    <h2 class="project-list-title">Projects:</h2>

    <div class="content-container">
      <ProjectsList :projects="projects" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects.store';
import { storeToRefs } from 'pinia';
import ProjectsList from '@/components/ProjectsList/ProjectsList.vue';

const { projects } = storeToRefs(useProjectsStore());
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  background-color: $background-color;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 99;
  overflow: auto;
}

.project-list-title {
  font-size: 24px;
  color: #333;
  position: sticky;
  top: 0;
  background-color: $background-color;
  z-index: 1;
  padding: 16px;
  width: 100%;
}

.content-container {
  padding: 16px;
}
</style>
