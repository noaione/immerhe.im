<template>
  <div class="mt-1">
    <p v-if="error" class="mx-1 text-red-500">{{ error }}</p>

    <p v-else class="font-semibold text-cecilia-800">
      Total speen:
      <span class="font-bold text-cecilia-900">
        <span ref="counter">0</span>
        <span ref="counterSpoof" class="hidden">0</span>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

interface CounterData {
  error?: string;
  total: number;
  countries: Record<string, number> | null;
}

const intervalLock = ref<NodeJS.Timeout>();
const error = ref<string>("");

// use double ref so we can utilize custom formatting
const counter = ref<HTMLSpanElement>();
const counterSpoof = ref<HTMLSpanElement>();

// format the number
const actualFormatter = (value: number) => value.toLocaleString();

function animate(number: number) {
  if (counterSpoof.value) {
    // make 0-999 wihout commas
    // 1000+ with commas until the count
    anime({
      targets: counterSpoof.value,
      change: (state) => {
        if (counter.value) {
          counter.value.innerHTML = actualFormatter(state.animations[0].currentValue as unknown as number);
        }
      },
      innerHTML: [Number.parseInt(counterSpoof.value.innerHTML.trim()) || 0, number],
      easing: "easeInOutExpo",
      round: 1,
      duration: 2500,
    });
  } else if (counter.value) {
    counter.value.innerHTML = actualFormatter(number);
  }
}

async function animateLoop() {
  try {
    const data = await fetch("https://immerheim-stats.n4o.workers.dev/counter");
    const jsonData: CounterData = await data.json();

    if (jsonData.error) {
      error.value = jsonData.error;

      return;
    }

    if (jsonData.total === -1) {
      error.value = "Failed to fetch global counter!";
    }

    animate(jsonData.total);
  } catch (e) {
    error.value = e?.toString() || "An internal error occurred";
  }
}

onMounted(async () => {
  await animateLoop();

  intervalLock.value = setInterval(animateLoop, 10000);
});

onBeforeUnmount(() => {
  if (intervalLock.value) {
    clearInterval(intervalLock.value);
  }
});
</script>
