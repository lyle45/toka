<template>
  <div class="project-form">
    <OutlinedInput
      v-model="formFields.name.value"
      label="Name"
      :error-message="formFields.name.error"
    />
    <OutlinedInput
      v-model="formFields.description.value"
      label="Description"
      textarea
      :rows="4"
      :error-message="formFields.description.error"
    />
    <div class="form-buttons">
      <ContainedButton @click="$emit('cancel')">Cancel</ContainedButton>
      <ContainedButton
        @click="handleConfirm"
        :loading="loading"
        :disabled="formInvalid || formPristine"
      >
        Confirm
      </ContainedButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, defineEmits, defineProps, type PropType } from 'vue';
import { useForm, type Field } from '@/hooks/forms';
import OutlinedInput from '@/ui/OutlinedInput/OutlinedInput.vue';
import ContainedButton from '@/ui/ContainedButton/ContainedButton.vue';
import type { Project } from '@/models/project.model';

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    default: () => ({ name: '', description: '' }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['cancel', 'confirm']);
const { project } = toRefs(props);

const fields: Field[] = [
  { name: 'name', value: project.value?.name || '', errorMsg: 'Name must be provided' },
  {
    name: 'description',
    value: project.value?.description || '',
    errorMsg: 'Description must be provided',
  },
];

const { formFields, formPristine, formInvalid, getFieldValues } = useForm(fields);

const handleConfirm = () => {
  emit('confirm', { ...project.value, ...getFieldValues() });
};
</script>

<style scoped lang="scss">
.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
