<template>
  <div :class="['outlined-field', { textarea: textarea }]">
    <label :for="elementId" class="field-label">{{ label }}</label>
    <input v-if="!textarea" v-model="value" v-bind="$attrs" :id="elementId" class="field-element" />
    <textarea
      v-else
      v-model="value"
      v-bind="$attrs"
      :id="elementId"
      :rows="rows"
      class="field-element"
    ></textarea>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const value = defineModel({ type: String, required: true });

defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  textarea: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 4,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const elementId = computed(() => `field-${Math.random().toString(36).substr(2, 9)}`);
</script>

<style scoped lang="scss">
.outlined-field {
  position: relative;
  width: 100%;
  margin: 20px 0;

  .field-label {
    display: block;
    margin-bottom: 4px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
  }

  .field-element {
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

  &.textarea .field-element {
    resize: vertical;
  }
}

.error-message {
  margin-top: 4px;
  font-size: 12px;
  color: #d32f2f;
}
</style>
