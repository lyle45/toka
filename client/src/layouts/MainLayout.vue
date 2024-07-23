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
import AppHeader from '@/components/Header/Header.vue';
import AppSidebar from '@/components/Sidebar/Sidebar.vue';
import { defineComponent } from 'vue';
import { webSocketService } from '@/services/web-socket.service';
import { useProjectsStore } from '@/stores/projects.store';
import type { RouteLocation } from 'vue-router';
import { useLoading } from 'vue3-loading-overlay';
import styles from '@/assets/_exports.module.scss';

function setCurrentProject(to: RouteLocation) {
  const { setCurrentProjectId } = useProjectsStore();

  const projectId = to.params.projectId as string;

  if (projectId) {
    setCurrentProjectId(projectId);
  }
}
// Not using script setup because we need to use beforeRouteEnter
export default defineComponent({
  components: {
    AppHeader,
    AppSidebar,
  },
  async beforeRouteEnter(to) {
    const loading = useLoading();
    setCurrentProject(to);
    try {
      loading.show({
        loader: 'dots',
        color: styles.primaryColor,
      });
      await webSocketService.connect();
    } catch (e) {
      console.log(e);
    } finally {
      loading.hide();
    }
  },
  beforeRouteUpdate: setCurrentProject,
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
