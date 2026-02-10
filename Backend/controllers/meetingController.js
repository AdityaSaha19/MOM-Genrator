const axios = require("axios");
const Meeting = require("../models/Meeting");
const { GoogleGenerativeAI } = require("@google/generative-ai");


const VEXA_BASE = "https://api.cloud.vexa.ai";

function extractMeetingId(link) {
  return link.split("/").pop();
}

exports.startMeeting = async (req, res) => {
  const meetingId = extractMeetingId(req.body.meetLink);

  await axios.post(`${VEXA_BASE}/bots`, {
    platform: "google_meet",
    native_meeting_id: meetingId,
    bot_name: "MOMBot"
  }, {
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.VEXA_API_KEY
    }
  });

  res.json({ meetingId });
};

exports.stopMeeting = async (req, res) => {
  await axios.delete(
    `${VEXA_BASE}/bots/google_meet/${req.params.meetingId}`,
    { headers: { "X-API-Key": process.env.VEXA_API_KEY } }
  );

  res.json({ msg: "Stopped" });
};


const OpenAI = require("openai");

exports.generateMOM = async (req, res) => {
  try {
    const meetingId = req.params.meetingId;

    const transcriptRes = await axios.get(
  `${VEXA_BASE}/transcripts/google_meet/${meetingId}`,
  { headers: { "X-API-Key": process.env.VEXA_API_KEY } }
);

// FIXED HERE 👇
const transcript = JSON.stringify(transcriptRes.data);


    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1"
    });

    const completion = await client.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "system",
      content: "Generate professional Minutes of Meeting in structured format"
    },
    {
      role: "user",
      content: transcript
    }
  ]
});


    const mom = completion.choices[0].message.content;

    await Meeting.create({
      meetingId,
      transcript,
      mom
    });

    res.json({ mom });

  } catch (error) {
    console.error("Generate MOM Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};





