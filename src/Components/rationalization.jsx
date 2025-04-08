import React, { useState, useEffect } from "react";
import Groq from "groq-sdk";
import "../Styles/rationalization.css";
import assistantSpec from "../Components/assistant.js";
import jackpotjack from "../Visuals/jackpotjack.png";


console.log("Assistant Purpose:", assistantSpec.purpose); // for dev/debug

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
  
});

const Rationalization = () => {
  const [chatCompletion, setChatCompletion] = useState(""); // State for chat response
  const [userMessage, setUserMessage] = useState(""); // State for user input
  const [conversation, setConversation] = useState([]); // Conversation history

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

      // Get chatbot response
      const chatResponse = await getGroqChatCompletion(userMessage);
      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "assistant", content: chatResponse },
      ]);

      // Clear user message input
      setUserMessage("");
    }
  };

  return (
    <div className="rationalization-page">
      <div className="chat-layout">
        <img src={jackpotjack} alt="Jackpot Jack" className="chat-jack-image" />
        <div className="chat-content">
          <h1>Rationalization in Gambling Chatbot</h1>
          <div className="chat-box">
            {conversation.map((message, index) => (
              <div key={index} className={message.role === 'user' ? 'user' : 'assistant'}>
                <p><strong>{message.role === 'user' ? "You:" : "Jackpot Jack:"}</strong> {message.content}</p>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={userMessage}
              onChange={handleUserInput}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rationalization;