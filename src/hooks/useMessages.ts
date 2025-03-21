import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { dbFirestore } from "../firebase";
import { Contact } from "../Types";

type Message = {
  id: string;
  text: string;
  status: "agendada" | "enviada";
  scheduledAt: Date;
  contacts: Contact[];
};

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(dbFirestore, "Messages"));
      const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        scheduledAt: doc.data().scheduledAt.toDate(),
      })) as Message[];
      setMessages(messagesData);
    };

    fetchMessages();
  }, []);

  const addMessage = async (message: Omit<Message, "id">) => {
    const docRef = await addDoc(collection(dbFirestore, "Messages"), message);
    setMessages((prev) => [...prev, { id: docRef.id, ...message }]);
  };

  const updateMessageStatus = async (
    id: string,
    status: "agendada" | "enviada"
  ) => {
    await updateDoc(doc(dbFirestore, "Messages", id), { status });
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
    );
  };

  return {
    messages,
    addMessage,
    updateMessageStatus,
  };
};

export default useMessages;
