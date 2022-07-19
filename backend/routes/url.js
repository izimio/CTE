const express = require('express')
const router = express.Router()
const urlCtrl = require('../controllers/url')

router.get('/', urlCtrl.getAllUrl)
router.post('/:url', urlCtrl.getUrl)
router.post('/check/pwsd', urlCtrl.checkPswd)
router.get('/check/:url', urlCtrl.checkUrl)
router.post('/add', urlCtrl.createUrl)
router.put('/pswd', urlCtrl.modifyPassword)
router.put('/cnt', urlCtrl.modifyContent)
router.delete('/delete', urlCtrl.deleteUrl)

module.exports = router;
