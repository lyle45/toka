<template>
  <GenericForm
    :fields="projectFields"
    :loading="loading"
    @cancel="$emit('cancel')"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { toRefs, type PropType } from 'vue';
import GenericForm from '@/forms/GenericForm/GenericForm.vue';
import { type Field, FieldTypes } from '@/hooks/forms';
import type { NewProject, Project } from '@/models/project.model';

const props = defineProps({
  project: {
    type: Object as PropType<Partial<Project>>,
    default: () => ({ name: '', description: '' }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['cancel', 'confirm']);
const { project } = toRefs(props);

const projectFields: Field[] = [
  {
    name: 'name',
    value: project.value?.name || '',
    errorMsg: 'Name must be provided',
    label: 'Name',
    type: FieldTypes.input,
    placeholder: 'Write a name',
  },
  {
    name: 'description',
    value: project.value?.description || '',
    errorMsg: 'Description must be provided',
    label: 'Description',
    type: FieldTypes.textarea,
    rows: 4,
    placeholder: 'Write a description',
  },
];

const handleConfirm = (values: NewProject) => {
  emit('confirm', { ...project.value, ...values });
};
</script>
