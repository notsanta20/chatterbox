import { Routes, Route } from "react-router";
import Index from "../components/Index";
import Signup from "../components/Signup";
import Login from "../components/Login";
import ChatRoom from "../components/ChatRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chatroom" element={<ChatRoom />} />
    </Routes>
  );
}

export default App;
