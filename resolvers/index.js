const { mergeResolvers } = require('@graphql-tools/merge');

const dashboardResolver = require('./dashboardResolver');
const chatResolver = require('./chatResolver');
const userResolver = require('./userResolver');
const projectResolver = require('./projectResolver');


const resolvers = mergeResolvers([dashboardResolver, chatResolver, userResolver, projectResolver]);

module.exports = resolvers;
