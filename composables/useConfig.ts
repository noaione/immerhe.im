interface Config {
  autoRefresh: boolean;
  noAnimation: boolean;
}

const STORAGE_KEY = "immerheim.config";

export const useConfig = () => {
  const autoRefresh = ref<boolean>(true);
  const noAnimation = ref<boolean>(false);

  function loadConfig() {
    const data = window.localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return;
    }

    try {
      const parsed = JSON.parse(data) as Config;

      autoRefresh.value = parsed.autoRefresh ?? true;
      noAnimation.value = parsed.noAnimation ?? false;
    } catch (e) {
      console.error("Failed to load config", e);
    }
  }

  function saveConfig() {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        autoRefresh: autoRefresh.value,
        noAnimation: noAnimation.value,
      })
    );
  }

  watch(
    [autoRefresh, noAnimation],
    () => {
      saveConfig();
    },
    {
      immediate: false,
    }
  );

  onMounted(() => {
    loadConfig();
  });

  onBeforeUnmount(() => {
    saveConfig();
  });

  return {
    autoRefresh,
    noAnimation,
  };
};
