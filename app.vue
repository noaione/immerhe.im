<template>
  <div class="flex h-screen flex-col">
    <div class="flex h-full items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <CeciliaWind />
        <div class="mt-2">
          <GreenLink href="https://www.youtube.com/@holoen_ceciliaimmergreen" class="text-lg">
            Cecilia Immergreen
          </GreenLink>
        </div>
        <div class="mt-0.5">
          <small class="text-xs font-semibold tracking-wider text-cecilia-900">Click her to wind her up!</small>
        </div>
        <hr class="my-2 w-full border-b-[1px] border-dotted border-cecilia-800" />
        <div>
          <p class="font-semibold text-cecilia-800">
            Art by
            <GreenLink href="https://x.com/akashibag/status/1803460334260306199">@akashibag</GreenLink>
          </p>
        </div>
        <GlobalCounter />
      </div>
    </div>
    <footer class="pb-8 text-center text-xs font-semibold text-cecilia-800">
      Made by
      <GreenLink href="https://github.com/noaione">@noaione</GreenLink>
      ¦
      <GreenLink href="https://github.com/noaione/immerhe.im">Source code</GreenLink>
    </footer>
    <CeciliaRibbon @click="configOpen = true" />
    <CeciliaConfig :open="configOpen" @close="configOpen = false" />
  </div>
</template>

<script setup lang="ts">
const configOpen = ref(false);

provideHeadlessUseId(() => useId());
</script>

