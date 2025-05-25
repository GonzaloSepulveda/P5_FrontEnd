import BotonCrearContacto from "../components/BotonCrearContacto.tsx";
import {PropsContact } from "../types.ts";



export default function ContactList({ contacts, chatId }: PropsContact) {
  return (
    <div class="contactos">
      <BotonCrearContacto />
      <h2>Contactos</h2>
      <ul>
        {contacts.map((c) => (
          <li
            onClick={() => {
              console.log("Seleccionado contacto ID:", c._id);
              chatId.value = c.chatId || "";
            }}
            key={c._id}
            style={{ cursor: "pointer" }}
          >
            <b>{c.name}</b><br />
            {c.email}<br />
            {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
