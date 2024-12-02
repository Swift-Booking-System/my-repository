import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import routes from "./routes";

export default function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      //lambda expression
      try {
        const response = await fetch("https://localhost:7023/api/Services"); //get API
        if (response.ok) {
          const data = await response.json();
          setServices(data); //Show the API in the website
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Router>
        <header className="w-screen  bg-gray-900 text-white shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div className="text-lg font-bold">Swift Booking System</div>
            <nav className="flex space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Home
              </Link>
              {services.map((service) => (
                <>
                  <Link
                    key={service.id}
                    to={`/card/${service.id}`}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {service.name}
                  </Link>
                </>
              ))}
              <a
                href="#contact"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Contact
              </a>
            </nav>
          </div>
        </header>

        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>

        <main className="flex min-h-screen items-center bg-gray-700 flex-col">
          <div className="my-3 max-w-7xl w-full h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            Swift Booking System
          </div>
        </main>
      </Router>
    </>
  );
}
