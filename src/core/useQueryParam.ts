import { Ref, computed, inject } from "vue";
import { LocationQuery, useRoute, useRouter } from "vue-router";
import { ParamSerializationConfig } from "../converters";
import { ProvideInterface, QueryParamUpdate } from "../plugin";
import { PROVIDE_KEY } from "../plugin/config";

function mergeUpdates(updates: QueryParamUpdate[]) {
  return updates.reduce((result, update) => {
    return {
      ...result,
      [update.name]: update.value,
    };
  }, {} as LocationQuery);
}

export function useQueryParam<TParam>(
  name: string,
  { serialize, deserialize }: ParamSerializationConfig<TParam>
): Ref<TParam> {
  const router = useRouter();
  const route = useRoute();
  const plugin = inject<ProvideInterface>(PROVIDE_KEY);

  async function updateUrl(updates: QueryParamUpdate[]) {
    const mergedUpdates = mergeUpdates(updates);
    const mergedQuery = { ...route.query, ...mergedUpdates } as LocationQuery;
    const nullProperties = Object.entries(mergedQuery)
      .filter(([_, value]) => value === null)
      .map(([key, _]) => key);

    nullProperties.forEach((key) => delete mergedQuery[key]);

    await router.replace({
      query: mergedQuery,
    });
  }

  function setQueryParam(value: TParam | null) {
    const serializedValue = serialize(value);
    plugin?.queueUpdate({ name, value: serializedValue }, updateUrl);
  }

  return computed({
    get: () => deserialize(route.query[name]),
    set: (value: TParam | null) => setQueryParam(value),
  });
}
