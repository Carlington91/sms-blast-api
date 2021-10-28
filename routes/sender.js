const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  create,
  list,
  read,
  update,
  remove,
} = require('../controllers/senderController');
//auth
router.use(auth);

router.post('/', create);
router.get('/', list);
router.get('/', read);
router.put('/', update);
router.delete('/', remove);

module.exports = router;
