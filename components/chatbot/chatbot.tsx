"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import BrandButton from "../shared/brand-components/brand-button";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
  const [bottomOffset, setBottomOffset] = useState("bottom-6");
  const [chatBottomOffset, setChatBottomOffset] = useState("bottom-20");
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  // Effetto per spostare il chatbot dopo 150px di scroll
  useEffect(() => {
    /*  if (isMobile) {
      setBottomOffset("bottom-16");
      setChatBottomOffset("bottom-24");
    } */
    const handleScroll = () => {
      if (window.scrollY > 150 && !isMobile) {
        setBottomOffset("bottom-16");
        setChatBottomOffset("bottom-24");
      } else {
        setBottomOffset("bottom-6");
        setChatBottomOffset("bottom-20");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);
    setMessage("");
    setIsLoading(true); // Evita il doppio invio

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setChat([...newChat, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Errore:", error);
      setChat([...newChat, { sender: "bot", text: "Errore nel rispondere" }]);
    } finally {
      setIsLoading(false); // Riattiva l'invio dopo la risposta
    }
  };

  // Funzione per inviare il messaggio con il tasto Invio
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      {/* Pulsante flottante per aprire la chat */}
      <BrandButton
        variant="tertiary"
        className={`fixed right-4 z-50 ${bottomOffset} flex size-14 items-center justify-center transition-all duration-300 hover:scale-110`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={26} />}
      </BrandButton>

      {/* Box della chat */}
      {isOpen && (
        <div
          className={`fixed right-6 z-40 ${chatBottomOffset} w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl transition-all duration-300`}
        >
          <h2 className="mb-2 flex gap-2 text-lg font-bold text-purple-600">
            <span>Chat Support </span>
          </h2>
          <div className="h-64 overflow-y-auto rounded-lg border p-2">
            {chat.map((msg, i) => (
              <div key={i} className="my-1 flex items-start gap-2">
                {/* Avatar per il bot */}
                {msg.sender === "bot" && (
                  <Image
                    src="/images/petitLogo.png"
                    alt="Bot"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <div
                  className={`rounded-md p-2 ${
                    msg.sender === "user"
                      ? "ml-auto bg-purple-200 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input e bottone invio */}
          <div className="mt-2 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress} // Ascolta il tasto "Enter"
              className="flex-1 rounded-lg border p-2 outline-none focus:ring focus:ring-purple-300"
              placeholder="Scrivi un messaggio..."
              disabled={isLoading} // Disabilita input mentre il bot risponde
            />
            <BrandButton
              loading={isLoading}
              onClick={() => sendMessage()}
              variant={isLoading ? "flat" : "primary"}
              className={`ml-2`}
              disabled={isLoading}
            >
              Invia
            </BrandButton>
          </div>
        </div>
      )}
    </div>
  );
}
