const { mergeTypeDefs } = require('@graphql-tools/merge');

const dashboardSchema = require('./dashboardSchema');
const chatSchema = require('./chatSchema');
const userSchema = require('./userSchema');
const projectSchema = require('./projectSchema')


const typeDefs = mergeTypeDefs([dashboardSchema, chatSchema, userSchema,projectSchema]);

module.exports = typeDefs;
