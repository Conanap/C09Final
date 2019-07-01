let { makeExecutableSchema } = require("graphql-tools");

let typeDefs = require("./types");
let resolvers = require("./resolvers");

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema;
