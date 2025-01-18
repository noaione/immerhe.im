<template>
  <img
    ref="hook"
    src="/assets/images/cecilia.png"
    class="size-72 cursor-pointer object-contain object-center"
    alt="CeciliaWind"
    title="Click her!"
  />
</template>

<script setup lang="ts">
const emits = defineEmits<{
  currentCount: [count: number];
}>();

const hook = ref<HTMLImageElement>();

const bounceReset = ref<NodeJS.Timeout>();
const bounceAnim = ref<NodeJS.Timeout>();
const bounceQueue = ref<number[]>([]);

function publish() {
  if (window.plausible) {
    window.plausible("cecilia");
  }
}

function bouncy() {
  if (!hook.value) {
    bounceReset.value = setTimeout(bouncy, 100);

    return;
  }

  if (hook.value.classList.contains("animate-cecilia")) {
    bounceReset.value = setTimeout(bouncy, 100);

    return;
  }

  // Check if queue is empty
  if (bounceQueue.value.length === 0) {
    bounceReset.value = setTimeout(bouncy, 100);

    return;
  }

  const { value } = hook;

  value.classList.add("animate-cecilia");
  publish();
  bounceAnim.value = setTimeout(() => {
    value.classList.remove("animate-cecilia");
    bounceQueue.value.shift();
    emits("currentCount", bounceQueue.value.length);

    nextTick(() => {
      setTimeout(bouncy, 50);
    });
  }, 1500);
}

function queueBounce() {
  if (!hook.value) {
    return;
  }

  bounceQueue.value.push(1);
  emits("currentCount", bounceQueue.value.length);
}

onMounted(() => {
  // On click, queue bouncing cecilia
  hook.value?.addEventListener("click", queueBounce);

  // Bounce cecilia every 1.5 seconds
  emits("currentCount", 0);
  bouncy();
});

onBeforeUnmount(() => {
  // Remove event listener
  hook.value?.removeEventListener("click", queueBounce);

  // Remove timers
  if (bounceReset.value) {
    clearTimeout(bounceReset.value);
  }

  if (bounceAnim.value) {
    clearTimeout(bounceAnim.value);
  }
});

declare global {
  interface Window {
    plausible?: (event: string, url?: string) => void;
  }
}
</script>

<style lang="postcss" scoped>
.animate-cecilia {
  /* Only bounce one time */
  animation: cecilia 1.5s ease-out 1;
}

@keyframes cecilia {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>
