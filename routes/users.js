const express = require('express');
const router = express.Router();
const {requireAuth , checkUser , adminAuth} = require('../config/authentication')

const authcontroller = require('../controllers/users_controller');



console.log('something happend');
//router.get('./profiles', usersController.profiles);
router.get('/signup',authcontroller.signup_get);
router.post('/signup',authcontroller.signup_post);
router.get('/login',authcontroller.login_get);
router.post('/login',authcontroller.login_post);
router.get('/logout',authcontroller.logout_get);
router.get('/topic',authcontroller.topic_get);
router.get('/addquestion',checkUser,requireAuth,authcontroller.question_get);
router.post('/addquestion',checkUser,requireAuth,authcontroller.question_post);
router.get('/addexperience',authcontroller.addexperience_get);
router.post('/addexperience',authcontroller.addexperience_post);

module.exports = router ; 


