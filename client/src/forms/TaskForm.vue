<template>
  <GenericForm
    :fields="taskFields"
    :loading="loading"
    @cancel="$emit('cancel')"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { toRefs, type PropType } from 'vue';
import GenericForm from '@/forms/GenericForm.vue';
import { type Field, FieldTypes } from '@/hooks/forms';
import { type NewTask, type Task, TaskStates } from '@/models/task.model';

const props = defineProps({
  task: {
    type: Object as PropType<Partial<Task>>,
    default: () => ({ title: '', description: '', dueDate: '' }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['cancel', 'confirm']);
const { task } = toRefs(props);

const taskStateOptions = [
  { value: TaskStates.CREATED, label: 'Created' },
  { value: TaskStates.IN_PROGRESS, label: 'In Progress' },
  { value: TaskStates.COMPLETED, label: 'Completed' },
];

const taskFields: Field[] = [
  {
    name: 'title',
    value: task.value?.title || '',
    errorMsg: 'Title must be provided',
    label: 'Title',
    type: FieldTypes.input,
  },
  {
    name: 'description',
    value: task.value?.description || '',
    errorMsg: 'Description must be provided',
    label: 'Description',
    type: FieldTypes.textarea,
    rows: 4,
  },
  {
    name: 'state',
    value: task.value?.state || TaskStates.CREATED,
    errorMsg: 'State must be selected',
    label: 'Task State',
    type: FieldTypes.dropdown,
    dropdownItems: taskStateOptions,
  },
  {
    name: 'dueDate',
    value: task.value?.dueDate || new Date().toISOString(),
    errorMsg: 'Due date must be provided',
    label: 'Due Date',
    type: FieldTypes.date,
  },
];

const handleConfirm = (values: NewTask) => {
  emit('confirm', { ...task.value, ...values });
};
</script>
