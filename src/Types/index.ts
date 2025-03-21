export type Connection = {
  id: string;
  name: string;
  contacts: Contact[];
};

export type Contact = {
  id: string;
  name: string;
  phone: string;
  connectionId: string;
};

export type Message = {
  id: string;
  text: string;
  status: "agendada" | "enviada";
  scheduledAt: Date;
  contacts: Contact[];
};
