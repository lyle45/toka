<template>
  <button class="icon-button" :style="{ width: size, height: size }" @click="handleClick">
    <i :class="iconClass" :style="{ fontSize: iconSize }"></i>
  </button>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '32px', // Default size for the button
  },
});

const emit = defineEmits(['click']);

const { size } = toRefs(props);

const handleClick = (event: MouseEvent) => {
  event.stopPropagation();
  emit('click', event);
};

const iconSize = computed(() => {
  // Calculate the icon size based on the button size
  const buttonSize = parseFloat(size.value);
  return `${buttonSize * 0.75}px`;
});
</script>

<style scoped lang="scss">
.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 0;

  i {
    color: $primary-color;
    font-size: 16px;
  }

  &:hover {
    background-color: rgba(98, 0, 234, 0.1); /* Subtle background color on hover */
  }
}
</style>
