"use client";
import React, { useEffect, useState } from "react";

export default function MessagesSection() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/message");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-center">Loading messages...</p>;
  }

  return (
    <div className="white-border rounded-2xl overflow-auto max-h-[90vh] p-4 ">
      <h3 className="text-lg font-semibold mb-4">Messages</h3>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full text-left table-auto">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-wide">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Budget</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr
                key={msg._id}
                className="border-t border-gray-700 hover:bg-gray-700/40 transition-colors cursor-pointer"
                onClick={() => setSelectedMessage(msg)}
              >
                <td className="px-3 py-3">{index + 1}</td>
                <td className="px-3 py-3">{msg.name}</td>
                <td className="px-3 py-3">{msg.email}</td>
                <td className="px-3 py-3">{msg.phone}</td>
                <td className="px-3 py-3">{msg.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {messages.map((msg, index) => (
          <div
            key={msg._id}
            className="bg-gray-700 p-4 rounded-lg shadow hover:bg-gray-700/80 transition-colors cursor-pointer"
            onClick={() => setSelectedMessage(msg)}
          >
            <p><strong>#{index + 1}</strong></p>
            <p><strong>Name:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Phone:</strong> {msg.phone}</p>
            <p><strong>Budget:</strong> {msg.budget}</p>
          </div>
        ))}
      </div>

      {/* Popup for message details */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setSelectedMessage(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-2">{selectedMessage.name}</h2>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Phone:</strong> {selectedMessage.phone}</p>
            <p><strong>Budget:</strong> {selectedMessage.budget}</p>
            <p><strong>Description:</strong> {selectedMessage.description}</p>
            <p><strong>Urgent:</strong> {selectedMessage.urgent ? "Yes" : "No"}</p>
            <p className="text-gray-400 mt-2 text-sm">
              Created: {new Date(selectedMessage.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
