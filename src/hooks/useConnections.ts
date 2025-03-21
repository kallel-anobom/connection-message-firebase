import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbFirestore } from "../firebase";

type Connection = {
  id: string;
  name: string;
};

const useConnections = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const collectionConnections = "Connections";

  useEffect(() => {
    const fetchConnections = async () => {
      const querySnapshot = await getDocs(
        collection(dbFirestore, collectionConnections)
      );
      const connectionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Connection[];
      setConnections(connectionsData);
    };

    fetchConnections();
  }, []);

  const addConnection = async (name: string) => {
    const docRef = await addDoc(
      collection(dbFirestore, collectionConnections),
      {
        name,
      }
    );
    setConnections((prev) => [...prev, { id: docRef.id, name }]);
  };

  const removeConnection = async (id: string) => {
    await deleteDoc(doc(dbFirestore, collectionConnections, id));
    setConnections((prev) => prev.filter((conn) => conn.id !== id));
  };
  return {
    connections,
    addConnection,
    removeConnection,
  };
};

export default useConnections;
