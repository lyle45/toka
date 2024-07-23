<template>
  <div class="generic-form">
    <template v-for="field in fields" :key="field.name">
      <OutlinedInput
        v-if="field.type === FieldTypes.input || field.type === FieldTypes.textarea"
        v-model="formFields[field.name].value"
        :label="field.label"
        :error-message="formFields[field.name].error"
        :type="field.type"
        :rows="field.rows || 4"
        :textarea="field.type === FieldTypes.textarea"
        :placeholder="field.placeholder"
      />
      <DatePicker
        v-if="field.type === FieldTypes.date"
        v-model="formFields[field.name].value"
        :label="field.label"
        :error-message="formFields[field.name].error"
        :placeholder="field.placeholder"
      />
      <Dropdown
        v-if="field.type === FieldTypes.dropdown"
        v-model="formFields[field.name].value"
        :label="field.label"
        :items="field.dropdownItems!"
        :error-message="formFields[field.name].error"
      />
    </template>
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
import { type PropType, toRefs } from 'vue';
import { useForm, type Field, FieldTypes } from '@/hooks/forms';
import OutlinedInput from '@/ui/OutlinedInput/OutlinedInput.vue';
import ContainedButton from '@/ui/ContainedButton/ContainedButton.vue';
import DatePicker from '@/ui/DatePicker/DatePicker.vue';
import Dropdown from '@/ui/Dropdown/Dropdown.vue';

const props = defineProps({
  fields: {
    type: Array as PropType<Field[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['cancel', 'confirm']);

const { fields } = toRefs(props);

const { formFields, formPristine, formInvalid, getFieldValues } = useForm(fields.value);

const handleConfirm = () => {
  emit('confirm', getFieldValues());
};
</script>

<style scoped lang="scss">
.generic-form .form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
