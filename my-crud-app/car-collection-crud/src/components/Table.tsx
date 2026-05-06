import { useEffect, useState } from "react";

type carType = {
  carName: string;
  brand: string;
  price: string;
  fuelType: string;
  features: string[];
  city: string;
  description: string;
};

type propsType = {
  allCars: carType[];
  deleteCar: (index: number) => void;
  updateCar: (index: number) => void;
};

export default function Table({
  allCars,
  deleteCar,
  updateCar,
}: propsType) {
  const [numberOfCity, setNumberOfCity] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    let allCity: any = allCars.map((car) => car.city);
    allCity = new Set([...allCity]);
    setNumberOfCity(allCity.size);
  }, [allCars]);

  const filterCars = allCars.filter((car) => {
    return (
      car.carName.toLowerCase().includes(search.toLowerCase()) ||
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      {/* Header */}
      <div className="text-center mb-10 mt-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          All Cars
        </h1>
        <p className="text-gray-600">Manage your car collection 🚗</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Cars</p>
          <h2 className="text-3xl font-bold">{allCars.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Electric Cars</p>
          <h2 className="text-3xl font-bold">
            {allCars.filter((c) => c.fuelType === "Electric").length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Cities Covered</p>
          <h2 className="text-3xl font-bold">{numberOfCity}</h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Search by car name, brand, city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th className="p-4">No</th>
              <th className="p-4">Car Name</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Price</th>
              <th className="p-4">Fuel</th>
              <th className="p-4">Features</th>
              <th className="p-4">City</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filterCars.map((car, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-semibold">{car.carName}</td>
                <td className="p-4">{car.brand}</td>
                <td className="p-4">₹{car.price}</td>

                <td className="p-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {car.fuelType}
                  </span>
                </td>

                <td className="p-4">
                  {car.features.map((f, i) => (
                    <span key={i} className="mr-2 text-sm">
                      {f}
                    </span>
                  ))}
                </td>

                <td className="p-4">{car.city}</td>
                <td className="p-4">{car.description}</td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => updateCar(index)}
                    className="text-purple-600"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteCar(index)}
                    className="text-red-600"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}

            {filterCars.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-400">
                  No Cars Found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}