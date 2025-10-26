import React, { useEffect } from "react";
import { motion } from "framer-motion";


export default function TabelaTransacoesLoading() {

    return (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md p-4">

            <h2 className="text-gray-800 text-lg font-semibold mb-3">Transações</h2>

            <motion.div
            className="w-full h-10 rounded-xl bg-gradient-to-r from-[#EDEDED] via-[#F4F4F4] to-[#EDEDED]"
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            style={{ backgroundSize: "200% 100%" }}
            />
            <motion.div
            className="w-full h-8 rounded-xl bg-gradient-to-r from-[#EDEDED] via-[#F4F4F4] to-[#EDEDED] mt-3"
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            style={{ backgroundSize: "200% 100%" }}
            />
            <motion.div
            className="w-full h-8 rounded-xl bg-gradient-to-r from-[#EDEDED] via-[#F4F4F4] to-[#EDEDED] mt-1"
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            style={{ backgroundSize: "200% 100%" }}
            />
            <motion.div
            className="w-full h-8 rounded-xl bg-gradient-to-r from-[#EDEDED] via-[#F4F4F4] to-[#EDEDED] mt-1"
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            style={{ backgroundSize: "200% 100%" }}
            />
            <motion.div
            className="w-full h-8 rounded-xl bg-gradient-to-r from-[#EDEDED] via-[#F4F4F4] to-[#EDEDED] mt-1"
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            style={{ backgroundSize: "200% 100%" }}
            />
            <motion.div
            className="w-full h-8 rounded-xl bg-gradient-to-r from-[#EDEDED] via-[#F4F4F4] to-[#EDEDED] mt-1"
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            style={{ backgroundSize: "200% 100%" }}
            />
        </div>
    );
}