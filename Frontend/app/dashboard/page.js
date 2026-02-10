"use client";

import { useState } from "react";
import axios from "../../utils/axios";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  const [link, setLink] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [mom, setMom] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const startMeeting = async () => {
    try {
      setStatus("Starting transcription...");
      const res = await axios.post("/meeting/start", {
        meetLink: link,
      });
      setMeetingId(res.data.meetingId);
      setStatus("Transcription started successfully ✅");
    } catch (error) {
      setStatus("Failed to start transcription ❌");
    }
  };

  const stopMeeting = async () => {
    try {
      setStatus("Stopping transcription...");
      await axios.delete(`/meeting/stop/${meetingId}`);
      setStatus("Transcription stopped ⏹");
    } catch (error) {
      setStatus("Failed to stop transcription ❌");
    }
  };

  const generateMOM = async () => {
    try {
      setLoading(true);
      setStatus("Generating MOM using AI...");
      const res = await axios.get(
        `/meeting/generate/${meetingId}`
      );
      setMom(res.data.mom);
      setStatus("MOM generated successfully 🎉");
    } catch (error) {
      setStatus("Failed to generate MOM ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">
              AI Meeting Assistant
            </h1>
            <p className="text-gray-500 mt-3">
              Convert Google Meet conversations into structured
              Minutes of Meeting instantly.
            </p>
          </div>

          {/* Status Message */}
          {status && (
            <div className="mb-6 text-center text-sm font-medium text-indigo-600">
              {status}
            </div>
          )}

          {/* Input Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">

            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Google Meet Link
            </label>

            <input
              className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-3 rounded-lg mb-6 transition"
              placeholder="https://meet.google.com/abc-defg-hij"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <div className="flex flex-wrap gap-4">

              <button
                onClick={startMeeting}
                disabled={!link}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition"
              >
                ▶ Start Transcription
              </button>

              <button
                onClick={stopMeeting}
                disabled={!meetingId}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition"
              >
                ⏹ Stop
              </button>

              <button
                onClick={generateMOM}
                disabled={!meetingId || loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition"
              >
                {loading ? "Generating..." : "✨ Generate MOM"}
              </button>

            </div>
          </div>

          {/* Output Card */}
          {mom && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-indigo-600">
                📄 Generated Minutes of Meeting
              </h2>

              <div className="bg-gray-100 p-6 rounded-lg whitespace-pre-wrap text-gray-700 leading-relaxed text-sm">
                {mom}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
