<template>
  <div class="mt-1">
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <p v-else class="font-semibold text-cecilia-800">
      Total bounces: <span class="font-bold text-cecilia-900">{{ totalCounter }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
interface CounterData {
  error?: string;
  total: number;
  countries: Record<string, number> | null;
}

const totalCounter = ref(0);
const error = ref<string>("");

onMounted(async () => {
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

    totalCounter.value = jsonData.total;
  } catch (e) {
    error.value = e?.toString() || "An internal error occurred";
  }
});
</script>
