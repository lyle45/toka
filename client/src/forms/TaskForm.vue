<template>
  <GenericForm
    :fields="taskFields"
    :loading="loading"
    @cancel="$emit('cancel')"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { toRefs, defineEmits, defineProps, computed, type PropType } from 'vue';
import GenericForm from '@/forms/GenericForm.vue';
import { FieldTypes } from '@/hooks/forms';
import type { NewTask, Task } from '@/models/task.model';

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    default: () => ({ title: '', description: '', dueDate: '' }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['cancel', 'confirm']);
const { task } = toRefs(props);

const taskFields = computed(() => [
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
    name: 'dueDate',
    value: task.value?.dueDate || '',
    errorMsg: 'Due date must be provided',
    label: 'Due Date',
    type: FieldTypes.date,
  },
]);

const handleConfirm = (values: NewTask) => {
  emit('confirm', { ...task.value, ...values });
};
</script>
