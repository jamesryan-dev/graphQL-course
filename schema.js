export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]! 
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
        game_id: Int!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        deleteGame(id: ID!): [Game]
        addGame(game: AddGameInput!): [Game]
        updateGame(id: ID!, edits: EditGameInput!): Game
    }

    input AddGameInput {
        title: String!
        platform: [String!]!
    }

    input EditGameInput {
        title: String
        platform: [String!]
    }
`

// LESSON:
// Always make sure my Schema matches the resolvers return and likewise
// always make sure my resolver return matches the schema! 

// five types:
// int, float, string, boolean, ID ( key as data objects )

// platform is array of strings

// ! means 'non-nullable' aka' required'. It must exist. In platform we state that both the
// array AND the string must be present

// Special type: Query
// You need to have this it is not optional
// It points to the graph and specifies the return types of those entry points