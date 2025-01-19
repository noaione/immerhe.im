<template>
  <Teleport to="body">
    <div data-modal="cecilia-config">
      <Transition name="backdrop">
        <div
          v-if="open"
          class="bg-black-900/20 fixed inset-1 z-10 h-screen w-screen backdrop-blur-md"
          @click="$emit('close')"
        />
      </Transition>

      <Transition name="modal" @after-enter="modalPopped = true" @leave="modalPopped = false">
        <div v-if="open" class="fixed inset-0 z-[11] flex h-full w-full items-center justify-center">
          <div ref="innerModal" class="flex w-full max-w-sm flex-col rounded bg-cecilia-900 px-2 py-2 text-cecilia-100">
            <div class="mx-2 mb-1 mt-2 inline-block text-xl font-bold">
              <span class="inline align-top">Config</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="float-right inline size-6 stroke-[2px] align-text-bottom text-cecilia-200 transition-opacity hover:opacity-70"
                @click="$emit('close')"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <hr class="mx-1.5 my-2 border-b-[1px] border-dashed border-cecilia-300" />
            <div class="mx-2 mb-2 mt-2 flex flex-col gap-4">
              <HUISwitchGroup>
                <div class="flex">
                  <HUISwitchLabel class="mr-4 font-semibold" passive>Auto refresh</HUISwitchLabel>
                  <HUISwitch
                    v-model="autoRefresh"
                    :class="autoRefresh ? 'bg-cecilia-700' : 'bg-cecilia-500'"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cecilia-600 focus:ring-offset-2"
                  >
                    <span
                      :class="autoRefresh ? 'translate-x-6' : 'translate-x-1'"
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    />
                  </HUISwitch>
                </div>
              </HUISwitchGroup>
              <HUISwitchGroup>
                <div class="flex">
                  <HUISwitchLabel class="mr-4 font-semibold" passive>
                    No animation <span class="text-xs opacity-75">(unused)</span>
                  </HUISwitchLabel>
                  <HUISwitch
                    v-model="noAnimation"
                    :class="noAnimation ? 'bg-cecilia-700' : 'bg-cecilia-500'"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cecilia-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled
                  >
                    <span
                      :class="noAnimation ? 'translate-x-6' : 'translate-x-1'"
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    />
                  </HUISwitch>
                </div>
              </HUISwitchGroup>
            </div>
            <hr class="mx-1.5 my-2 border-b-[1px] border-dashed border-cecilia-300" />
            <div class="mx-2 mb-3 mt-2 text-right font-semibold text-cecilia-300">
              v{{ runtimeConfig.public.version }}
              <GreenLink
                v-if="runtimeConfig.public.commitSha"
                class="text-xs font-bold !text-cecilia-400 opacity-80"
                :href="`https://github.com/noaione/immerhe.im/commit/${runtimeConfig.public.commitSha}`"
              >
                ({{ runtimeConfig.public.commitSha.slice(0, 7) }})
              </GreenLink>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
}>();

const emits = defineEmits<{
  close: [];
}>();

const { autoRefresh, noAnimation } = useConfig();
const runtimeConfig = useRuntimeConfig();
const modalPopped = ref(false);
const innerModal = ref<HTMLDivElement>();

function interceptDocumentClick(e: MouseEvent) {
  // If it's open and we click outside, close it
  if (modalPopped.value && innerModal.value) {
    if (!innerModal.value.contains(e.target as HTMLElement)) {
      emits("close");
    }
  }
}
onMounted(() => {
  // Check where we click
  document.addEventListener("click", interceptDocumentClick);
});

onBeforeUnmount(() => {
  // Detach the click listener
  document.removeEventListener("click", interceptDocumentClick);
});
</script>

<style lang="postcss" scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>
