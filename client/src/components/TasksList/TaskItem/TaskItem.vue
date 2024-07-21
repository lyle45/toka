<template>
  <Card clickable class="task-card" :loading="loading">
    <template v-if="task">
      <h3 class="task-title">{{ task.title }}</h3>
      <p v-if="task.description" class="task-description">{{ task.description }}</p>
      <small class="task-date" :title="formattedDate">Due date: {{ formattedDate }}</small>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import Card from '@/ui/Card/Card.vue';
import type { PropType } from 'vue';
import type { Task } from '@/models/task.model';
import { format } from 'date-fns';

const props = defineProps({
  task: {
    type: Object as PropType<Task | null>,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const { task } = toRefs(props);

const formattedDate = computed(() => {
  return (task.value && format(new Date(task.value.dueDate), 'dd/MM/yyyy')) || '';
});
</script>

<style scoped lang="scss">
.task-card {
  margin-bottom: 16px;
}

.task-title {
  margin-bottom: 8px;
  font-size: 20px;
  color: #333;
}

.task-description {
  margin-bottom: 8px;
  color: #666;
}

.task-date {
  font-size: 14px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
</style>
