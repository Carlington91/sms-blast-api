const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  createPresetMessage,
  presetMessages,
  presetMessage,
  update,
  removePresetMessage,
  sendGroupMessage,
  sentMessages,
  sentMessage,
} = require('../controllers/messageController');

//auth
router.use(auth);
router.post('/create-preset-message', createPresetMessage);
router.get('/preset-messages', presetMessages);
router.get('/preset-message', presetMessage);
router.put('/preset-message', update);
router.delete('/preset-message', removePresetMessage);

//Group message
router.post('/send-group-message', sendGroupMessage);
router.get('/sent-messages', sentMessages);
router.get('/sent-messages/:id', sentMessage);

module.exports = router;
