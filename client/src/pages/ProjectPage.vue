<template>
  <TasksBoard :tasks="tasks" />
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';
import TasksBoard from '@/components/TasksBoard/TasksBoard.vue';

const { fetchTasks } = useTasksStore();
const { tasks } = storeToRefs(useTasksStore());

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const { projectId } = toRefs(props);

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

<style scoped lang="scss"></style>
