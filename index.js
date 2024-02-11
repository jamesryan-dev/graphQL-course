import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from './schema.js'

import db from './_db.js'

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            const { id } = args
            return db.games.find(game => game.id === id)
        },
        reviews() {
            return db.reviews
        },
        review(parent, args, context) {
            const { id } = args 
            return db.reviews.find(review => review.id === id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            const { id } = args
            return db.authors.find(author => author.id === id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(review => review.game_id === parent.id)
        },
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(review => review.author_id === parent.id)
        }
    },
    Review: {
        // get the game associated with the review
        game(parent) {
            // search the relevant db table to FIND the game against the parent ID! 
            return db.games.find(game => game.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find(author => author.id === parent.author_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            const { id } = args
            db.games = db.games.filter(game => game.id !== id)
            return db.games
        },
        addGame(_, args) {
            // const { title, platform } = args;
            // const newGame = { title, platform };
            // console.log('newGame:', newGame)
            // db.games.push(newGame);
            // console.log('db.games:', db.games)
            // return db.games;

            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }

            db.games.push(game)
            return db.games
        },
        updateGame(_, args) {
            const { id, edits } = args
            const { title, platform } = edits
            let game = db.games.find(game => game.id === id)

            title ? game.title = title : null
            platform ? game.platform = platform : null

            return game 
        }
    }
}
// server setup

const server = new ApolloServer({
    // typeDefs:
    // which are definitions / descriptions of our data types and
    // their relationship they have with other data types
    // "map out what the graph looks like"
    typeDefs,
    // resolvers:
    // resolver functions that determine how we respond to queries
    // for data on the graph
    // "handle incoming requests and return data to the client"
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { 
        port: 4000
    }
})

console.log('Server ready at port', 4000)