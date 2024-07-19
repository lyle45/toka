<template>
  <div class="layout">
    <AppHeader />
    <div class="main-container">
      <AppSidebar class="col-3" />
      <main class="main-content col-9">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/Header/Header.vue';
import AppSidebar from '@/components/Sidebar/Sidebar.vue';
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.main-container {
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 16px;
  background-color: $main-background-color;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
