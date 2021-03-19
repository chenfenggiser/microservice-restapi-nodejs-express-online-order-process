const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema(
    {
        item_name: { type: String, required: true },
        author: {type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
        currency: {type: String, required: true},
        isAvailable: {type: Boolean, required: true},
    }
)

module.exports = mongoose.model('items', Item )
