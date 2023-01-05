function findElement(field, value, collection) {
  if (!collection) return undefined
  return collection.find((element) => element[field] == value)
}

export { findElement }
