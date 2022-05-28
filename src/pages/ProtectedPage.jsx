import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

const ProtectedPage = ({ children }) => {
  const context = useContext(UserContext);

  if (!context?.user) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedPage;
