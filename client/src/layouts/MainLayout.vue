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

<script lang="ts">
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar/AppSidebar.vue';
import { defineComponent } from 'vue';
import { useProjectsStore } from '@/stores/projects.store';

// Not using script setup here because we need to use the `beforeRouteEnter` navigation guard
// data loaders are in rfc https://github.com/vuejs/rfcs/discussions/460
export default defineComponent({
  components: {
    AppHeader,
    AppSidebar,
  },
  async beforeRouteEnter() {},
});
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
