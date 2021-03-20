//initialize express routes
let router = require('express').Router();


let orderController = require('./order_ctrls');

// user routes
router.route('/orders')
    .get(orderController.getOrders);

router.route('/order')
    .post(orderController.createOrder);

router.route('/order/:_id')
    .get(orderController.getOrderById)
    .put(orderController.updateOrder)
    .delete(orderController.deleteOrder);

//Export API routes
module.exports = router;
