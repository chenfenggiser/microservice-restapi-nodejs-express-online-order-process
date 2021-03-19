const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: { type: String, required: true },
        email: {type: String, required: true},
        age: {type: Number, required: true},
        address: {type: String, required: true},
    }
)

module.exports = mongoose.model('users', User )
