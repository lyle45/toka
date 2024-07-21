<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import Card from '@/ui/Card/Card.vue';

const show = defineModel({ type: Boolean, required: true });

defineProps({
  title: {
    type: String,
    default: '',
  },
});

defineEmits(['confirm', 'cancel']);
</script>

<template>
  <VueFinalModal
    v-model="show"
    class="card-modal"
    content-class="card-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <Card class="card-modal-card">
      <h2>{{ title }}</h2>
      <slot />
    </Card>
  </VueFinalModal>
</template>

<style lang="scss">
.card-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-modal-content {
  display: flex;
  flex-direction: column;
}
</style>

<style scoped lang="scss">
.card-modal-card {
  width: 400px;
}
</style>
