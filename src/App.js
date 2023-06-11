import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/home";
import Create from "./components/create";
import Index from "./components/index";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
