import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, onAuthStateChanged } from "../utils/auth";

export function useRequireAuth() {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    return unsubscribe;
  }, [navigate]);

  return user;
}

export function useRedirectIfAuthenticated(path = "/") {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate(path);
    });
    return unsubscribe;
  }, [navigate, path]);
}
