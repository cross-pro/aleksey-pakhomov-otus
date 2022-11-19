function findElement(field, value, collection) {
  const result = collection.find((element) => element[field] == value)
  if (result === undefined) return {}
  return result
}

export { findElement }
