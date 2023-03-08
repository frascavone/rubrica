<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps(['width']);
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  background-color: white;
}
</style>
