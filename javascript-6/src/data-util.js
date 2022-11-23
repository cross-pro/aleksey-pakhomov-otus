/* eslint-disable eqeqeq */
function findElement(field, value, collection) {
  return collection.find((element) => element[field] == value)
}

export { findElement }
