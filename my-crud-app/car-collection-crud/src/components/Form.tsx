import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  setAllCars: (value: React.SetStateAction<carType[]>) => void;
  editCar: carType | undefined;
  editIndex: number | null;
  setEditIndex: (value: React.SetStateAction<number | null>) => void;
};

export default function Form({
  allCars,
  setAllCars,
  editCar,
  editIndex,
  setEditIndex,
}: propsType) {
  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState<any>({});

  const allFeatures = ["AC", "Sunroof", "Bluetooth", "GPS", "Airbags"];
  const allCity = ["Ahmedabad", "Surat", "Mumbai", "Delhi"];

  useEffect(() => {
    if (editCar) {
      setCarName(editCar.carName);
      setBrand(editCar.brand);
      setPrice(editCar.price);
      setFuelType(editCar.fuelType);
      setFeatures(editCar.features);
      setCity(editCar.city);
      setDescription(editCar.description);
    }
  }, [editCar]);

  // Feature handler
  const handleFeatures = (e: any) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setFeatures((prev) => [...prev, value]);
      setError((prev: any) => ({ ...prev, features: "" }));
    } else {
      setFeatures((prev) => prev.filter((f) => f !== value));
    }
  };

  // Validation
  const validate = () => {
    let newError: any = {};

    if (!carName.trim()) {
      newError.carName = "Car name is required";
    } else if (carName.length < 2) {
      newError.carName = "Minimum 2 characters required";
    }

    if (!brand.trim()) {
      newError.brand = "Brand is required";
    }

    if (!price) {
      newError.price = "Price is required";
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newError.price = "Enter valid price";
    }

    if (!fuelType) {
      newError.fuelType = "Select fuel type";
    }

    if (features.length === 0) {
      newError.features = "Select at least one feature";
    }

    if (!city || city === "Select City") {
      newError.city = "Select city";
    }

    if (!description.trim()) {
      newError.description = "Description required";
    } else if (description.length < 10) {
      newError.description = "Minimum 10 characters required";
    }

    setError(newError);
    return Object.keys(newError).length;
  };

  // Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validate() !== 0) return;

    const carData: carType = {
      carName,
      brand,
      price,
      fuelType,
      features,
      city,
      description,
    };

    if (editIndex !== null) {
      let updated = [...allCars];
      updated[editIndex] = carData;
      setAllCars(updated);
      setEditIndex(null);
      toast.success("Car updated 🚗");
    } else {
      setAllCars((prev) => [...prev, carData]);
      toast.success("Car added 🚗");
    }

    // Reset
    setCarName("");
    setBrand("");
    setPrice("");
    setFuelType("");
    setFeatures([]);
    setCity("");
    setDescription("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-purple-600">
        {editIndex !== null ? "Update Car" : "Add Car"}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        
        {/* Car Name */}
        <input
          value={carName}
          onChange={(e) => {
            setCarName(e.target.value);
            setError((p: any) => ({ ...p, carName: "" }));
          }}
          placeholder="Car Name"
          className="input"
        />
        {error.carName && <p className="text-red-500 text-sm">{error.carName}</p>}

        {/* Brand */}
        <input
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setError((p: any) => ({ ...p, brand: "" }));
          }}
          placeholder="Brand"
          className="input"
        />
        {error.brand && <p className="text-red-500 text-sm">{error.brand}</p>}

        {/* Price */}
        <input
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setError((p: any) => ({ ...p, price: "" }));
          }}
          placeholder="Price ₹"
          className="input"
        />
        {error.price && <p className="text-red-500 text-sm">{error.price}</p>}

        {/* Fuel */}
        <div>
          <p className="font-medium">Fuel Type</p>
          {["Petrol", "Diesel", "Electric"].map((f) => (
            <label key={f} className="mr-4">
              <input
                type="radio"
                value={f}
                checked={fuelType === f}
                onChange={(e) => {
                  setFuelType(e.target.value);
                  setError((p: any) => ({ ...p, fuelType: "" }));
                }}
              />
              {f}
            </label>
          ))}
          {error.fuelType && <p className="text-red-500 text-sm">{error.fuelType}</p>}
        </div>

        {/* Features */}
        <div>
          <p className="font-medium">Features</p>
          {allFeatures.map((f) => (
            <label key={f} className="mr-4">
              <input
                type="checkbox"
                value={f}
                checked={features.includes(f)}
                onChange={handleFeatures}
              />
              {f}
            </label>
          ))}
          {error.features && <p className="text-red-500 text-sm">{error.features}</p>}
        </div>

        {/* City */}
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError((p: any) => ({ ...p, city: "" }));
          }}
          className="input"
        >
          <option>Select City</option>
          {allCity.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {error.city && <p className="text-red-500 text-sm">{error.city}</p>}

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError((p: any) => ({ ...p, description: "" }));
          }}
          placeholder="Description"
          className="input"
        />
        {error.description && <p className="text-red-500 text-sm">{error.description}</p>}

        {/* Button */}
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg">
          {editIndex !== null ? "Update Car" : "Add Car"}
        </button>
      </form>
    </div>
  );
}