import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import axios from "axios";
import Index from "../components/Index";
import Signup from "../components/Signup";
import Login from "../components/Login";
import ChatRoom from "../components/chatRoom";
import Profile from "../components/Profile";

interface user {
  id: string;
  username: string;
  bio: string | null;
}

function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<number>(0);
  const [data, setData] = useState<user | null>(null);

  const htmlElement: HTMLHtmlElement | null = document.querySelector("html");
  const theme = localStorage.getItem("theme");
  if (htmlElement) {
    htmlElement.classList.add("dark");
  }

  const url = "http://localhost:3000";
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  useEffect(() => {
    if (theme) {
      console.log(theme);

      if (theme === "light") {
        if (htmlElement) {
          setDarkTheme(false);
          htmlElement.classList.remove("dark");
        }
      }
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/contacts`, header)
      .then((res) => {
        setData(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chatroom"
        element={<ChatRoom darkTheme={darkTheme} setDarkTheme={setDarkTheme} />}
      />
      <Route
        path="/profile"
        element={
          <Profile darkTheme={darkTheme} data={data} setRefresh={setRefresh} />
        }
      />
    </Routes>
  );
}

export default App;
