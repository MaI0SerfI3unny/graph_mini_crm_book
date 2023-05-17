const mongoose = require("mongoose")
const Schema = mongoose.Schema

const helpSchema = new Schema({
    question: String,
    answer: String,
}) 

module.exports = mongoose.model("Help", helpSchema)