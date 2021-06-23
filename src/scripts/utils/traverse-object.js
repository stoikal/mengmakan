export default function traverseObject(obj, properties, options = {}) {
  const { validate = () => true, resolver } = options;
  const { length } = properties;
  let value = obj;

  for (let i = 0; i < length; i += 1) {
    // value is parent in this context
    if (typeof value === 'object' && validate(value)) {
      const property = properties[i];
      const isLastIndex = i === length - 1;
      let temp;

      if (isLastIndex && resolver) {
        temp = value[property][resolver] || value[property];
      } else {
        temp = value[property];
      }

      value = temp;
    } else {
      value = undefined;
      break;
    }
  }

  return value;
}
