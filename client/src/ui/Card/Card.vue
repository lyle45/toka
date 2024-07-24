<template>
  <div
    class="card"
    :class="{ clickable: clickable && !active && !loading, active }"
    @click="$emit('click')"
  >
    <div v-if="$slots.actions" class="card-actions-placeholder"></div>
    <template v-if="loading">
      <Skeletor class="skeleton-title" width="60%" height="24px" pill />
      <Skeletor class="skeleton-description" width="80%" height="18px" pill />
      <Skeletor class="skeleton-date" width="40%" height="18px" pill />
    </template>
    <template v-else>
      <div class="card-content">
        <slot />
        <div class="card-actions">
          <slot name="actions" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Skeletor } from 'vue-skeletor';

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click', 'edit', 'delete']);
</script>

<style scoped lang="scss">
.card {
  padding: 16px;
  background-color: #fff;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition:
    background-color 0.2s,
    border 0.2s;
  border-radius: 8px;
  border: 1px solid transparent;
  position: relative;

  &.clickable {
    cursor: pointer;

    &:hover {
      box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.2);
      background-color: #f0f0f0;
      border: 1px solid #ccc;
    }
  }

  &.active {
    background-color: #e0e0e0;
    border: 1px solid #bbb;
  }

  .card-content {
    position: relative;
  }

  .card-actions-placeholder {
    width: 52px;
    height: 24px;
    float: right;
  }

  .card-actions {
    position: absolute;
    top: -4px;
    right: -4px;
    display: none;
    gap: 4px;
  }

  &:hover .card-actions {
    display: flex;
  }
}

.skeleton-title,
.skeleton-description {
  margin-bottom: 8px;
}
</style>
