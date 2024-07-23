<template>
  <div class="datepicker-container">
    <label :for="id" class="datepicker-label">{{ label }}</label>
    <VueDatePicker
      :model-value="modelValue"
      :open-date="dateValue"
      :id="id"
      :class="{ 'has-error': errorMessage }"
      :input-class="'datepicker-input'"
      :wrapper-class="'datepicker-wrapper'"
      :calendar-class="'datepicker-calendar'"
      inline
      format="dd/MM/yyyy"
      @selected="handleSelected"
    />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import VueDatePicker from 'vuejs3-datepicker';
import { computed } from 'vue';

const modelValue = defineModel({ type: String, required: true });
const dateValue = computed(() => new Date(modelValue.value));

defineProps({
  label: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const id = `datepicker-${Math.random().toString(36).substring(2, 9)}`;

const handleSelected = (date: Date) => {
  modelValue.value = date.toISOString();
};
</script>

<style scoped lang="scss">
.datepicker-container {
  margin-bottom: 20px;
  position: relative;
  width: 100%;
}

.datepicker-label {
  display: block;
  margin-bottom: 4px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.datepicker-input {
  font-size: 16px;
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: 4px;
  background-color: transparent;
  transition: border-color 0.2s;
  caret-color: $primary-color;

  &:focus {
    border-color: $primary-color;
    outline: none;
  }
}

.datepicker-wrapper {
  position: relative;
  width: 100%;
}

.datepicker-container :deep(.datepicker-calendar) {
  border: 1px solid $primary-color;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 100%;
  left: 0;
  transform: translateY(-8px);
  width: 100%;

  .vuejs3-datepicker__calendar-topbar {
    background-color: $primary-color; /* Primary color */
    color: #fff;
  }

  .cell {
    &:not(.blank):not(.disabled) {
      &.day:hover,
      &.month:hover,
      &.year:hover {
        border: 1px solid $primary-color;
      }
    }

    &.selected {
      background-color: $primary-color;
      color: #fff;
    }
  }
}

.has-error {
  border-color: #d32f2f;
}

.error-message {
  color: #d32f2f;
  font-size: 12px;
  margin-top: 4px;
}
</style>
