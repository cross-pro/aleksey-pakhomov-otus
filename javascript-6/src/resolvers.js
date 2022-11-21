import { users } from "./db"
import { findElement } from "./data-util"

const resolvers = {
  Query: {
    user: (parent, { id }, context, info) => findElement("id", id, users),
    users: () => users,
    findUserByName: (parent, { name }, context, info) => findElement("name", name, users),
  },
  Mutation: {
    createUser: (parent, {
      id, name, email, age,
    }, context, info) => {
      const newUser = {
        id, name, email, age,
      }

      users.push(newUser)

      return newUser
    },
    updateUser: (parent, {
      id, name, email, age,
    }, context, info) => {
      const newUser = users.find((user) => user.id === id)

      newUser.name = name
      newUser.email = email
      newUser.age = age

      return newUser
    },
    deleteUser: (parent, { id }, context, info) => {
      const userIndex = users.findIndex((user) => user.id === id)

      if (userIndex === -1) throw new Error("User not found.")

      const deletedUsers = users.splice(userIndex, 1)

      return deletedUsers[0]
    },
  },
}

export default resolvers
