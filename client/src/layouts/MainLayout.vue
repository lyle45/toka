<template>
  <div class="layout">
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <div class="main-container">
      <SidebarModal v-if="$matches.sm.max" v-model="isSidebarModalOpen" />
      <Sidebar v-else class="col-3" />
      <main class="main-content col-sm-9 col-12">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import AppHeader from '@/components/Header/Header.vue';
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { webSocketService } from '@/services/web-socket.service';
import { useProjectsStore } from '@/stores/projects.store';
import type { RouteLocation } from 'vue-router';
import { useLoading } from 'vue3-loading-overlay';
import styles from '@/assets/_exports.module.scss';
import { useToast } from 'vue-toastification';
import { useMatches } from 'vue-responsiveness';
import SidebarModal from '@/modals/SidebarModal.vue';

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
    SidebarModal,
    AppHeader,
    Sidebar,
  },
  async beforeRouteEnter(to) {
    const loading = useLoading();
    const toast = useToast();
    setCurrentProject(to);
    try {
      loading.show({
        loader: 'dots',
        color: styles.primaryColor,
      });
      await webSocketService.connect();
    } catch (e) {
      toast.error("Something happened, can't connect to Live Updates");
      console.log(e);
    } finally {
      loading.hide();
    }
  },
  beforeRouteUpdate: setCurrentProject,
  setup() {
    const { fetchProjects } = useProjectsStore();
    const toast = useToast();
    const isSidebarModalOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarModalOpen.value = !isSidebarModalOpen.value;
    };

    const matches = useMatches();

    watch(
      () => matches.sm.min,
      (isMdAndUp) => {
        if (isMdAndUp) {
          isSidebarModalOpen.value = false;
        }
      },
      { immediate: true }
    );

    onMounted(async () => {
      try {
        await fetchProjects();
      } catch (e) {
        toast.error("Something happened, couldn't get projects");
        console.log(e);
      }
    });

    return {
      isSidebarModalOpen,
      toggleSidebar,
    };
  },
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
