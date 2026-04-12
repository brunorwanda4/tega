"use client";

import { Phone, Send, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
};

type Chat = {
  id: number;
  name: string;
  avatar: string;
  messages: Message[];
};

const initialChats: Chat[] = [
  {
    id: 1,
    name: "Andy M",
    avatar: "https://i.pravatar.cc/150?u=500",
    messages: [
      {
        id: 1,
        text: "Hello, We have received your booking Successfully",
        sender: "me",
        time: "08:04 pm",
      },
      {
        id: 2,
        text: "Thanks FYI, but i have one more question!",
        sender: "other",
        time: "08:05 pm",
      },
    ],
  },
  {
    id: 2,
    name: "Alex Mugabe",
    avatar: "https://i.pravatar.cc/150?u=504",
    messages: [
      {
        id: 1,
        text: "Hey there!",
        sender: "other",
        time: "07:30 pm",
      },
    ],
  },
  {
    id: 3,
    name: "Mugisha Rwanda",
    avatar: "https://i.pravatar.cc/150?u=505",
    messages: [
      {
        id: 1,
        text: "Hey there!",
        sender: "other",
        time: "07:30 pm",
      },
    ],
  },
  {
    id: 4,
    name: "Bruno Kabaka",
    avatar: "https://i.pravatar.cc/150?u=506",
    messages: [
      {
        id: 1,
        text: "Hey there!",
        sender: "other",
        time: "07:30 pm",
      },
    ],
  },
];

const CommunicationPage = () => {
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [message, setMessage] = useState("");

  const selectedChat = chats.find((c) => c.id === selectedChatId)!;

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat,
      ),
    );

    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] -mx-8 -mt-4 ">
      {/* LEFT PANEL */}
      <div className="w-[320px] border-r p-4 flex flex-col gap-4 bg-base-100">
        {/* SEARCH */}
        <Input placeholder="Search a driver or client" />

        {/* ACCOUNTS */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <p className="font-medium">Accounts</p>
            <span className="text-muted-foreground cursor-pointer text-xs">
              See all
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {chats.map((chat) => (
              <div key={chat.id} className=" flex flex-col items-center">
                <Avatar
                  key={chat.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <span
                  title={chat.name}
                  className="text-sm line-clamp-1 max-w-12"
                >
                  {chat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className=" my-2">
          <h3 className=" font-medium text-xl">Charts</h3>
        </div>
        {/* CHAT LIST */}
        <div className="flex-1 overflow-y-auto space-y-2 divide-y">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                selectedChatId === chat.id
                  ? "bg-black text-white"
                  : "hover:bg-muted"
              }`}
            >
              <Avatar>
                <AvatarImage src={chat.avatar} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className="text-sm font-medium">{chat.name}</p>
                <p className="text-xs opacity-70 truncate max-w-32">
                  {chat.messages[chat.messages.length - 1]?.text}
                </p>
              </div>

              <p className="text-xs">
                {chat.messages[chat.messages.length - 1]?.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CHAT */}
      <div className="flex-1 flex flex-col bg-base-100">
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedChat.avatar} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{selectedChat.name}</p>
              <p className="text-xs text-blue-500">Online</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Phone className="cursor-pointer" />
            <Video className="cursor-pointer" />
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedChat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div>
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[300px] ${
                    msg.sender === "me" ? "bg-black text-white" : "bg-muted"
                  }`}
                >
                  {msg.text}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Type a message ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPage;
