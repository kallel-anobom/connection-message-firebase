import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbFirestore } from "../firebase";

type Contact = {
  id: string;
  name: string;
  phone: string;
  connectionId: string;
};

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const collectionContacts = "Contacts";

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(
        collection(dbFirestore, collectionContacts)
      );
      const contactsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Contact[];
      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

  const addContact = async (contact: Omit<Contact, "id">) => {
    const docRef = await addDoc(
      collection(dbFirestore, collectionContacts),
      contact
    );
    setContacts((prev) => [...prev, { id: docRef.id, ...contact }]);
  };

  const removeContact = async (id: string) => {
    await deleteDoc(doc(dbFirestore, collectionContacts, id));
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const getContactsByConnectionId = async (connectionId: string) => {
    const searchContacts = query(
      collection(dbFirestore, collectionContacts),
      where("connectionId", "==", connectionId)
    );
    const querySnapshot = await getDocs(searchContacts);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Contact[];
  };

  return {
    contacts,
    addContact,
    removeContact,
    getContactsByConnectionId,
  };
};

export default useContacts;
