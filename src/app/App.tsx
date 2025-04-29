import { useState } from "react";
import { Routes, Route } from "react-router";
import Index from "../components/Index";
import Signup from "../components/Signup";
import Login from "../components/Login";
import ChatRoom from "../components/chatRoom";
import Profile from "../components/Profile";

function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chatroom"
        element={<ChatRoom darkTheme={darkTheme} setDarkTheme={setDarkTheme} />}
      />
      <Route path="/profile" element={<Profile darkTheme={darkTheme} />} />
    </Routes>
  );
}

export default App;
