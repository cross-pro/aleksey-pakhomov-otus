/* eslint-disable eqeqeq */
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
    createCategory: (parent, { id, name }, context, info) => {
      const newCategory = { id, name }
      category.push(newCategory)
      return newCategory
    },
    updateCategory: (parent, { id, name }, context, info) => {
      const newCategory = findElement("id", id, category)
      newCategory.name = name || newCategory.name
      return newCategory
    },
    deleteCategory: (parent, { id }, context, info) => {
      const isUsedCategory = items.find((p) => p.category.id == id)
      if (isUsedCategory !== undefined) throw new Error(`Category is used`)

      const newCategory = findElement("id", id, category)
      if (newCategory === null || newCategory === undefined) throw new Error(`Category with id: ${id} not found`)
      category.splice(newCategory, 1)
      return newCategory
    },
    createBasket: (parent, { itemID }, context, info) => {
      const exsistingItem = findElement("id", itemID, items)
      if (exsistingItem === undefined) throw new Error(`Item with id: ${itemID} not found`)

      const newBasket = {
        item: exsistingItem,
      }
      if (findElement("item", exsistingItem, basket) === undefined) basket.push(newBasket)
      return newBasket
    },
    createOrder: (parent, { id, itemID, order_status }, context, info) => {
      const newOrder = {
        id, item: findElement("id", itemID, items), order_status,
      }

      orders.push(newOrder)
      return newOrder
    },
  },
}

export default resolvers
