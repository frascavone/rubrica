<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: { type: String, required: false, default: null },
    link: { type: Boolean, required: false, default: false },
    to: { type: String, required: false, default: '/' },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1rem;
  font: inherit;
  background-color: cadetblue;
  border: 1px solid black;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  text-transform: uppercase;
}

.outline {
  background-color: transparent;
  border-color: black;
  color: black;
}
.delete {
  margin-top: 1rem;
  background-color: brown;
  color: white;
}
</style>
