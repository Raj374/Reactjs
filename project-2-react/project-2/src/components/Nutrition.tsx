

function Nutrition() {
  return (
    <section id="nutrition"  className="py-16 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <div className="grid grid-cols-2 gap-4">
          <img
            src="/public/food1.JPEG"
            className="w-full h-48 object-cover rounded-2xl shadow"
          />
          <img
            src="/public/food2.JPEG"
            className="w-full h-48 object-cover rounded-2xl shadow"
          />
        </div>
        <div>
          <h2 className="text-3xl text-red-600 font-bold mb-4">
            Nutrition & Healthy Eating 🥗
          </h2>

          <p className="text-gray-300 mb-6">
            Good nutrition is the foundation of fitness. Without proper diet,
            your workouts won't give full results.
          </p>

          <ul className="space-y-3 space-y-3 text-gray-200">
            <li>✅ Eat high protein foods (eggs, chicken, paneer)</li>
            <li>✅ Include fruits & green vegetables daily</li>
            <li>✅ Drink 3-4 liters water daily</li>
            <li>✅ Avoid junk & oily food</li>
            <li>✅ Eat meals on time</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default Nutrition;