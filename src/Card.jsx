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