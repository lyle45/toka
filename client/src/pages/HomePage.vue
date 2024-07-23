<template>
  <div class="homepage">
    <h1 class="title">Welcome to Toka</h1>
    <p class="description">
      Your ultimate tool for seamless project management. Toka helps you organize, track, and
      complete your projects with ease and efficiency.
    </p>
    <p class="description">
      Get started by selecting a project from the list or create a new project to begin your journey
      towards better productivity.
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 36px;
  color: $primary-color;
  margin-bottom: 16px;
}

.description {
  font-size: 18px;
  color: #666;
  margin-bottom: 8px;
}
</style>
