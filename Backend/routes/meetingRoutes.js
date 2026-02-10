const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  startMeeting,
  stopMeeting,
  generateMOM
} = require("../controllers/meetingController");

router.post("/start", authMiddleware, startMeeting);
router.delete("/stop/:meetingId", authMiddleware, stopMeeting);
router.get("/generate/:meetingId", authMiddleware, generateMOM);

module.exports = router;
