import { signal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import Chats from "../islands/Chats.tsx";
import ContactList from "../islands/ContactList.tsx";
import { Data } from "../types.ts";

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const res = await fetch("https://back-a-p4.onrender.com/contacts");
    const json = await res.json();
    return ctx.render({ contacts: json.data });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const chatId = signal<string>(""); 

  return (
    <div class="layout">
      <ContactList contacts={data.contacts} chatId={chatId} /> 
      <Chats chatId={chatId} />
    </div>
  );
}
