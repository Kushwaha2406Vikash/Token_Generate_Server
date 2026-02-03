import { Github } from "lucide-react";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-screen  shadow-sm ">
      <div className="max-w-7xl mx-auto px-2 py-3 flex items-center justify-between">
        <div className="flex items-center px-2 ">
           <Link to="/" className="flex items-center">
    <img
      src={logo}
      alt="Home"
      className="w-20 h-20 rounded-full object-cover cursor-pointer hover:scale-105 transition"
    />
  </Link>
        </div>



        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* GitHub Button */}
          <a
            href="https://github.com/Kushwaha2406Vikash/expense-tracker-mcp-server.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            <Github size={18} />
            GitHub
          </a>

          {/* Get API Key */}
          <Link to="/get-api-key">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            Get API Key
          </button>
          </Link>

          {/* Sign Up */}
          <Link to="/Signup">
          <button className="px-4 py-2 text-black rounded-lg hover:bg-gray-100 transition">
            Sign Up
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
