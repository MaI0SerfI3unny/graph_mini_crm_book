const mongoose = require("mongoose")
const Schema = mongoose.Schema

const promoteSchema = new Schema({
    value: Number,
    bookId: String,
}) 

module.exports = mongoose.model("Promote", promoteSchema)