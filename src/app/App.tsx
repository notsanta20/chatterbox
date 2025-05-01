import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Index from "../components/Index";
import Signup from "../components/Signup";
import Login from "../components/Login";
import ChatRoom from "../components/ChatRoom";
import Profile from "../components/Profile";

function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const htmlElement: HTMLHtmlElement | null = document.querySelector("html");
  const theme = localStorage.getItem("theme");

  useEffect(() => {
    if (theme) {
      if (theme === "light") {
        if (htmlElement) {
          setDarkTheme(false);
          htmlElement.classList.remove("dark");
        }
      } else {
        if (htmlElement) {
          setDarkTheme(true);
          htmlElement.classList.add("dark");
        }
      }
    } else {
      if (htmlElement) {
        htmlElement.classList.add("dark");
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<Signup theme={darkTheme} />} />
      <Route path="/login" element={<Login theme={darkTheme} />} />
      <Route
        path="/chatroom"
        element={<ChatRoom darkTheme={darkTheme} setDarkTheme={setDarkTheme} />}
      />
      <Route path="/profile" element={<Profile darkTheme={darkTheme} />} />
    </Routes>
  );
}

export default App;
