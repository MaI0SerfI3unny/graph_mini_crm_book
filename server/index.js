require('dotenv').config({ path: `./.env` })
const express = require("express")
const {graphqlHTTP} = require("express-graphql")
const schema = require("./schema/schema")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(
    cors({
      origin: "*",
      credentials: true,
      optionSuccessStatus: 200,
    })
)

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(process.env.PORT, async() => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(`Started app on ${process.env.PORT}`)
})