import { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { getAgentResponse, analyzeScamRisk } from "../engine/router";
import { Send, Bot, User, ShieldAlert, MessageSquare } from "lucide-react";
import AgentBadge from "../components/AgentBadge";

const LEVEL_STYLES = {
  low: {
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  medium: {
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  high: { color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
};

export default function Chat() {
  const { user } = useUser();
  const [mode, setMode] = useState("chat"); // 'chat' | 'scam'
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Namaste ${user?.name}! I'm SaathiBot. Ask me about savings, loans, investments, scams, or government schemes.`,
      agent: "greeting",
    },
  ]);
  const [input, setInput] = useState("");
  const [scamText, setScamText] = useState("");
  const [scamResult, setScamResult] = useState(null);
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

  const handleScamCheck = () => {
    if (!scamText.trim()) return;
    setScamResult(analyzeScamRisk(scamText));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-2xl mx-auto">
      <div className="flex gap-2 p-3 border-b border-gray-200 bg-white">
        <button
          onClick={() => setMode("chat")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium ${
            mode === "chat"
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <MessageSquare size={15} /> SaathiBot
        </button>
        <button
          onClick={() => setMode("scam")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium ${
            mode === "scam"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <ShieldAlert size={15} /> ScamAlert Checker
        </button>
      </div>

      {mode === "chat" && (
        <>
          <div
            className="flex-1 p-4 space-y-3 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }}
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
        </>
      )}

      {mode === "scam" && (
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600">
            Paste a suspicious SMS, WhatsApp message, or call summary below, and
            I'll check it for common scam patterns.
          </p>
          <textarea
            value={scamText}
            onChange={(e) => setScamText(e.target.value)}
            rows={4}
            placeholder="e.g. Your KYC is pending, click this link to verify immediately or your account will be blocked..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleScamCheck}
            className="w-full bg-red-600 text-white rounded-lg py-2 font-medium"
          >
            Check for Scam Risk
          </button>

          {scamResult && (
            <div
              className={`rounded-xl border p-4 ${LEVEL_STYLES[scamResult.level].bg} ${LEVEL_STYLES[scamResult.level].border}`}
            >
              <p
                className={`font-semibold capitalize ${LEVEL_STYLES[scamResult.level].color}`}
              >
                {scamResult.level} risk ({scamResult.score}/100)
              </p>
              {scamResult.reasons.length > 0 ? (
                <ul className="text-sm text-gray-700 mt-2 space-y-1 list-disc list-inside">
                  {scamResult.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600 mt-2">
                  No obvious scam patterns detected, but always stay cautious
                  with unknown senders.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
