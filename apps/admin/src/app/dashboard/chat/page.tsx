"use client";

import { useState } from "react";

type Message = {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  buyer: string;
  company: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
};

const conversations: Conversation[] = [
  {
    id: "c1",
    buyer: "Ravi Sharma",
    company: "Blue Leaf Roasters",
    lastMessage: "Can you send the quality certificate?",
    time: "2m ago",
    unread: 2,
    messages: [
      { id: 1, from: "them", text: "Hi, I'm interested in your Assam Orthodox Black Tea. Do you have stock available?", time: "10:15 AM" },
      { id: 2, from: "me", text: "Yes, we have 500 kg available. Current batch is from March 2025 flush.", time: "10:18 AM" },
      { id: 3, from: "them", text: "Great! What's the minimum order quantity?", time: "10:20 AM" },
      { id: 4, from: "me", text: "MOQ is 50 kg. We can arrange delivery within 5–7 days.", time: "10:22 AM" },
      { id: 5, from: "them", text: "Can you send the quality certificate?", time: "10:45 AM" },
    ],
  },
  {
    id: "c2",
    buyer: "Priya Mehta",
    company: "Mehtabrands Pvt Ltd",
    lastMessage: "We'll go ahead with 50kg. Please confirm.",
    time: "1h ago",
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "Hello! We need Darjeeling First Flush urgently. Any availability this week?", time: "9:00 AM" },
      { id: 2, from: "me", text: "We have 200 kg available. Can ship by Thursday.", time: "9:10 AM" },
      { id: 3, from: "them", text: "Perfect. Price per kg?", time: "9:12 AM" },
      { id: 4, from: "me", text: "₹890/kg, standard pricing. Bulk discount applies above 100 kg.", time: "9:15 AM" },
      { id: 5, from: "them", text: "We'll go ahead with 50kg. Please confirm.", time: "9:30 AM" },
    ],
  },
  {
    id: "c3",
    buyer: "Cafe De Lune",
    company: "Cafe De Lune",
    lastMessage: "Thank you! Order confirmed.",
    time: "3h ago",
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "Do you supply Robusta Green Coffee Beans?", time: "Yesterday" },
      { id: 2, from: "me", text: "Yes! From Coorg. Grade A, washed process. ₹185/kg.", time: "Yesterday" },
      { id: 3, from: "them", text: "Can we get a 200kg trial order?", time: "Yesterday" },
      { id: 4, from: "me", text: "Absolutely. I'll raise a pro-forma invoice.", time: "Yesterday" },
      { id: 5, from: "them", text: "Thank you! Order confirmed.", time: "Yesterday" },
    ],
  },
  {
    id: "c4",
    buyer: "Amit Jain",
    company: "Jain Spice House",
    lastMessage: "Any organic certifications available?",
    time: "Yesterday",
    unread: 1,
    messages: [
      { id: 1, from: "them", text: "Hi, we're looking for bulk turmeric. Do you have organic?", time: "Yesterday" },
      { id: 2, from: "me", text: "Yes, we have certified organic turmeric fingers from Erode.", time: "Yesterday" },
      { id: 3, from: "them", text: "Any organic certifications available?", time: "Yesterday" },
    ],
  },
];

export default function ChatPage() {
  const [activeConvo, setActiveConvo] = useState<Conversation>(conversations[0]);
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-[calc(100vh-52px)]">
      {/* Conversation list */}
      <div className="w-72 shrink-0 border-r border-neutral-200 bg-white flex flex-col">
        <div className="px-4 py-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-900">Messages</h2>
          <div className="mt-3 relative">
            <svg className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search buyers..."
              className="w-full rounded-lg border border-neutral-200 pl-8 pr-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setActiveConvo(convo)}
              className={`w-full text-left px-4 py-3.5 border-b border-neutral-50 hover:bg-neutral-50 transition-colors ${
                activeConvo.id === convo.id ? "bg-neutral-50" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center shrink-0 text-xs font-medium text-neutral-600">
                    {convo.buyer.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{convo.buyer}</p>
                    <p className="text-xs text-neutral-400 truncate">{convo.company}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className="text-xs text-neutral-400">{convo.time}</span>
                  {convo.unread > 0 && (
                    <span className="h-4 w-4 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center">
                      {convo.unread}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-1.5 ml-10 truncate">{convo.lastMessage}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-neutral-50">
        {/* Chat header */}
        <div className="px-6 py-4 border-b border-neutral-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium text-neutral-600">
              {activeConvo.buyer.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">{activeConvo.buyer}</p>
              <p className="text-xs text-neutral-500">{activeConvo.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs text-neutral-600 border border-neutral-200 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
              View Profile
            </button>
            <button className="text-xs text-neutral-600 border border-neutral-200 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
              View Orders
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {activeConvo.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[60%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === "me"
                    ? "bg-neutral-900 text-white rounded-tr-sm"
                    : "bg-white border border-neutral-200 text-neutral-800 rounded-tl-sm"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.from === "me" ? "text-neutral-400" : "text-neutral-400"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-white">
          <div className="flex items-end gap-3">
            <div className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 focus-within:ring-2 focus-within:ring-neutral-900 focus-within:border-transparent transition-all">
              <textarea
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    setMessage("");
                  }
                }}
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <button
                onClick={() => setMessage("")}
                className="bg-neutral-900 text-white p-2 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
