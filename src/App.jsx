import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import routes from "./routes";
import { Login } from "./components/Login.jsx";
import { About } from "./components/About.jsx";
import { Services } from "./components/Services.jsx";
import Service from "./components/Service.jsx";

export default function App() {
  return (
    <>
      <Router>
        <header className="w-screen bg-gray-900 text-white shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div className="text-lg font-bold">Swift Booking System</div>
            <nav className="flex space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Home
              </Link>
              <>
                <Link
                  to="/services"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Services
                </Link>
              </>
              <Link
                to="/about"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Contact
              </Link>
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Login
                </Link>
              </>
            </nav>
          </div>
        </header>

        {/* main layout*/}
        <main className="flex min-h-screen items-center bg-gray-700 flex-col">
          <div className="my-3 max-w-7xl w-full h-screen">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/services">
                <Route index element={<Services />} />
                <Route path=":pid" element={<Service />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </main>
      </Router>
    </>
  );
}
