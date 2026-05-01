import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Mock login logic - in a real app, you would make an API call here
    if (username) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const signup = (username, email, password) => {
    // Mock signup logic
    if (username && email && password) {
      setUser({ username, email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
