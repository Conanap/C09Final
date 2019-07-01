const Sub = `
type Sub {
    username: String!
    sub: String!
    position: Int!
    delta: Int!
    dropTo: Boolean!
}

type Query {
    sub(username: String!): String!
    testNotifications: [Int]
    subs: [Sub]
}

type Mutation {
    saveSub(username: String!, subscription: String!): Sub
    clearSub: Int
}
`;

module.exports = Sub;