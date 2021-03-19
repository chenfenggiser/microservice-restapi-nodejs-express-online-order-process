//initialize express routes
let router = require('express').Router();


let userController = require('./user_ctrls');

// user routes
router.route('/users')
    .get(userController.getUsers);

router.route('/user')
    .post(userController.createUser);

router.route('/user/:_id')
    .get(userController.getUserById)
    .delete(userController.deleteUser);

//Export API routes
module.exports = router;
