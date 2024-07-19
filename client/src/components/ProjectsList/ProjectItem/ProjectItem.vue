<template>
  <Card :loading="loading" :active="active" @click="$emit('click')">
    <template v-if="project">
      <h3 class="project-title">{{ project.name }}</h3>
      <p class="project-description" :title="project.description">{{ project.description }}</p>
      <small class="project-date" :title="formattedDate">Created at: {{ formattedDate }}</small>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed, type PropType, toRefs } from 'vue';
import { format } from 'date-fns';
import Card from '@/ui/Card/Card.vue';
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
  active: {
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
.project-title {
  margin-bottom: 8px;
  font-size: 20px;
  color: #333;
}

.project-description {
  margin-bottom: 8px;
  color: #666;
}

.project-date {
  font-size: 14px;
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
