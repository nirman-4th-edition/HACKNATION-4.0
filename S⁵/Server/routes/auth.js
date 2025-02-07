const express = require('express');

const router = new express.Router();
const { createNewUser, loginUser, getUserDetails, updateUserDetails } = require('../controller/user-controller')

/**
 * @description This is for user-registration
 */
router.post('/register', (req, res) => { createNewUser(req, res) });


/**
 * @description This is for user-login
 */
router.post('/login', (req, res) => { loginUser(req, res) });


/**
 * @description This is for getting user information
 */
router.get('/user/:id', (req, res) => { getUserDetails(req, res) });

/**
 * @description This is for updating user information
 */
router.patch('/user/:id', (req, res) => { updateUserDetails(req, res) });


module.exports = router;
