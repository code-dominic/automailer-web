const express = require("express");
const {
  sendEmails,
  saveEmailTemplate,
  getEmails,
  trackEmailClick,
  deleteData,
  getData
} = require("../controllers/emailControllers");

const router = express.Router();

router.post("/send", sendEmails);
router.post("/save", saveEmailTemplate);
router.get("/", getEmails);
router.get("/track-click", trackEmailClick);
router.get('/data' ,getData );
router.get('/delete' , deleteData);

module.exports = router;
