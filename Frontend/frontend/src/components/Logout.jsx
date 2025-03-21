import React from "react";
import { logoutStudent } from "../context/api";

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await logoutStudent();
      localStorage.removeItem("user");
      onLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
