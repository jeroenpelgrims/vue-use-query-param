import { LocationQueryValue } from "vue-router";
import { ParamSerializationConfigBuilder } from ".";

export enum DateParamType {
  Date,
  DateTime,
}

type DateParamOptions = {
  dateType: DateParamType;
};

function serialize(value: Date | undefined, options?: DateParamOptions) {
  try {
    const serializedValue = value?.toISOString();
    return options?.dateType === DateParamType.Date
      ? serializedValue?.substring(0, 10) ?? null
      : serializedValue ?? null;
  } catch {
    return null;
  }
}

function deserialize(
  value: LocationQueryValue | LocationQueryValue[],
  options?: DateParamOptions
) {
  const stringValue = value as string;

  if (stringValue === null || stringValue === undefined) {
    return undefined;
  }

  try {
    const date = new Date(stringValue);
    return isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}

export const dateParam: ParamSerializationConfigBuilder<
  Date | undefined,
  DateParamOptions
> = (options) => {
  return {
    serialize: (value) => serialize(value, options),
    deserialize: (value) => deserialize(value, options),
  };
};
