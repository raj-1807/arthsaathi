import { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { getAgentResponse } from "../engine/router";
import { Send, Bot, User } from "lucide-react";
import AgentBadge from "../components/AgentBadge";

export default function Chat() {
  const { user } = useUser();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Namaste ${user?.name}! I'm SaathiBot. Ask me about savings, loans, investments, scams, or government schemes.`,
      agent: "greeting",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const { text, agent } = getAgentResponse(input, user);
    const botMsg = { sender: "bot", text, agent };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-2xl mx-auto">
      <div
        className="flex-1 p-4 space-y-3 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 140px)" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Bot size={15} className="text-emerald-600" />
              </span>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                msg.sender === "user"
                  ? "bg-emerald-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700"
              }`}
            >
              {msg.sender === "bot" &&
                msg.agent &&
                msg.agent !== "fallback" && (
                  <div className="mb-1">
                    <AgentBadge name={msg.agent} />
                  </div>
                )}
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <User size={15} className="text-gray-600" />
              </span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-gray-200 bg-white flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about savings, loans, scams..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={handleSend}
          className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
