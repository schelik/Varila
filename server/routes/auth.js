const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

const {
    createUser,
    authenticateUser,
    getDoc,
} = require('../controller/auth');

router.route('/login').post(authenticateUser);
router.route('/signup').post(createUser);
router.route('/doc').get(authenticateJWT, getDoc);

module.exports = router;




