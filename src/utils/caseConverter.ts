export type CamelizeInput = object;

export const mapToCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => mapToCamelCase(item)) as unknown as T;
  } else if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, char) =>
          char.toUpperCase()
        );

        (acc as any)[camelKey] = mapToCamelCase((obj as any)[key]);
        return acc;
      },
      {} as Record<string, unknown>
    ) as T;
  }

  return obj;
};

export default mapToCamelCase;
