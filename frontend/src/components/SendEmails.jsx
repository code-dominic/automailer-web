import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SendEmails = () => {
  const [subject, setSubject] = useState(""); // State to hold the subject
  const [message, setMessage] = useState(""); // State to hold the message
  const [responseMessage, setResponseMessage] = useState(""); // Response from the server
  const [loading, setLoading] = useState(false); // Loading state

  const sendEmails = async () => {
    if (!subject.trim() || !message.trim()) {
      setResponseMessage("Subject and message cannot be empty.");
      return;
    }

    setLoading(true); // Start the loading state
    try {
      const response = await axios.post("http://localhost:5000/send-emails", {
        subject, // Pass the subject
        message, // Pass the message
      });
      setResponseMessage(response.data.message); // Show success message
    } catch (error) {
      console.error("Error sending emails:", error);
      setResponseMessage("Error sending emails. Please try again.");
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  return (
    <div
      style={{
        width: "40rem",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Send Emails</h2>

      <TextField
        label="Email Subject"
        variant="outlined"
        fullWidth
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />

      <TextField
        label="Email Message"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom: "1.5rem" }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={sendEmails}
        disabled={loading}
        style={{ marginBottom: "1rem" }}
      >
        {loading ? "Sending Emails..." : "Send Emails"}
      </Button>

      {responseMessage && (
        <p style={{ textAlign: "center", color: responseMessage.includes("Error") ? "red" : "green" }}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default SendEmails;
