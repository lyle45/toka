<template>
  <GenericForm
    :fields="projectFields"
    :loading="loading"
    @cancel="$emit('cancel')"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { toRefs, computed, type PropType } from 'vue';
import GenericForm from '@/forms/GenericForm.vue';
import { FieldTypes } from '@/hooks/forms';
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

const projectFields = computed(() => [
  {
    name: 'name',
    value: project.value?.name || '',
    errorMsg: 'Name must be provided',
    label: 'Name',
    type: FieldTypes.input,
  },
  {
    name: 'description',
    value: project.value?.description || '',
    errorMsg: 'Description must be provided',
    label: 'Description',
    type: FieldTypes.textarea,
    rows: 4,
  },
]);

const handleConfirm = (values: NewProject) => {
  emit('confirm', { ...project.value, ...values });
};
</script>
