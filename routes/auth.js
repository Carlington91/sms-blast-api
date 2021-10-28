const router = require('express').Router();
const {
  register,
  login,
  logout,
  isLoggedIn,
} = require('../controllers/authController');

router.get('/loggedIn', isLoggedIn);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);



module.exports = router;
