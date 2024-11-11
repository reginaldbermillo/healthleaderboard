// components/ThemeToggle.tsx

import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import Button from "react-bootstrap/Button";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      style={{
        marginLeft: "20px",
        color: "white",
        fontSize: "16px",
        border: "none",
        backgroundColor: "#ff0c5c",
      }}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </Button>
  );
};

export default ThemeToggle;
