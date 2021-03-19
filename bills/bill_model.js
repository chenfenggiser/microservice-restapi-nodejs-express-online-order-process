const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Bill = new Schema(
    {
        username: { type: String, required: true },
        article: [{
                        item_name: { type: String, required: true },
                        quantity: { type: Number, required: true },
                        article_price: { type: Number, required: true },
                        currency: { type: String, required: true },
                }],
        total_price:{ type: Number, required: true },
        delivery_address: { type: String, required: true },
        contact_email: { type: String, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('bills', Bill )
