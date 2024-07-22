<template>
  <div class="dropdown-container" @click="toggleDropdown">
    <label :for="dropdownId" class="dropdown-label">{{ label }}</label>
    <div class="dropdown-selected">{{ selectedLabel }}</div>
    <div v-if="isOpen" class="dropdown-list">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="dropdown-item"
        @click.stop="selectItem(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { DropdownItem } from '@/hooks/forms';

const modelValue = defineModel({ type: String, required: true });

const props = defineProps({
  items: {
    type: Array as () => DropdownItem[],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);
const selectedLabel = computed(() => {
  const selectedItem = props.items.find((item) => item.value === modelValue.value);
  return selectedItem ? selectedItem.label : 'Select...';
});

const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectItem = (item: DropdownItem) => {
  isOpen.value = false;
  modelValue.value = item.value;
};
</script>

<style scoped lang="scss">
.dropdown-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.dropdown-label {
  display: block;
  margin-bottom: 4px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.dropdown-selected {
  padding: 12px;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
}

.dropdown-selected:hover,
.dropdown-selected:focus {
  border-color: $primary-color;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
