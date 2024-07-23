<template>
  <header class="header">
    <IconButton
      v-if="$matches.sm.max"
      class="menu-button"
      icon-class="mdi mdi-menu"
      size="32px"
      color="white"
      @click="$emit('toggle-sidebar')"
    />
    <h1
      class="header-title"
      :class="{ small: $matches.sm.max }"
      @click="$router.push({ name: RouteNames.home })"
    >
      Project Manager
    </h1>
    <div
      v-if="$route.name !== RouteNames.home"
      class="task-filter-container"
      :class="{ small: $matches.sm.max }"
    >
      <OutlinedInput v-model="filterText" placeholder="Filter tasks" class="task-filter-input" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router/router';
import IconButton from '@/ui/IconButton/IconButton.vue';
import OutlinedInput from '@/ui/OutlinedInput/OutlinedInput.vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/tasks.store';

defineEmits(['toggle-sidebar']);

const { filterText } = storeToRefs(useTasksStore());
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-content: center;
  align-items: center;
  background-color: $primary-color;
  color: white;
  padding: 16px;
  height: 64px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  z-index: 99;
}

.header-title {
  cursor: pointer;
  flex: 1;

  &.small {
    font-size: 20px;
  }
}

.menu-button {
  margin-right: 8px;
}

.task-filter-container {
  width: 200px;

  &.small {
    width: 150px;
  }
}
</style>
