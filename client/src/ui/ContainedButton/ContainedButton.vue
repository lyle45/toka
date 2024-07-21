<template>
  <button
    ref="button"
    class="contained-button"
    @click="handleClick"
    :disabled="disabled || loading"
    :style="{ width: buttonWidth }"
  >
    <div v-if="loading" class="spinner"></div>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import { ref, toRefs, watchEffect } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const { loading } = toRefs(props);

const button = ref<HTMLButtonElement | null>(null);
const buttonWidth = ref('auto');

watchEffect(() => {
  buttonWidth.value = loading.value && button.value ? `${button.value.offsetWidth}px` : 'auto';
});

const handleClick = (event: MouseEvent) => {
  event.stopPropagation();
  emit('click', event);
};
</script>

<style scoped lang="scss">
.contained-button {
  height: 43px;
  padding: 12px 24px;
  font-size: 16px;
  overflow: hidden;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  background-color: $primary-color;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #3700b3;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: #3700b3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: rgba(98, 0, 234, 0.5);
    cursor: not-allowed;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
