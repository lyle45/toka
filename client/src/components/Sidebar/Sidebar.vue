<template>
  <nav class="sidebar">
    <div class="title-container">
      <div class="title">
        <div class="project-list-title">Projects:</div>
        <IconButton class="add-button" icon-class="mdi mdi-plus" @click="showCreateModal = true" />
      </div>
      <div class="project-filter-container">
        <OutlinedInput v-model="filterText" :margin="false" placeholder="Filter Projects" />
      </div>
    </div>

    <div class="content-container">
      <ProjectsList :projects="filteredProjects" />
    </div>

    <FormModal v-model="showCreateModal" title="Create project">
      <ProjectForm
        :loading="loadingCreate"
        @cancel="showCreateModal = false"
        @confirm="handleCreateConfirm"
      />
    </FormModal>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ProjectsList from '@/components/ProjectsList/ProjectsList.vue';
import IconButton from '@/ui/IconButton/IconButton.vue';
import ProjectForm from '@/forms/ProjectForm/ProjectForm.vue';
import FormModal from '@/modals/CardModal.vue';
import type { NewProject } from '@/models/project.model';
import { useProjectsStore } from '@/stores/projects.store';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { RouteNames } from '@/router/router';
import OutlinedInput from '@/ui/OutlinedInput/OutlinedInput.vue';
import { storeToRefs } from 'pinia';

const { createProject } = useProjectsStore();
const { projects } = storeToRefs(useProjectsStore());
const router = useRouter();
const toast = useToast();

const showCreateModal = ref(false);
const loadingCreate = ref(false);

const filterText = ref('');

const filteredProjects = computed(() =>
  !filterText.value
    ? projects.value
    : projects.value.filter((project) => project.name.includes(filterText.value))
);

const handleCreateConfirm = async (newProject: NewProject) => {
  try {
    loadingCreate.value = true;
    const project = await createProject(newProject);
    showCreateModal.value = false;
    await router.push({ name: RouteNames.project, params: { projectId: project._id } });
  } catch (e) {
    toast.error("Something happened, couldn't create project");
    console.log(e);
  } finally {
    loadingCreate.value = false;
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  background-color: $background-color;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 99;
  overflow: auto;
}

.title-container {
  display: flex;
  flex-direction: column;
  padding: 16px;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  gap: 16px;
  background-color: $background-color;
}

.title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-list-title {
  font-size: 24px;
  color: #333;
}

.content-container {
  padding: 16px;
}
</style>
