import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

const AuthGuard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
