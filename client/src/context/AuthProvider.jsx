
import {
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  reload,
} from "firebase/auth";

import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const refreshUser = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setUser(null);
      return;
    }

    try {
      await reload(currentUser);

      setUser({
        ...auth.currentUser,
      });
    } catch (error) {
      console.error(
        "Failed to refresh user:",
        error
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
