import { Signal } from "@preact/signals";




export type Contact = {
  _id:string;
  name: string;
  email: string;
  phone: string;
  chatId:string
};

export type Data = {
  contacts: Contact[];
  
};
export type DataChat = {
    contacts: Contact[];
    chats:ChatData[];
}
export type contact = {
    chatId:string
}
export type Message = {
  _id: string;
  chatId: string;
  content: string;
  isContactMessage: boolean;
};
export type Chat = {
    data:ChatData[]
}
export type ChatData = {
    content:string
}
export type PropsChat = {
  chatId: Signal<string>;
};
export type PropsContact = {
  contacts: Contact[];
  chatId: Signal<string>; // <- ADD THIS
};