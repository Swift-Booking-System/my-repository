import React, {useEffect, useState} from "react";

export default function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://localhost:7023/api/Services");
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
      <>
      <Header />
      <main className="flex min-h-screen items-center bg-gray-700 flex-col">
          <div className="my-3 max-w-7xl w-full h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {services.map((service) => (
                <>
                  <Card key={service.id} service={service}></Card>
                  <Card key={service.id} service={service}></Card>
                  <Card key={service.id} service={service}></Card>
                  <Card key={service.id} service={service}></Card>
                  <Card key={service.id} service={service}></Card>
                  <Card key={service.id} service={service}></Card>
                  <Card key={service.id} service={service}></Card>
                  <Card key={service.id} service={service}></Card>

                </>
            ))}
          </div>
          </main>
      </>
      );

}

function Header() {
  return (
    <header className="w-screen  bg-gray-900 text-white shadow-md z-50">
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

function Card({service}) {
  return (
    <div className="">
      <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src="https://via.placeholder.com/150"
          alt="Card Image"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">
            {service.name}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {service.description}
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
