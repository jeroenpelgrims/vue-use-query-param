import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ParamSerializationConfig } from "../converters";

export function useQueryParam<TParam>(
  name: string,
  { serialize, deserialize }: ParamSerializationConfig<TParam>
) {
  const router = useRouter();
  const route = useRoute();

  async function setQueryParam(value: TParam | null) {
    const serializedValue = serialize(value);
    const otherKeys = Object.keys(route.query).filter((key) => key !== name);
    const otherQueryParams = Object.fromEntries(
      otherKeys.map((key) => [key, route.query[key]])
    );

    await router.replace({
      query: {
        ...otherQueryParams,
        ...(value !== null ? { [name]: serializedValue } : {}),
      },
    });
  }

  return computed({
    get: () => deserialize(route.query[name]),
    set: (value: TParam | null) => setQueryParam(value),
  });
}
