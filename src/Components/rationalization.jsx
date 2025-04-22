import React, { useState, useEffect, useRef } from "react";
import Groq from "groq-sdk";
import "../Styles/rationalization.css";
import assistantSpec from "../Components/assistant.js";
import jackpotjack from "../Visuals/jackpotjack.png";
import rationalisation from "../Visuals/rationalisation.png";

console.log("Assistant Purpose:", assistantSpec.purpose); // for dev/debug

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
  
});

const Rationalization = () => {
  const [chatCompletion, setChatCompletion] = useState(""); // State for chat response
  const [userMessage, setUserMessage] = useState(""); // State for user input
  const [conversation, setConversation] = useState([]); // Conversation history
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);

  // Fetch chat response when component mounts
  useEffect(() => {
    const main = async () => {
      try {
        const defaultMessage = "Explain rationalization in gambling in a simple way.";
        const completion = await getGroqChatCompletion(defaultMessage);
        setChatCompletion(completion); // Initial chat message
      } catch (error) {
        console.error("Error occurred while getting Groq chat completion:", error);
      }
    };
    main();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [conversation]);

  const getGroqChatCompletion = async (message) => {
    if (!groq) {
      throw new Error("Groq instance is not initialized.");
    }
    const response = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `${assistantSpec.purpose.join("\n")}\n\nPlease keep all answers ${assistantSpec.responseLength}.` 
        },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
    });
    return response.choices[0]?.message?.content || "No response from API";
  };

  // Handle user message input
  const handleUserInput = (event) => {
    setUserMessage(event.target.value);
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (userMessage.trim() !== "") {
      // Update conversation with user's message
      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "user", content: userMessage },
      ]);

      setIsTyping(true);
      const chatResponse = await getGroqChatCompletion(userMessage);
      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "assistant", content: chatResponse },
      ]);
      setIsTyping(false);

      // Clear user message input
      setUserMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="rationalization-page">
      <div className="chat-layout">
        <img src={rationalisation} alt="Rationalization" className="chat-rationalization-image" />
        <div className="chat-content">
          <h1>Convince Jack that he has rationalization bias.</h1>
          <div className="chat-box" ref={chatBoxRef}>
            {conversation.map((message, index) => (
              <div key={index} className={message.role === 'user' ? 'user' : 'assistant'}>
                <p><strong>{message.role === 'user' ? "You:" : "Jackpot Jack:"}</strong> {message.content}</p>
              </div>
            ))}
            {isTyping && (
              <div className="assistant typing-indicator">
                <p><strong>Jackpot Jack:</strong> <em>typing...</em></p>
              </div>
            )}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={userMessage}
              onChange={handleUserInput}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
        <img src={jackpotjack} alt="Jackpot Jack" className="chat-jack-image" />
      </div>
    </div>
  );
};

export default Rationalization;