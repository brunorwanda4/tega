"use client";

import { Phone, Search, Send, Video, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
};

type Chat = {
  id: number;
  name: string;
  role: "Client" | "Driver";
  status: "Online" | "Away";
  unread: number;
  avatar: string;
  messages: Message[];
};

const initialChats: Chat[] = [
  {
    id: 1,
    name: "Andy M",
    role: "Client",
    status: "Online",
    unread: 1,
    avatar: "https://i.pravatar.cc/150?u=500",
    messages: [
      {
        id: 1,
        text: "Hello, we have received your booking successfully.",
        sender: "me",
        time: "08:04 pm",
      },
      {
        id: 2,
        text: "Thanks FYI, but I have one more question!",
        sender: "other",
        time: "08:05 pm",
      },
    ],
  },
  {
    id: 2,
    name: "Alex Mugabe",
    role: "Driver",
    status: "Online",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?u=504",
    messages: [
      {
        id: 1,
        text: "I am at Nyabugogo and ready for the next trip.",
        sender: "other",
        time: "07:30 pm",
      },
    ],
  },
  {
    id: 3,
    name: "Mugisha Rwanda",
    role: "Client",
    status: "Away",
    unread: 2,
    avatar: "https://i.pravatar.cc/150?u=505",
    messages: [
      {
        id: 1,
        text: "Can I change my departure time to 2:30 PM?",
        sender: "other",
        time: "06:48 pm",
      },
    ],
  },
  {
    id: 4,
    name: "Bruno Kabaka",
    role: "Driver",
    status: "Away",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?u=506",
    messages: [
      {
        id: 1,
        text: "The vehicle has been cleaned and inspected.",
        sender: "other",
        time: "05:20 pm",
      },
    ],
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getLastMessage = (chat: Chat) =>
  chat.messages.at(-1) ?? {
    id: 0,
    text: "No messages yet",
    sender: "other" as const,
    time: "",
  };

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const CommunicationPage = () => {
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(initialChats[0].id);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat =
    chats.find((chat) => chat.id === selectedChatId) ?? chats[0];

  const filteredChats = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return chats;

    return chats.filter((chat) =>
      [
        chat.name,
        chat.role,
        chat.status,
        getLastMessage(chat).text,
        getLastMessage(chat).time,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [chats, searchQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const selectChat = (chatId: number) => {
    setSelectedChatId(chatId);
    setChats((current) =>
      current.map((chat) =>
        chat.id === chatId ? { ...chat, unread: 0 } : chat,
      ),
    );
  };

  const appendMessage = (text: string) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    const newMessage: Message = {
      id: Date.now(),
      text: cleanText,
      sender: "me",
      time: getCurrentTime(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat,
      ),
    );
  };

  const handleSend = () => {
    appendMessage(message);
    setMessage("");
  };

  const handleContactAction = (type: "phone" | "video") => {
    appendMessage(
      type === "phone"
        ? `Started a voice call with ${selectedChat.name}.`
        : `Started a video call with ${selectedChat.name}.`,
    );
  };

  return (
    <div className="flex h-[calc(100svh-7rem)] min-h-[620px] flex-col overflow-hidden rounded-xl border bg-base-100 shadow-sm lg:flex-row">
      {/* LEFT PANEL */}
      <aside className="flex max-h-[42svh] w-full flex-col border-b bg-base-100 lg:max-h-none lg:w-[340px] lg:border-r lg:border-b-0">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-xl">Messages</h2>
              <p className="text-muted-foreground text-xs">
                {chats.length} conversations
              </p>
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X />
              </Button>
            )}
          </div>

          <div className="relative">
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search a driver or client"
              className="h-11 pl-10"
            />
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="mb-2 flex justify-between text-sm">
            <p className="font-medium">Accounts</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="cursor-pointer text-muted-foreground text-xs hover:text-base-content"
            >
              See all
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {filteredChats.map((chat) => (
              <button
                type="button"
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className="flex w-16 shrink-0 flex-col items-center gap-1 rounded-md p-1 text-center hover:bg-muted"
              >
                <Avatar
                  className={cn(
                    "size-10",
                    selectedChatId === chat.id && "ring-2 ring-primary",
                  )}
                >
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{getInitials(chat.name)}</AvatarFallback>
                </Avatar>
                <span className="line-clamp-1 w-full text-xs">{chat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CHAT LIST */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
          <div className="flex flex-col gap-2">
            {filteredChats.map((chat) => {
              const lastMessage = getLastMessage(chat);

              return (
                <button
                  type="button"
                  key={chat.id}
                  onClick={() => selectChat(chat.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                    selectedChatId === chat.id
                      ? "bg-base-content text-base-100"
                      : "hover:bg-muted",
                  )}
                >
                  <Avatar className="size-10">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>{getInitials(chat.name)}</AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-sm">
                        {chat.name}
                      </p>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px]",
                          selectedChatId === chat.id
                            ? "bg-base-100/15"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {chat.role}
                      </span>
                    </div>
                    <p className="truncate text-xs opacity-70">
                      {lastMessage.text}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-[10px] opacity-70">
                      {lastMessage.time}
                    </span>
                    {chat.unread > 0 && (
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-content">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

            {filteredChats.length === 0 && (
              <div className="rounded-lg border border-dashed p-6 text-center">
                <p className="font-medium text-sm">No conversations found</p>
                <p className="mt-1 text-muted-foreground text-xs">
                  Try searching another name or message.
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* RIGHT CHAT */}
      <section className="flex min-h-0 flex-1 flex-col bg-base-100">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-3 border-b p-4">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
              <AvatarFallback>{getInitials(selectedChat.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-medium">{selectedChat.name}</p>
              <p className="text-muted-foreground text-xs">
                {selectedChat.role} • {selectedChat.status}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleContactAction("phone")}
              aria-label="Start voice call"
            >
              <Phone />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleContactAction("video")}
              aria-label="Start video call"
            >
              <Video />
            </Button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-base-200/40 p-4 sm:p-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {selectedChat.messages.map((msg) => {
              const isMine = msg.sender === "me";

              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    isMine ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "flex max-w-[82vw] flex-col gap-1 sm:max-w-[70%]",
                      isMine ? "items-end" : "items-start",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm",
                        isMine
                          ? "rounded-br-sm bg-base-content text-base-100"
                          : "rounded-bl-sm bg-base-100 text-base-content",
                      )}
                    >
                      {msg.text}
                    </div>
                    <p className="px-1 text-muted-foreground text-xs">
                      {msg.time}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* INPUT */}
        <div className="border-t bg-base-100 p-3 sm:p-4">
          <div className="mx-auto flex max-w-3xl gap-2">
            <Input
              placeholder={`Message ${selectedChat.name}`}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSend();
              }}
              className="h-11"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!message.trim()}
              aria-label="Send message"
              className="h-11 w-11 shrink-0"
            >
              <Send />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunicationPage;
