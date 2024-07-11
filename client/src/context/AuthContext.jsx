import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie"; //para lectura de cookies
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
  const [loading, setLoading] = useState(true);

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
      setUser(res.data); //datos del usuario
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
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

  useEffect(() => {
    async function checkLogin() { // usa esta funcion al cargar la pagina
      //recive las cookies para acceder a las rutas protegidas
      const cookies = Cookies.get(); //recive la cookie existente enviada desde el backEnd src/auth.controlleres.js register y login
      //console.log(cookies);
      if (!cookies.token) { // si no hay cookie el usuario no esta autenticado, por lo tanto no hay user
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      //console.log(cookies.token);
      try { //intenta enviar el token al backEnd para revisar si es valido
        const res = await verifyTokenRequest(cookies.token); //funcion asincrona que pregunta al backEnd en auth.js
        //console.log(res);
        if (!res.data) { //si no existen datos (.data)
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null)
          return;
        }

        // si existen datos, entonces el usuario es valido 
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false); //termino de "cargar"

      } catch (error) { //si hay algun error el usuario no es valido
        //console.log(error);
        setIsAuthenticated(false);
        setLoading(false)
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
