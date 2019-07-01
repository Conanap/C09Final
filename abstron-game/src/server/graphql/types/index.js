const { mergeTypes } = require("merge-graphql-schemas");

let User = require('./User');
let Score = require('./Score');
let Sub = require('./Sub');

const TypeDefs = [User, Score, Sub];

module.exports = mergeTypes(TypeDefs, {all: true});