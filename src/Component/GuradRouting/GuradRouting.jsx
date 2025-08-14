import { Navigate } from "react-router-dom";
import Login from "./../../Pages/Login/Login";

export function GuradRouting(props) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/Login"} />;
  }
}
