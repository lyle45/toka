<template>
  <CardModal v-model="show" :title="title">
    <slot />
    <div class="action-buttons">
      <ContainedButton @click="$emit('cancel')">Cancel</ContainedButton>
      <ContainedButton @click="$emit('confirm')" :loading="loading" :disabled="disabled">
        Confirm
      </ContainedButton>
    </div>
  </CardModal>
</template>

<script setup lang="ts">
import CardModal from '@/modals/CardModal.vue';
import ContainedButton from '@/ui/ContainedButton/ContainedButton.vue';

const show = defineModel({ type: Boolean, required: true });

defineProps({
  title: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['confirm', 'cancel']);
</script>

<style scoped lang="scss">
.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 8px;
}
</style>
