import { ParamSerializationConfig } from ".";

export const DateParam: ParamSerializationConfig<Date | null> = {
  serialize: (value) => {
    try {
      return value?.toISOString() ?? null;
    } catch {
      return null;
    }
  },
  deserialize: (value) => {
    const stringValue = value as string;

    if (stringValue === null || stringValue === undefined) {
      return null;
    }

    try {
      const date = new Date(stringValue);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  },
};
