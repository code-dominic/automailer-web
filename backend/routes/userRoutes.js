const express = require('express');
const {userLogin , userRegister} = require('../controllers/userControllers');



const router = express.Router();



router.post('/register', userLogin);
router.post('/login' , userRegister);


module.exports = router;