import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Atelier from "./pages/Atelier";
import Boutique from "./pages/Boutique";
import Produit from "./pages/Produit";
import Stages from "./pages/Stages";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/atelier" element={<Atelier />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/boutique/:slug" element={<Produit />} />
          <Route path="/stages" element={<Stages />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
