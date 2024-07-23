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
      Toka Project Manager
    </h1>
  </header>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router/router.js';
import IconButton from '@/ui/IconButton/IconButton.vue';

defineEmits(['toggle-sidebar']);
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
    font-size: 24px;
  }
}

.menu-button {
  margin-right: 16px;
}
</style>
