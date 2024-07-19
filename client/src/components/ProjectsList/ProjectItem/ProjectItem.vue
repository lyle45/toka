<template>
  <div class="project-item">
    <template v-if="loading">
      <Skeletor width="60%" height="24px" pill class="project-title" />
      <Skeletor width="80%" height="18px" pill class="project-description" />
      <Skeletor width="40%" height="18px" pill class="project-date" />
    </template>
    <template v-else-if="project">
      <h3 class="project-title">{{ project.name }}</h3>
      <p class="project-description" :title="project.description">{{ project.description }}</p>
      <small class="project-date" :title="formattedDate">Created at: {{ formattedDate }}</small>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, toRefs } from 'vue';
import { format } from 'date-fns';
import { Skeletor } from 'vue-skeletor';
import type { Project } from '@/models/project.model';

const props = defineProps({
  project: {
    type: Object as PropType<Project | null>,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const { project } = toRefs(props);

const formattedDate = computed(() => {
  return (project.value && format(new Date(project.value.createdAt), 'dd/MM/yyyy')) || '';
});
</script>

<style scoped lang="scss">
.project-item {
  padding: 16px;
  background-color: #fff;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.project-title {
  margin: 0 0 8px;
  font-size: 20px;
  color: #333;
}

.project-description {
  margin: 0 0 8px;
  color: #666;
}

.project-date {
  font-size: 0.875rem;
  color: #999;
}

.project-title,
.project-description,
.project-date {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
</style>
