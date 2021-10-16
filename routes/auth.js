const router = require('express').Router();
const { login} = require('../controllers/authController');

//auth
router.post('/login', login);


module.exports = router;
