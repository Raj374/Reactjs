import { motion } from "framer-motion";

type Props = {
  title: string;
  desc: string;
  img: string;
};

function ProgramCard({ title, desc, img }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-black rounded-2xl shadow-lg overflow-hidden border border-gray-800"
    >
      <img src={img} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4">{desc}</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded-xl">
          Explore
        </button>
      </div>
    </motion.div>
  );
}

export default ProgramCard;