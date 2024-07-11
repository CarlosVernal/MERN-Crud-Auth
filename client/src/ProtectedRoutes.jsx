import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { loading, isAuthenticated } = useAuth();
  //console.log(loading);
  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />; //replace para que no vuelva a la ruta anterior

  return <Outlet />; //Outlet le permite continuar al elemeto que esta dentro (la ruta a la que iba originalmente)
}

export default ProtectedRoutes;
