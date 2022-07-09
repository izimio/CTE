const express = require('express')
const router = express.Router()
const actionCtrl = require('../controllers/url')

router.post('/add', actionCtrl.add)
router.put('/modify_base', actionCtrl.modify_base)
router.delete('/delete', actionCtrl.delete)
router.get('/', actionCtrl.getAllUrl)
router.get('/:url', actionCtrl.getUrl)

module.exports = router;
