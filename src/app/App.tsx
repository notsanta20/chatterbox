import { Routes, Route } from "react-router";
import Index from "../components/index";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Header from "../components/Header";
import Room from "../components/Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/room" element={<Header />}>
        <Route index element={<Room />} />
      </Route>
    </Routes>
  );
}

export default App;
