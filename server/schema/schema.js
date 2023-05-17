const graphql = require("graphql")
const Book = require("../models/book")
const Help = require("../models/help")
const Author = require("../models/author")
const Promote = require("../models/promote")
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType, 
            resolve(parent){
               return Author.findById(parent.authorId)
            }
        }
    })
})

const HelpType = new GraphQLObjectType({
    name: "Help",
    fields: () => ({
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        answer: { type: GraphQLString },
    })
})

const PromoteType = new GraphQLObjectType({
    name: "Promote",
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLInt },
        book: {
            type: BookType,
            resolve(parent){
                return Book.findById(parent.bookId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Authors",
    fields: () => ({
        name: { type: GraphQLString},
        age: { type: GraphQLInt },
        id: { type: GraphQLID },
        books: { 
            type: new GraphQLList(BookType),
            resolve(parent){
                return Book.find({ authorId: parent.id })
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        addAuthor:{
            type: AuthorType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(_, args){
                const { name, age } = args
                let author = new Author({ name, age })
                return author.save()
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(_, args){
                const { name, genre, authorId } = args
                let book = new Book({ name, genre, authorId })
                return book.save()
            }
        },
        addHelp:{
            type: HelpType,
            args:{
                question: { type: new GraphQLNonNull(GraphQLString) },
                answer: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(_, args){
                const { question, answer } = args
                let help = new Help({ question, answer })
                return help.save()
            }
        },
        addPromote:{
            type: PromoteType,
            args:{
                value: { type: new GraphQLNonNull(GraphQLInt) },
                bookId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(_, args){
                const { value, bookId } = args
                if(value < 0 || value > 100)
                    throw new Error("Incorrect discount value");
                let promote = new Promote({ value, bookId })
                return promote.save()
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book:{
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(_,args){  
                return Book.findById(args.id)
            }
        },
        help:{
            type: HelpType,
            args: { id: { type: GraphQLID } },
            resolve(_,args){
                return Help.findById(args.id)
            }
        },
        promote:{
            type: PromoteType,
            args: { id: { type: GraphQLID } },
            resolve(_,args){
                return Promote.findById(args.id)
            }
        },
        author:{
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(_,args){
                return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(){
                return Book.find()
            }
        },
        helps:{
            type: new GraphQLList(HelpType),
            resolve(){
                return Help.find()
            }
        },
        promotes:{
            type: new GraphQLList(PromoteType),
            resolve(){
                return Promote.find()
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(){
                return Author.find()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})