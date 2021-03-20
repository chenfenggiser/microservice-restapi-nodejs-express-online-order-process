//initialize express routes
let router = require('express').Router();

let billController = require('./bill_ctrls');


// bill routes
router.route('/bill')
    .post(billController.createBill);

router.route('/bill/:_id')
    .get(billController.getBillById);

//Export API routes
module.exports = router;
