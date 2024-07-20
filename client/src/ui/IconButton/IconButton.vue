<template>
  <button class="icon-button" @click.stop="$emit('click')">
    <i :class="iconClass"></i>
  </button>
</template>

<script setup lang="ts">
defineProps({
  iconClass: {
    type: String,
    required: true,
  },
});

defineEmits(['click']);
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
