export function unfold(obj) {
  const keys = Object.keys(obj);
  const len = Math.max.apply(
    null,
    keys.map(key => {
      const val = obj[key];
      if (Array.isArray(val)) {
        return val.length;
      }
      return 1;
    })
  );

  return Array.from(Array(len).keys()).map(i => {
    return keys.reduce((memo, key) => {
      const value = obj[key];
      memo[key] = Array.isArray(value) ? value[i] : value;
      return memo;
    }, {});
  });
}
