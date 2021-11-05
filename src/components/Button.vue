<template>
  <div
    class="
      rounded
      outline-none
      px-2
      py-1
      bg-blue-600
      text-center
      hover:cursor-pointer
    "
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
export default {
  props: {
    text: String,
  },

  setup() {
    return {};
  },
};
</script>

<style scoped>
div:hover {
  transform: scale(1.02);
  transition-duration: 100ms;
}

div {
  color: white;
  font-size: 15px;
}
</style>
