const { buildASTSchema } = require('graphql')
const gql = require('graphql-tag')
const index = require('../index.js')

module.exports = {
    schema: buildASTSchema(gql`
        type Query {
            users: [User]
            user(id: ID!): User
        }

        type User {
            id: ID,
            username: String
            email: String
            password: String
        }

        type Mutation {
            submitUser(input: UserInput!): User
        }

        input UserInput {
            username: String!
            email: String!
            password: String!
        }
    `),

    root: {
        user: async ({ id }) => {
            try {
                const db = index.database
                const user = await db.get_user([id]).then(user => user[0])
                return user
            } catch(error) {
                console.log('------------ error in user root', error)
            }
        },
        users: async () => {
            try {
                const db = index.database
                const users = await db.get_all_users().then(users => users)
                return users
            } catch(error) {
                console.log('------------ error in users root', error)
            }
        },
        submitUser: async ({ input: { username, email, password }}) => {
            try {
                const db = index.database
                const newUser = await db.add_user({ username, email, password }).then(user => user[0])
                return newUser
            } catch(error) {
                console.log('------------ error in newUser root', error)
            }
        }
    }
}