import React from 'react';

export default function App() {
  return (
    <main className="items-center justify-center">
    <Header/>
    </main>
  );
}

function Header(){
  return(
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
    <div className="text-lg font-bold">Swift Booking System</div>
    <nav className="flex space-x-4">
      <a href="#home" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700">
        Home
      </a>
      <a href="#about" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700">
        About
      </a>
      <a href="#contact" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700">
        Contact
      </a>
    </nav>
  </div>
</header>

  );
}