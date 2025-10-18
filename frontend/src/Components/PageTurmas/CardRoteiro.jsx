// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function CardRoteiro({ name, quantAlunos, turno }) {
  return (
    // <section className="flex w-full max-w-100 h-30 bg-gradient-to-br from-[#1267A0] to-[#082F49] rounded-xl text-white shadow-lg p-4">
    <section className="w-full max-w-[800px] mx-auto h-30 flex bg-gradient-to-br from-[#1267A0] to-[#082F49] rounded-xl text-white shadow-lg p-4">

      <motion.div
        className="w-full flex flex-col justify-between select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Nome */}
        <motion.p
          className="text-lg font-bold tracking-wide"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {name}
        </motion.p>

        {/* Linha divisória */}
        <div className="w-full h-[1px] bg-white/30 my-2"></div>

        {/* Conteúdo */}
        <div className="flex justify-between text-sm">
          {/* Alunos */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="opacity-70">Quantidade de alunos</p>
            <p className="text-base font-semibold">{quantAlunos}</p>
          </motion.div>

          {/* Turno */}
          <motion.div
            className="flex flex-col text-right"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="opacity-70">Turno</p>
            <p className="text-base font-semibold">{turno}</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
