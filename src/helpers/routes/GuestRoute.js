import { Navigate } from "react-router-dom";
import cookies from "js-cookie";

// Properties
import properties from "../../properties.json";

const GuestRoute = (props) => {
  const token = cookies.get(properties.storage.cookie_name);

  return !token ? props.children : <Navigate to="/" />;
};

export default GuestRoute;
