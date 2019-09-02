const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();

router
.post('/signup', authController.singup)
.post('/signin', authController.login);





module.exports = router;