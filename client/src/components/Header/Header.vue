<template>
  <header class="header">
    <h1 class="header-title" @click="$router.push({ name: RouteNames.home })">
      Toka Project Manager
    </h1>
  </header>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router/router.js';
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: row;
  background-color: $primary-color;
  color: white;
  padding: 16px;
  text-align: center;
  height: 64px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  z-index: 99;
}

.header-title {
  cursor: pointer;
}
</style>
