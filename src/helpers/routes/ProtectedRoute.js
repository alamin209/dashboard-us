import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import cookies from "js-cookie";
import { toast } from "react-toastify";

// Routes
import routes from "data/routes";

// Actions
import { saveLoggedAdminData } from "store/actions";

// API
import { getAdminByToken } from "api/admins";

// Properties
import properties from "../../properties.json";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [role, setRole] = useState(null);

  const token = cookies.get(properties.storage.cookie_name);

  const pathnameWithoutSlash =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

  // Get routes and subroutes at the same array
  const allRoutes = routes.reduce((acc, route) => {
    if (route.subPages) {
      route.subPages.forEach((subPage) => {
        acc.push(subPage);
      });
    }
    acc.push(route);
    return acc;
  }, []);

  const route = allRoutes.find(
    (route) =>
      (route.path === pathnameWithoutSlash ||
        pathnameWithoutSlash.startsWith(route.path)) &&
      route.path !== "/"
  );

  const getLoggedAdminRole = async () => {
    const response = await getAdminByToken();
    if (!response.success) return navigate("/login");
    setRole(response.data.role);
    dispatch(saveLoggedAdminData(response.data));
  };

  useEffect(() => {
    getLoggedAdminRole();
  }, []);

  if (token && role) {
    if (route?.allowedRoles.includes(role) || pathnameWithoutSlash === "/") {
      return props.children;
    } else {
      toast.error("You are not allowed to access this page");
      return <Navigate to="/" />;
    }
  } else {
    return null;
  }
};

export default ProtectedRoute;
