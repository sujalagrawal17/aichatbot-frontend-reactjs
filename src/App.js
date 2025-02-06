import React from "react";
import { ChatProvider } from "./context/ChatContext";
import Chatbot from "./components/Chatbot";
import { Container } from "@mui/material";

function App() {
  return (
    <ChatProvider>
      <Container>
        <Chatbot />
      </Container>
    </ChatProvider>
  );
}

export default App;
