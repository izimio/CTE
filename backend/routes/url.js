const express = require("express");
const router = express.Router();
const urlCtrl = require("../controllers/url");

router.get("/", urlCtrl.getAllUrl);
router.post("/add", urlCtrl.createUrl);
router.get("/ressource/", urlCtrl.getUrl);
router.post("/check/pwsd", urlCtrl.checkPswd);
router.get("/check/:url", urlCtrl.checkUrl);
router.put("/pswd", urlCtrl.modifyPassword);
router.put("/save", urlCtrl.modifyContent);
router.delete("/delete", urlCtrl.deleteUrl);

module.exports = router;
