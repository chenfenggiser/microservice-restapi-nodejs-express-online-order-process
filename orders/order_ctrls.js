const Order  = require('./order_model')
const axios = require('axios');

const createOrder = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body',
        })
    }

    const order = new Order(body)

    if (!order) {
        return res.status(400).json({ success: false, error: "failed" })
    }

    //check if the item is available, if the isAvalable field is true or the order quantity number is bigger than the exist item's quantity, then this item is unavailable

    //get all items data,
    const allItemsArray = await axios.get(`http://localhost:8002/api/items`)

    const isUnavailableArray = order.article.map(orderedItem => {
        const unavailableItem = allItemsArray.data.data.filter(item => !item.isAvailable || orderedItem.quantity > item.quantity )
        if(unavailableItem.length>0){
            return true
        }else{
            return false
        }
    })

    const isUnavailable = isUnavailableArray.filter(item => item === true)

    //if there is more than one article unavailable, the length of the isUnavailable array would be longer than 0
    if(isUnavailable.length>0){
        return res.status(400).json({
            success: false,
            message: 'Create order failed, this article is no longer available!',
        })
    }


    order
        .save()
        .then(() => {

            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'order created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Order not created!',
            })
        })
}



const updateOrder = async (req, res) => {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }


    Order.findOne({_id: req.params._id } , (err, order) => {

        if (err) {
            return res.status(404).json({
                err,
                message: 'Order not found!',
            })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }

        order.user_id = body.user_id
        order.article = body.article
        order
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: order._id,
                    message: 'order updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'order update failed!',
                })
            })
    })
}



const deleteOrder = async (req, res) => {

    await Order.findOneAndDelete({ _id: req.params._id }, (err, order) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `order not found` })
        }

        return res.status(200).json({ success: true, info: "order deleted" })
    }).catch(err => console.log(err))
}

const getOrderById = async (req, res) => {

    await Order.findOne({_id: req.params._id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `order not found` })
        }

        return res.status(200).json({ data: order })

    }).catch(err => console.log(err))
}

const getOrders = async (req, res) => {

    await Order.find({}, (err, orders) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: `orders not found` })
        }
        return res.status(200).json({ data: orders })
    }).catch(err => console.log(err))
}

module.exports = {
    createOrder,
    deleteOrder,
    updateOrder,
    getOrderById,
    getOrders
}
