/* eslint-disable no-unused-vars */
import {
  items, orders, category, basket,
} from "./db"
import { findElement } from "./data-util"

const resolvers = {
  Query: {
    category: (parent, { id }, context, info) => findElement("id", id, category),
    categories: () => category,
    items: () => items,
    itemByName: (parent, { name }, context, info) => findElement("name", name, items),
    item: (parent, { id }, context, info) => findElement("id", id, items),
    itemsByCategory:
    (parent, { categoryID }, context, info) => items.filter((p) => p.category.id == categoryID),
    orders: () => orders,
    order: (parent, { id }, context, info) => findElement("id", id, orders),
    baskets: () => basket,
    basket: (parent, { id }, context, info) => findElement("id", id, basket),
  },

  Mutation: {
    createItem: (parent, {
      id, name, description, categoryID, price,
    }, context, info) => {
      const newItem = {
        id, name, description, category: findElement("id", categoryID, category), price,
      }
      items.push(newItem)
      return newItem
    },
    updateItem: (parent, {
      id, name, description, categoryID, price,
    }, context, info) => {
      const item = findElement("id", id, items)
      item.name = name || item.name
      item.description = description || item.description
      item.category = findElement("id", categoryID, category) || item.category
      item.price = price || item.price
      return item
    },
    deleteItem: (parent, { id }, context, info) => {
      const index = items.findIndex((p) => p.id == id)
      if (index === -1) throw new Error("Item not found")

      const item = items.splice(index, 1)
      return item[0]
    },
  },

}

export default resolvers
