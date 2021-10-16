const router = require('express').Router();
const { create,list,read,update,remove } = require('../controllers/contactController');


router.post('/', create);
router.get('/', list);
router.get('/', read);
router.put('/', update);
router.delete('/', remove);

module.exports = router;