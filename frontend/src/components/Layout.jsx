import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
