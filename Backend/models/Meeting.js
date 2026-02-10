const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    meetingId: String,
    transcript: String,
    mom: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", meetingSchema);
