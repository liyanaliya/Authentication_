import { useCallback, useEffect, useState } from "react";
import {
  getUsersByEmail,
  getUsersByUsername,
  getUserById,
  createUser,
} from "../services/authApi";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(
    () => localStorage.getItem("userId") !== null,
  );

  const isAuthenticated = () => localStorage.getItem("userId") !== null;

  const loadCurrentUser = useCallback(async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) return null;

    try {
      const response = await getUserById(userId);
      return response.data;
    } catch {
      localStorage.removeItem("userId");
      return null;
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    setIsLoading(true);
    setUser(await loadCurrentUser());
    setIsLoading(false);
  }, [loadCurrentUser]);

  useEffect(() => {
    let isActive = true;

    void loadCurrentUser().then((currentUser) => {
      if (!isActive) return;
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [loadCurrentUser]);

  const login = async ({ email, password }) => {
    const response = await getUsersByEmail(email);
    const foundUser = response.data[0];

    if (!foundUser || foundUser.password !== password) {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem("userId", foundUser.id);
    setUser(foundUser);
    return foundUser;
  };

  const register = async (userData) => {
    const usernameResponse = await getUsersByUsername(userData.username);

    if (usernameResponse.data.length > 0) {
      throw new Error("Username already exists");
    }

    const newUser = {
      ...userData,
      createdAt: new Date().toISOString(),
    };

    const response = await createUser(newUser);
    localStorage.setItem("userId", response.data.id);
    setUser(response.data);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  const checkUsername = async (username) => {
    const response = await getUsersByUsername(username);
    return response.data.length > 0;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
        fetchCurrentUser,
        checkUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}