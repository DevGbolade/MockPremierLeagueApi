const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authController = require('../controllers/authController');

router
.route('/teams')
.get( teamController.viewAllTeams)
.post(
    authController.protect, 
    authController.restrictTo('admin'), 
    teamController.addTeams);

router
.route('/teams/:id')
.get(authController.protect, 
    teamController.viewOneTeam)
.patch(
    authController.protect,
    authController.restrictTo('admin'), 
    teamController.editTeam)
.delete(
    authController.protect,
    authController.restrictTo('admin'), 
    teamController.removeTeam);



module.exports = router;
