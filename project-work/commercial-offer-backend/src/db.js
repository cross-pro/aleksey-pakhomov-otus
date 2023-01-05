// заглушка базы данных
import { findElement } from "./data-util"

const category = [
  {
    id: 1, name: "Books",
  },
  {
    id: 2, name: "Car",
  },
  {
    id: 3, name: "Clothes",
  },
]

const items = [
  {
    id: 1, name: "Гарри поттер", description: "Интересная книга", category: findElement("id", 1, category), price: 1200,
  },
  {
    id: 2, name: "Маугли", description: "Для детей", category: findElement("id", 1, category), price: 600,
  },
  {
    id: 3, name: "Chevrolet Cruze", description: "Как у соседа", category: findElement("id", 2, category), price: 355000,
  },
  {
    id: 4, name: "Запорожец", description: "Совсем крайность", category: findElement("id", 2, category), price: 10300,
  },
  {
    id: 5, name: "Красные штаны", description: "Крутой чувак", category: findElement("id", 3, category), price: 10300,
  },
  {
    id: 6, name: "Пляжные шорты", description: "То, что нужно на лето, бери не пожалеешь!", category: findElement("id", 3, category), price: 10300,
  },
]

const orders = []

const basket = []

export {
  items, orders, category, basket,
}
