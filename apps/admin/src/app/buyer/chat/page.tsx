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
  seller: string;
  farm: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
};

const conversations: Conversation[] = [
  {
    id: "c1",
    seller: "Ravi Kumar",
    farm: "Brahmaputra Estates",
    lastMessage: "Yes, we can ship by Thursday.",
    time: "2m ago",
    unread: 1,
    messages: [
      { id: 1, from: "me", text: "Hi, I'm interested in your Assam Orthodox Black Tea. Do you have 100kg available?", time: "10:15 AM" },
      { id: 2, from: "them", text: "Hello! Yes, we have 500 kg in stock from our March 2025 batch. Great quality.", time: "10:18 AM" },
      { id: 3, from: "me", text: "What's the price per kg and earliest delivery date?", time: "10:20 AM" },
      { id: 4, from: "them", text: "₹320/kg. We can ship by Thursday for delivery within 5–7 working days.", time: "10:22 AM" },
      { id: 5, from: "them", text: "Yes, we can ship by Thursday.", time: "10:45 AM" },
    ],
  },
  {
    id: "c2",
    seller: "Deepika Singh",
    farm: "Hill Top Growers",
    lastMessage: "I'll send you the quality report now.",
    time: "45m ago",
    unread: 0,
    messages: [
      { id: 1, from: "me", text: "Do you have Darjeeling First Flush available for bulk purchase?", time: "9:00 AM" },
      { id: 2, from: "them", text: "Yes! We have 200 kg available. This season's flush is exceptional.", time: "9:05 AM" },
      { id: 3, from: "me", text: "Can you share a quality report or lab test results?", time: "9:08 AM" },
      { id: 4, from: "them", text: "I'll send you the quality report now.", time: "9:10 AM" },
    ],
  },
  {
    id: "c3",
    seller: "Mohan Nair",
    farm: "Coorg Coffee Estate",
    lastMessage: "The order has been dispatched today.",
    time: "2h ago",
    unread: 0,
    messages: [
      { id: 1, from: "me", text: "Can you confirm when the Robusta beans will be dispatched?", time: "Yesterday" },
      { id: 2, from: "them", text: "We're packing them today. Should dispatch by end of day.", time: "Yesterday" },
      { id: 3, from: "me", text: "Perfect, please share the tracking details once dispatched.", time: "Yesterday" },
      { id: 4, from: "them", text: "The order has been dispatched today.", time: "2h ago" },
    ],
  },
  {
    id: "c4",
    seller: "Suresh Pillai",
    farm: "Jain Spice Co.",
    lastMessage: "Thank you for the order! Will process it shortly.",
    time: "Yesterday",
    unread: 0,
    messages: [
      { id: 1, from: "me", text: "Hi, I'd like to place a bulk order for organic turmeric fingers.", time: "Yesterday" },
      { id: 2, from: "them", text: "Great! How much quantity do you need?", time: "Yesterday" },
      { id: 3, from: "me", text: "500 kg to start. What's the lead time?", time: "Yesterday" },
      { id: 4, from: "them", text: "Thank you for the order! Will process it shortly.", time: "Yesterday" },
    ],
  },
];

export default function BuyerChatPage() {
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
              placeholder="Search sellers..."
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
                    {convo.seller.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{convo.seller}</p>
                    <p className="text-xs text-neutral-400 truncate">{convo.farm}</p>
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
              {activeConvo.seller.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">{activeConvo.seller}</p>
              <p className="text-xs text-neutral-500">{activeConvo.farm}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/buyer/orders"
              className="text-xs text-neutral-600 border border-neutral-200 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              View My Orders
            </a>
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
                <p className="text-xs mt-1 text-neutral-400">{msg.time}</p>
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
