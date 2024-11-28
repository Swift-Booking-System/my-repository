import React from "react";

export default function App() {
  return (
    <main className="flex flex-row gap-5">
      <Header />
      <Card />
      <Card />
      <Card />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="text-lg font-bold">Swift Booking System</div>
        <nav className="flex space-x-4">
          <a
            href="#home"
            className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Home
          </a>
          <a
            href="#about"
            className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            About
          </a>
          <a
            href="#contact"
            className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function Card() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src="https://via.placeholder.com/150"
          alt="Card Image"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">
            SWIFT Booking System
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            This project is about creating a booking system. The purpose of this
            project is to ensure that every venue that needs to have access if
            anyone wants to use it, it should have a booking system. It will
            record every single thing that happens during the venue is being
            used. The setups are GitHub, coding platforms, API, and databases.
          </p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Learn More!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
