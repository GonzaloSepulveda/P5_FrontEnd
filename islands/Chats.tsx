import { useState, useEffect, useRef } from "preact/hooks";
import { Message, PropsChat } from "../types.ts";

// Obtener los mensajes
async function getMensajes(chatId: string): Promise<Message[]> {
  if (!chatId) return [];
  const response = await fetch("https://back-a-p4.onrender.com/messages/chat/" + chatId);
  const data = await response.json();
  return data.data;
}

// Enviar un mensaje
async function postMensajes(chatId: string, content: string): Promise<void> {
  await fetch("https://back-a-p4.onrender.com/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId,
      content,
    }),
  });
}

export default function Chats({ chatId }: PropsChat) {
  const [chat, setChat] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!chatId.value) return;
      try {
        const mensajes = await getMensajes(chatId.value);
        setChat(mensajes);
      } catch (_e) {
        console.error("Error al cargar mensajes");
      }
    };

    fetchData();
  }, [chatId.value]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      await postMensajes(chatId.value, inputValue);
      setInputValue("");
      const mensajes = await getMensajes(chatId.value);
      setChat(mensajes);
    } catch (_e) {
      console.error("Error al enviar mensaje");
    }
  };

  return (
    <div class="chats">
      <div class="messages">
        {chat.map((elem) => (
          <div
            key={elem._id}
            class={`message-row ${elem.isContactMessage ? "sent" : "received"}`}
          >
            <div class="message-bubble">
              {elem.content}
            </div>
          </div>
        ))}
        
      </div>

      <div class="chatbox">
        <form onSubmit={handleSubmit} class="chat-form">
          <input
            placeholder="Mensaje"
            value={inputValue}
            onInput={(e) =>
              setInputValue((e.target as HTMLInputElement).value)
            }
            class="chat-input"
          />
          <button type="submit" class="chat-submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
