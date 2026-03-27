import { motion } from "framer-motion";

function Hero() {
  return (
    <div
      className="h-screen relative flex items-center text-white px-16"
      style={{
        backgroundImage: "url('/gym.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-2xl">
        <button className="border border-red-400 px-5 py-2 rounded-2xl mb-6 backdrop-blur-sm text-red-400 hover:bg-white/20 transition">
          Elite Training
        </button>

    
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          FORGE YOUR <br /> LEGACY
        </motion.h1>


        <p
          className="text-gray-300 mb-10 text-xl"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Transform your body and mind through science-backed training protocols designed for peak performance.
        </p>

        <button className="bg-red-500 px-8 py-4 rounded-2xl font-semibold shadow-lg text-lg hover:scale-105 transition">
          START TODAY
        </button>

      </div>
    </div>
  );
}

export default Hero;