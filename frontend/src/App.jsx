import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Toaster from "./components/Toaster";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Atelier from "./pages/Atelier";
import Boutique from "./pages/Boutique";
import Produit from "./pages/Produit";
import Stages from "./pages/Stages";
import Contact from "./pages/Contact";
import Panier from "./pages/Panier";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/atelier" element={<Atelier />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/boutique/:slug" element={<Produit />} />
              <Route path="/stages" element={<Stages />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/panier" element={<Panier />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/commande/:id" element={<Confirmation />} />
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
