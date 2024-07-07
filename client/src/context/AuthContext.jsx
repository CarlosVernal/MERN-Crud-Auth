import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth";
//contexto de autentificacion, un usuario autentificado podra acceder a todo lo que este dentro del contexto
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

//el provider es un componente que permite pasar datos a otros componentes
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // estado para almacenar el usuario atenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      //console.log(error.response.data)
      setErrors(error.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
