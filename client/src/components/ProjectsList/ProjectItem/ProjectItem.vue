<template>
  <div>
    <Card
      clickable
      :loading="loading"
      :active="active"
      @click="$emit('click')"
      @edit="showEditModal = true"
    >
      <template v-if="project">
        <h3 class="project-title">{{ project.name }}</h3>
        <p class="project-description" :title="project.description">{{ project.description }}</p>
        <small class="project-date" :title="formattedDate">Created at: {{ formattedDate }}</small>
      </template>
      <template #actions>
        <IconButton icon-class="mdi mdi-pencil" size="24px" @click="showEditModal = true" />
        <IconButton icon-class="mdi mdi-delete" size="24px" @click="showDeleteModal = true" />
      </template>
    </Card>
    <FormModal v-if="project" v-model="showEditModal" title="Edit project">
      <ProjectForm
        :project="project"
        :loading="loadingEdit"
        @cancel="showEditModal = false"
        @confirm="handleEditConfirm"
      />
    </FormModal>
    <ConfirmModal
      v-if="project"
      v-model="showDeleteModal"
      title="Delete project?"
      :loading="loadingDelete"
      @cancel="showDeleteModal = false"
      @confirm="handleDeleteConfirm"
    >
      Are you sure you want to delete this project?
    </ConfirmModal>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, ref, toRefs } from 'vue';
import { format } from 'date-fns';
import Card from '@/ui/Card/Card.vue';
import type { Project } from '@/models/project.model';
import FormModal from '@/modals/CardModal.vue';
import IconButton from '@/ui/IconButton/IconButton.vue';
import ProjectForm from '@/components/ProjectForm/ProjectForm.vue';
import { useProjectsStore } from '@/stores/projects.store';
import ConfirmModal from '@/modals/ConfirmModal.vue';
import { useRoute, useRouter } from 'vue-router';
import { RouteNames } from '@/router/router';

const props = defineProps({
  project: {
    type: Object as PropType<Project | null>,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const { project } = toRefs(props);

const { updateProject, deleteProject } = useProjectsStore();
const route = useRoute();
const router = useRouter();

const showEditModal = ref(false);
const loadingEdit = ref(false);

const showDeleteModal = ref(false);
const loadingDelete = ref(false);

const formattedDate = computed(() => {
  return (project.value && format(new Date(project.value.createdAt), 'dd/MM/yyyy')) || '';
});

const handleEditConfirm = async (newProject: Project) => {
  try {
    loadingEdit.value = true;
    await updateProject(newProject);
    showEditModal.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    loadingEdit.value = false;
  }
};

const handleDeleteConfirm = async () => {
  try {
    loadingDelete.value = true;
    project.value && (await deleteProject(project.value._id));
    showDeleteModal.value = false;
    if (route.params.projectId === project.value?._id) {
      await router.push({ name: RouteNames.home });
    }
  } catch (e) {
    console.log(e);
  } finally {
    loadingDelete.value = false;
  }
};
</script>

<style scoped lang="scss">
.project-title {
  margin-bottom: 8px;
  font-size: 20px;
  color: #333;
}

.project-description {
  margin-bottom: 8px;
  color: #666;
}

.project-date {
  font-size: 14px;
  color: #999;
}

.project-title,
.project-description,
.project-date {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
</style>
