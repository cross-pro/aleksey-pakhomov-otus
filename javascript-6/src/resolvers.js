import { users } from "./db"
import { findElement } from "./data-util"

const resolvers = {
  Query: {
    user: (parent, { id }, context, info) => findElement("id", id, users),
    users: () => users,
  },
}

export default resolvers
