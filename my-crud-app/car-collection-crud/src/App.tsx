import { toast, ToastContainer } from "react-toastify";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import type { carType } from "./utils/global";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [allCars, setAllCars] = useState<carType[]>(
    JSON.parse(localStorage.getItem("cars") || "[]")
  );

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editCar, setEditCar] = useState<carType>();

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(allCars));
  }, [allCars]);

  const deleteCar = (index: number) => {
    setAllCars((prev) => prev.filter((_, i) => i !== index));
    toast.success("Car deleted successfully 🚗");
  };

  const updateCar = (index: number) => {
    setEditIndex(index);
    setEditCar(allCars[index]);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          <Form
            allCars={allCars}
            setAllCars={setAllCars}
            editCar={editCar}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />

          <Table
            allCars={allCars}
            deleteCar={deleteCar}
            updateCar={updateCar}
          />
        </div>

        <ToastContainer icon={false} />
      </div>
    </>
  );
}