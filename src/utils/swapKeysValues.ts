const swapKeysValues = <T extends Record<string, V>, V extends string>(
  obj: T
) => {
  const entries = Object.entries(obj).map(([key, value]: [keyof T, V]) => {
    const numKey = Number(key);

    return [value, isNaN(numKey) ? key : numKey];
  });

  return Object.fromEntries(entries) as {
    [K in keyof T as T[K]]: K;
  };
};

export default swapKeysValues;
