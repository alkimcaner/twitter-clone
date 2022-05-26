import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedPage = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedPage;
