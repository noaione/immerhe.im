<template>
  <div class="relative size-72 flex-shrink-0 cursor-pointer" @click="onClickLoopAnimation">
    <img
      ref="frame1"
      src="~/assets/images/ceci-frame01.png?inline"
      class="ceci-stack-frame z-[2]"
      alt="CeciliaWind Frame 1"
      title="Click her!"
    />
    <img
      ref="frame2"
      src="~/assets/images/ceci-frame02.png?inline"
      class="ceci-stack-frame z-[3]"
      alt="CeciliaWind Frame 2"
      title="Click her!"
      style="display: none"
    />
    <img
      ref="frame3"
      src="~/assets/images/ceci-frame03.png?inline"
      class="ceci-stack-frame z-[4]"
      alt="CeciliaWind Frame 3"
      title="Click her!"
      style="display: none"
    />
    <img
      ref="frame4"
      src="~/assets/images/ceci-frame04.png?inline"
      class="ceci-stack-frame z-[5]"
      alt="CeciliaWind Frame 4"
      title="Click her!"
      style="display: none"
    />
  </div>
</template>

<script setup lang="ts">
const activeFrame = ref(0);
const frameReady = ref(false);
const frame1 = ref<HTMLImageElement>();
const frame2 = ref<HTMLImageElement>();
const frame3 = ref<HTMLImageElement>();
const frame4 = ref<HTMLImageElement>();

function spinComplete() {
  if (window.plausible) {
    window.plausible("CeciliaWind");
  }
}

function toggleFrame(frame: HTMLImageElement, hideFrames: HTMLImageElement[]) {
  frame.style.display = "block";

  hideFrames.forEach((f) => {
    f.style.display = "none";
  });
}

function showFrame(frame: number) {
  if (frame < 0 || frame > 3) {
    return;
  }

  switch (frame) {
    case 0:
      spinComplete();
      toggleFrame(frame1.value!, [frame4.value!, frame2.value!, frame3.value!]);
      break;
    case 1:
      toggleFrame(frame2.value!, [frame1.value!, frame3.value!, frame4.value!]);
      break;
    case 2:
      toggleFrame(frame3.value!, [frame1.value!, frame2.value!, frame4.value!]);
      break;
    case 3:
      toggleFrame(frame4.value!, [frame1.value!, frame2.value!, frame3.value!]);
      break;
    default:
      break;
  }
}

function onClickLoopAnimation() {
  if (!frameReady.value) {
    return;
  }

  const nextFrame = (activeFrame.value + 1) % 4;

  activeFrame.value = nextFrame;

  showFrame(nextFrame);
}

onMounted(() => {
  if (frame1.value && frame2.value && frame3.value && frame4.value) {
    console.log("Cecilia is now ready to be speen!");
    frameReady.value = true;
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

.ceci-stack-frame {
  @apply absolute left-0 top-0 size-full cursor-pointer object-contain object-center;
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
