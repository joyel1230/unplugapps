import { Outlet } from "react-router";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="min-h-[32rem] min-w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
