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

<style lang="scss">
.card-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 32px;
}
</style>

<style scoped lang="scss">
.card-modal-card {
  display: flex;
  flex-direction: column;
  width: 350px;
  max-height: 100%;
  overflow: auto;
}
</style>
