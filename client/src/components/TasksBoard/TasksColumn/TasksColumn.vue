<template>
  <div class="task-column">
    <div class="column-details">
      <h2 class="column-title">{{ title }}</h2>
      <IconButton icon-class="mdi mdi-plus" @click="showCreateModal = true" />
    </div>
    <div class="main-content">
      <TasksList :tasks="tasks" :task-state="taskState" />
    </div>
    <FormModal v-model="showCreateModal" title="Create project">
      <TaskForm
        :loading="loadingCreate"
        :task="{ state: taskState }"
        @cancel="showCreateModal = false"
        @confirm="handleCreateConfirm"
      />
    </FormModal>
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref, toRefs } from 'vue';
import { type NewTask, type Task, TaskStates } from '@/models/task.model';
import TasksList from '@/components/TasksList/TasksList.vue';
import IconButton from '@/ui/IconButton/IconButton.vue';
import TaskForm from '@/forms/TaskForm.vue';
import { useTasksStore } from '@/stores/tasks.store';
import FormModal from '@/modals/CardModal.vue';
import { useToast } from 'vue-toastification';

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  taskState: {
    type: String as PropType<TaskStates>,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
});

const { projectId } = toRefs(props);

const { createTask } = useTasksStore();
const toast = useToast();

const showCreateModal = ref(false);
const loadingCreate = ref(false);

const handleCreateConfirm = async (newTask: NewTask) => {
  try {
    loadingCreate.value = true;
    await createTask({ ...newTask, projectId: projectId.value });
    showCreateModal.value = false;
  } catch (e) {
    toast.error("Something happened, couldn't create task");
    console.log(e);
  } finally {
    loadingCreate.value = false;
  }
};
</script>

<style scoped lang="scss">
.task-column {
  display: flex;
  flex-direction: column;
  background-color: $background-color;
  border-radius: 8px;
  height: 100%;
  min-width: 250px;
  overflow: auto;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.column-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  position: sticky;
  top: 0;
  z-index: 1;
  min-width: 250px;
  white-space: nowrap;
  background-color: $background-color;
}

.column-title {
  font-size: 24px;
  color: #333;
  width: 100%;
}

.main-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
}
</style>
