const express = require("express");
const {
  sendEmails,
  saveEmailTemplate,
  getEmails,
  trackEmailClick,
} = require("../controllers/emailControllers");

const router = express.Router();

router.post("/send", sendEmails);
router.post("/save", saveEmailTemplate);
router.get("/", getEmails);
router.get("/track", trackEmailClick);

module.exports = router;
