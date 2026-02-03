import bgimage from "./assets/bg-wave.jpg";
import Expense from "./components/Expense.jsx";
import MCPServerConfig from "./components/MCPServerConfig.jsx";
import GenerateSecretKey from "./components/GenerateSecretKey.jsx";
import Signup from "./components/Signup.jsx";
import Navbar from "./Navbar.jsx";
import Changepassword from "./components/Changepassword.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div
      className="w-screen min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <main className="flex flex-col items-center">
              <h1 className="text-emerald-600 font-bold mt-10 mb-12 text-center">
                Expense Tracker MCP Server
              </h1>

              <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6 pb-16">
                <Expense />
                <MCPServerConfig />
              </div>
            </main>
          }
        />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Get API Key Page */}
        <Route path="/get-api-key" element={<GenerateSecretKey />} />
        <Route path="/forgot-password" element={<Changepassword />} />
      </Routes>
    </div>
  );
}

export default App;
