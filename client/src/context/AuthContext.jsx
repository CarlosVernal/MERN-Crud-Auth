import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";
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
      setUser(res.data); //en res.data estan los datos enviados desde el backEnd funcion: register en auth.controllers.js
      //console.log(res.data)
      setIsAuthenticated(true);
    } catch (error) {
      //console.log(error.response.data)
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      // setUser(res.data);
      // setIsAuthenticated(true);
    } catch (error) {
      //console.log(error.response.data)
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    //elimina los recuadros de los errores luego de 5 segundos
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      //es importante quitar los timer cuando ya no esten en uso
      return () => clearTimeout(timer); //en caso de que el usuario cambie de pagina o ya no este en uso el componente
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
