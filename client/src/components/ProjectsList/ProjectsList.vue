<template>
  <div class="project-list">
    <ProjectItem v-for="project in projects" :key="project._id" :project="project" class="item" />
  </div>
</template>

<script setup lang="ts">
import ProjectItem from './ProjectItem/ProjectItem.vue';
import { type PropType, toRefs } from 'vue';
import type { Project } from '@/models/project.model';

const props = defineProps({
  projects: {
    type: Object as PropType<Project[]>,
    required: true,
  },
});

const { projects } = toRefs(props);
</script>

<style lang="scss" scoped>
.project-list {
  background-color: #f5f5f5;
}

.item {
  margin-bottom: 16px;
}
</style>
