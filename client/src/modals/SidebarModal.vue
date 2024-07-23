<template>
  <VueFinalModal
    v-if="$matches.sm.max"
    v-model="show"
    content-class="sidebar-modal-content"
    content-transition="vfm-slide-left"
    :focus-trap="false"
  >
    <Sidebar @close-modal="show = false" />
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const show = defineModel({ type: Boolean, required: true });
const route = useRoute();

watch(
  () => route.params.projectId,
  async () => {
    setTimeout(() => {
      show.value = false;
    }, 1000);
  }
);
</script>

<style scoped lang="scss"></style>

<style lang="scss">
.sidebar-modal-content {
  width: 80%;
  max-width: 300px;
  height: 100%;
}
</style>
