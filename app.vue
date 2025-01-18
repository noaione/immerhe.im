<template>
  <div class="h-screen">
    <div class="flex h-full items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <CeciliaWind @current-count="counter = $event" />
        <div class="mt-2">
          <p class="font-semibold text-cecilia-800">
            Art by
            <a
              class="font-bold text-cecilia-900 underline decoration-dashed hover:decoration-solid"
              href="https://x.com/akashibag/status/1803460334260306199"
              target="_blank"
              rel="noreferrer"
            >
              @akashibag
            </a>
          </p>
        </div>
        <div class="mt-1">
          <p class="font-semibold text-cecilia-800">
            Queued: <span class="font-bold text-cecilia-900">{{ counter.toLocaleString() }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const counter = ref(0);
</script>

