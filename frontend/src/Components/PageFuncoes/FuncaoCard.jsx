// components/FuncaoCard.jsx
import { motion } from "framer-motion";
import { useState } from "react";

export default function FuncaoCard({ icon: Icon, titulo, descricao }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={() => setOpen(!open)}
      className="relative bg-gradient-to-br from-[#0284C7] to-[#0369A1] 
      text-white p-10 rounded-xl shadow-lg cursor-pointer
      flex flex-col items-center justify-center space-y-4 overflow-hidden"
    >

      <Icon className="text-6xl" />
      <h2 className="text-2xl font-semibold">{titulo}</h2>

      {/* DESCRIÇÃO (APARECE NO HOVER OU CLICK) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: open ? 1 : 0,
          y: open ? 0 : 20
        }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 w-full p-4 bg-black/40 
        text-sm backdrop-blur-md"
      >
        {descricao}
      </motion.div>

    </motion.div>
  );
}
