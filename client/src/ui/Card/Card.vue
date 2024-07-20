<template>
  <div class="card" :class="{ clickable: !active && !loading, active }" @click="$emit('click')">
    <template v-if="loading">
      <Skeletor class="skeleton-title" width="60%" height="24px" pill />
      <Skeletor class="skeleton-description" width="80%" height="18px" pill />
      <Skeletor class="skeleton-date" width="40%" height="18px" pill />
    </template>
    <template v-else>
      <div class="card-content">
        <slot />
        <div class="card-actions">
          <IconButton icon-class="mdi mdi-pencil" @click.stop="$emit('edit')" />
          <IconButton icon-class="mdi mdi-delete" @click.stop="$emit('delete')" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Skeletor } from 'vue-skeletor';
import IconButton from '@/ui/IconButton/IconButton.vue';

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  active: {
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

      .card-actions {
        display: flex;
      }
    }
  }

  &.active {
    background-color: #e0e0e0;
    border: 1px solid #bbb;
  }
}

.card-content {
  position: relative;
}

.card-actions {
  position: absolute;
  top: -4px;
  right: -4px;
  display: none;
  gap: 4px;
}

.skeleton-title,
.skeleton-description {
  margin-bottom: 8px;
}
</style>
