const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();

router
.post('/auth/signup', authController.singup)
.post('/auth/signin', authController.login);





module.exports = router;