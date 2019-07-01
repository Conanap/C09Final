const User = `
type User {
    username: String!
    hashed: String!
    salt: String!
    firstName: String!
    lastName: String!
}

type Query {
    users: [User]
    user(username: String!): User

}

type Mutation {
    createUser(username: String!, firstName: String!, lastName: String!, password: String!): User
    login(username: String!,password: String!): User
    logout(username: String!): User
    fbLogin(username: String!, firstName: String!, lastName: String!, password: String!): User

}
`;

module.exports = User;