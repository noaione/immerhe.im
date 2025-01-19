<template>
  <a
    :class="`font-bold text-cecilia-900 underline decoration-dashed hover:decoration-solid ${$props.class ?? ''}`"
    :href="href"
    target="_blank"
    rel="noreferrer"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
  class?: string;
}>();
</script>
