const router = require('express').Router();
const {
  createPresetMessage,
  presetMessages,
  presetMessage,
  update,
  removePresetMessage,
  sendGroupMessage,
} = require('../controllers/messageController');

router.post('/create-preset-message', createPresetMessage);
router.get('/preset-messages', presetMessages);
router.get('/preset-message', presetMessage);
router.put('/preset-message', update);
router.delete('/preset-message', removePresetMessage);

//group message
router.post('/send-group-message', sendGroupMessage);

module.exports = router;
