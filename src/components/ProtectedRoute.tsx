// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { User } from "../types";

interface ProtectedRouteProps {
  user: User | null;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
    console.log(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
