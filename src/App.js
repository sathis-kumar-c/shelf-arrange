import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Shelf from "./components/shelf";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/shelf" element={<Shelf />} />
      </Routes>
    </>
  );
}

export default App;
