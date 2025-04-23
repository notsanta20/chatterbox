import { Routes, Route } from "react-router";
import Index from "../components/index";
import Signup from "../components/Signup";
import Login from "../components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/room" element="">
        <Route index element="" />
      </Route>
    </Routes>
  );
}

export default App;
