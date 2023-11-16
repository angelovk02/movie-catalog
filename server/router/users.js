const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.get('/validateUsername',auth(), authController.checkExistingUsername);
router.get('/validateEmail',auth(), authController.checkExistingEmail);


router.get('/profile', auth(), authController.getProfileInfo);
router.put('/editProfile', auth(), authController.editProfileInfo);



module.exports = router