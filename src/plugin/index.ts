import { Plugin, ref } from "vue";
import { LocationQueryValue } from "vue-router";
import { PROVIDE_KEY } from "./config";

type UseQueryParamPluginOptions = {
  debounceDelay?: number;
};

export type QueryParamUpdate = {
  name: string;
  value: LocationQueryValue | LocationQueryValue[];
};

export type ProvideInterface = {
  queueUpdate: (
    update: QueryParamUpdate,
    updateUrl: (updates: QueryParamUpdate[]) => Promise<void>
  ) => void;
};

export const useQueryParamPlugin: Plugin<UseQueryParamPluginOptions> = {
  install: (app, options) => {
    const queue = ref<QueryParamUpdate[]>([]);
    const timeoutRef = ref<number | null>(null);

    function queueUpdate(
      update: QueryParamUpdate,
      urlUpdate: (updates: QueryParamUpdate[]) => Promise<void>
    ) {
      if (timeoutRef.value) {
        clearTimeout(timeoutRef.value);
      }

      queue.value.push(update);

      timeoutRef.value = setTimeout(async () => {
        await urlUpdate(queue.value);
        queue.value = [];
        timeoutRef.value = null;
      }, options.debounceDelay ?? 0);
    }

    app.provide<ProvideInterface>(PROVIDE_KEY, { queueUpdate });
  },
};
