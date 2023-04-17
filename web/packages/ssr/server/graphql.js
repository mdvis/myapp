/**
* name: 模块功能
* author: Deve
* date: 2020-05-01
*/

const { ApolloServer, gql } = require('apollo-server-koa');
const { graphql, buildSchema } = require('graphql');

const typeDefs = gql`
  type Query {
      hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello world'
  }
}

const AS = new ApolloServer({typeDefs, resolvers})

const schema = buildSchema(`
 type Query {
   hello: String
 }
`);

const root = {hello:()=> 'hello wrld'};

graphql(schema, root).then((res)=>{
  console.log(res)
})

module.exports=function(app){
  AS.applyMiddleware({app})
}
