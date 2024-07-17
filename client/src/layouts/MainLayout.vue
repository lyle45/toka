<template>
  <div class="layout">
    <AppHeader />
    <div class="container">
      <AppSidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar/AppSidebar.vue'
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.container {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 16px;
  background-color: $main-background-color;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
