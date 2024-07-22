<template>
  <div>
    <Card clickable class="task-card" :loading="loading">
      <template v-if="task">
        <h3 class="task-title">{{ task.title }}</h3>
        <p v-if="task.description" class="task-description">{{ task.description }}</p>
        <small class="task-date" :title="formattedDate">Due date: {{ formattedDate }}</small>
      </template>
      <template #actions>
        <IconButton icon-class="mdi mdi-pencil" size="24px" @click="showEditModal = true" />
        <IconButton icon-class="mdi mdi-delete" size="24px" @click="showDeleteModal = true" />
      </template>
    </Card>
    <CardModal v-if="task" v-model="showEditModal" title="Edit Task">
      <TaskForm
        :task="task"
        :loading="loadingEdit"
        @cancel="showEditModal = false"
        @confirm="handleEditConfirm"
      />
    </CardModal>
    <ConfirmModal
      v-if="task"
      v-model="showDeleteModal"
      title="Delete task?"
      :loading="loadingDelete"
      @cancel="showDeleteModal = false"
      @confirm="handleDeleteConfirm"
    >
      Are you sure you want to delete this task?
    </ConfirmModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import Card from '@/ui/Card/Card.vue';
import type { PropType } from 'vue';
import type { Task } from '@/models/task.model';
import { format } from 'date-fns';
import IconButton from '@/ui/IconButton/IconButton.vue';
import CardModal from '@/modals/CardModal.vue';
import TaskForm from '@/forms/TaskForm.vue';
import { useTasksStore } from '@/stores/tasks.store';
import ConfirmModal from '@/modals/ConfirmModal.vue';

const props = defineProps({
  task: {
    type: Object as PropType<Task | null>,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const { task } = toRefs(props);

const { updateTask, deleteTask } = useTasksStore();

const showEditModal = ref(false);
const loadingEdit = ref(false);

const showDeleteModal = ref(false);
const loadingDelete = ref(false);

const formattedDate = computed(() => {
  return (task.value && format(new Date(task.value.dueDate), 'dd/MM/yyyy')) || '';
});

const handleEditConfirm = async (newTask: Task) => {
  try {
    loadingEdit.value = true;
    await updateTask(newTask);
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
    task.value && (await deleteTask(task.value._id));
    showDeleteModal.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    loadingDelete.value = false;
  }
};
</script>

<style scoped lang="scss">
.task-card {
  margin-bottom: 16px;
}

.task-title {
  margin-bottom: 8px;
  font-size: 20px;
  color: #333;
}

.task-description {
  margin-bottom: 8px;
  color: #666;
}

.task-date {
  font-size: 14px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
</style>
