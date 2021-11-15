const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  create,
  list,
  read,
  update,
  remove,
  createContactExcelCsv,
} = require('../controllers/contactController');

router.use(auth);
router.post('/', create);
router.get('/', list);
router.get('/:id', read);
router.put('/', update);
router.delete('/', remove);

router.post('/create-from-file-upload', createContactExcelCsv);

module.exports = router;
