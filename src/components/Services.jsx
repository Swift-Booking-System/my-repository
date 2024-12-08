import {useEffect, useState} from "react";
import {Link} from "react-router-dom";




/**
 * The Services component.
 *
 * @returns {JSX.Element} The rendered component.
 * @example
 * <Services />
 */
export function Services() {
    /**
     * @typedef {Object} Service
     * @property {string|number} id - The unique identifier for the service.
     * @property {string} name - The name of the service.
     * @property {string} description - A description of the service.
     * @property {number} duration - The duration of the service in minutes.
     * @property {number} price - The price of the service.
     * @property {string} status - The status of the service.
     */
    /**
     * Renders a list of services.
     * @param {Array<Service>} services - An array of Service objects.
     * @returns {JSX.Element} A div containing a heading and a list of services.
     */

    function ServiceList({ services }) {
        return (
            <div>
                <h1 className="mx-3 text-3xl text-white font-bold">Services</h1>
                <ul>
                    {services.map((service) => (
                        <div key={service.serviceId} className="bg-white rounded-lg shadow-md p-4 m-2">
                            <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                            <p className="text-gray-600">Description: {service.description}</p>
                            <p className="text-gray-600">Duration: {service.duration} minutes</p>
                            <p className="text-gray-600">Price: ${service.price}</p>
                            <p className="text-gray-600">Status: {service.status}</p>
                            <Link to={`/services/${service.serviceId}`} state={{ service }}>
                                <button className="px-4 py-2 my-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Book
                                </button>
                            </Link>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }

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
                console.error("Failed to fetch services:2", error);
            }
        };
        fetchServices();
    }, []);

    return (
        ServiceList({services})
    );
}

