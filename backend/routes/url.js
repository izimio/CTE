const express = require('express')
const router = express.Router()
const urlCtrl = require('../controllers/url')

router.post('/add', urlCtrl.createUrl)
router.put('/pswd', urlCtrl.modifyPassword)
router.put('/cnt', urlCtrl.modifyContent)
router.delete('/delete', urlCtrl.deleteUrl)
router.get('/', urlCtrl.getAllUrl)
router.get('/:url', urlCtrl.getUrl)

module.exports = router;
