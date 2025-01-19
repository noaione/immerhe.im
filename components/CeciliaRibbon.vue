<template>
  <img
    id="ceci-ribbon"
    class="ceci-ribbon fixed right-0 top-0 mr-2 mt-2 size-28 cursor-pointer"
    src="~/assets/images/ceci-ribbon.webp"
    alt="Cecilia Key"
    title="Configuration"
    @click="$emit('click')"
  />
</template>

<script setup lang="ts">
defineEmits<{
  click: [];
}>();
</script>

<style lang="postcss" scoped>
.ceci-ribbon {
  /* We want to make the image scale bigger when being hovered. */
  --scale: 1;
  animation: wiggle 1s linear infinite;
  transition: transform 0.2s ease-in-out;
}

.ceci-ribbon:hover {
  --scale: 1.1;
  animation-play-state: paused;
}

@keyframes wiggle {
  0%,
  100% {
    transform: rotate(0deg) scale(var(--scale));
  }
  25% {
    transform: rotate(5deg) scale(var(--scale));
  }
  75% {
    transform: rotate(-5deg) scale(var(--scale));
  }
}
</style>
