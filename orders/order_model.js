const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        user_id: { type: String, required: true },
        article: [
                {
                        item_id: { type: String, required: true },
                        quantity: { type: Number, required: true },
                }
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model('orders', Order )
