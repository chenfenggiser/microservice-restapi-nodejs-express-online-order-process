//initialize express routes
let router = require('express').Router();


let itemController = require('./item_ctrls');

// user routes
router.route('/items')
    .get(itemController.getItems);

router.route('/item')
    .post(itemController.createItem);

router.route('/item/:_id')
    .get(itemController.getItemById)
    .patch(itemController.patchItem)
    .delete(itemController.deleteItem);

//Export API routes
module.exports = router;
