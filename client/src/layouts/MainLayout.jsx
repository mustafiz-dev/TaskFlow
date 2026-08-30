import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

function MainLayout() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="max-w-8xl mx-auto px-10 py-6">
        <Outlet />
      </main>

      <Footer></Footer>
    </div>
  );
}

export default MainLayout;