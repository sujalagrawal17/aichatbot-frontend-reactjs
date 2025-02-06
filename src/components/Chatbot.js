import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { ChatContext } from "../context/ChatContext";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const { messages, addMessage } = useContext(ChatContext);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    addMessage({ sender: "user", text: input });

    try {
      const response = await axios.post("http://localhost:5000/api/chat", { userQuery: input });
      addMessage({ sender: "bot", text: response.data.response });
    } catch (error) {
      addMessage({ sender: "bot", text: "Error fetching response. Try again later." });
    }

    setInput("");
  };

  return (
    <Box sx={{ width: "400px", mx: "auto", my: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Chatbot</Typography>
      <Paper sx={{ height: 300, overflowY: "auto", p: 2, mb: 2 }}>
        {messages.map((msg, index) => (
          <Typography 
            key={index} 
            align={msg.sender === "user" ? "right" : "left"} 
            sx={{ my: 1, p: 1, bgcolor: msg.sender === "user" ? "#1976d2" : "#e0e0e0", color: msg.sender === "user" ? "#fff" : "#000", borderRadius: 1 }}
          >
            {msg.text}
          </Typography>
        ))}
      </Paper>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button fullWidth variant="contained" sx={{ mt: 1 }} onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default Chatbot;
