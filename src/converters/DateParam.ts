import { ParamSerializationConfig } from ".";

export const DateParam: ParamSerializationConfig<Date | null> = {
  serialize: (value) => value?.toUTCString() ?? null,
  deserialize: (value) => {
    const stringValue = value as string;
    try {
      const date = new Date(stringValue);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  },
};
