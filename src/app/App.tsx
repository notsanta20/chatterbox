import { Routes, Route } from "react-router";
import Index from "../components/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/room" element="">
        <Route index element="" />
      </Route>
    </Routes>
  );
}

export default App;
