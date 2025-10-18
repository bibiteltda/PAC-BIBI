// import { useState } from "react";
// import { motion } from "framer-motion";

// const InputAnimado = ({ children, delay = 0 }) => {
//     const [animou, setAnimou] = useState(false);

//     return (
//         <motion.div
//             initial={!animou ? { opacity: 0, y: -10 } : false}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//                 type: "spring",
//                 stiffness: 40,
//                 damping: 10,
//                 delay,
//             }}
//             onAnimationComplete={() => setAnimou(true)}
//         >
//             {children}
//         </motion.div>
//     );
// };

// export default function LinkConvite({ onClose }) {
//     const [email, setEmail] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Convite enviado para:", email);
//         // futura integração com backend
//     };

//     return (
//         <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", stiffness: 70, damping: 14 }}
//             className="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col items-center overflow-y-auto p-6"
//         >
//             {/* Cabeçalho */}
//             <div className="w-full flex justify-between items-center ">
//                 <h1 className="text-2xl font-bold text-[#082F49] mt-20">
//                     Link de Convite para Turma
//                 </h1>
//                 <div className=" mb-20">
//                     <button
//                         onClick={onClose}
//                         className="text-gray-500 hover:text-gray-700 text-xl font-bold"
//                     >
//                         ✕
//                     </button>
//                 </div>
//             </div>

//             {/* Texto explicativo */}
//             <InputAnimado delay={0.1}>
//                 <div className="mt-5">
//                     <p className="text-[14px] text-gray-700 mb-4">
//                         Você pode enviar convites para que os responsáveis participem da turma.
//                     </p>

//                     <p className="text-[14px] text-gray-700 font-semibold mb-2">É simples:</p>
//                     <ol className="list-decimal list-inside text-[13px] text-gray-600 mb-6 space-y-1">
//                         <li>Acesse a turma.</li>
//                         <li>Clique em um roteiro.</li>
//                         <li>Digite o e-mail do responsável e envie.</li>
//                         <li>Ele receberá um link com um código de 4 dígitos.</li>
//                         <li>
//                             Assim que o responsável confirmar o convite, ele será adicionado à turma.
//                         </li>
//                     </ol>
//                 </div>
//             </InputAnimado>

//             {/* Formulário */}
//             <form onSubmit={handleSubmit} className="w-full flex flex-col mt-10 space-y-4">
//                 <InputAnimado delay={0.3}>
//                     <label className="text-sm font-medium text-gray-800 mt-2">Email</label>
//                     <input
//                         type="email"
//                         placeholder="Digite o email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full py-2 px-4 text-sm text-[#252525] placeholder-[#98A2B3]
//                         bg-transparent outline-none border border-[#D0D5DD] rounded-lg 
//                         focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
//                         focus:placeholder-transparent transition-all duration-200 ease-in-out"
//                         required
//                     />
//                 </InputAnimado>

//                 <InputAnimado delay={0.4}>
//                     <motion.button
//                         type="submit"
//                         whileHover={{ scale: 1.03 }}
//                         whileTap={{ scale: 0.97 }}
//                         className="w-full bg-[#0369A1] py-2 text-white text-md font-semibold 
//                         rounded-lg cursor-pointer hover:bg-[#075985] transition-all duration-200"
//                     >
//                         Enviar Convite
//                     </motion.button>
//                 </InputAnimado>
//             </form>
//         </motion.div>
//     );
// }
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Animação suave para os elementos internos */
const InputAnimado = ({ children, delay = 0 }) => {
    const [animou, setAnimou] = useState(false);

    return (
        <motion.div
            initial={!animou ? { opacity: 0, y: -10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 40, damping: 10, delay }}
            onAnimationComplete={() => setAnimou(true)}
        >
            {children}
        </motion.div>
    );
};

export default function LinkConvite({ onClose }) {
    const [email, setEmail] = useState("");
    const [visivel, setVisivel] = useState(true);

    // Ao clicar em fechar, faz a animação antes de desmontar
    const handleClose = () => {
        setVisivel(false);
        setTimeout(onClose, 400); // tempo ligeiramente maior que o exit animation
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Convite enviado para:", email);
        // futura integração com backend
    };

    return (
        <AnimatePresence>
            {visivel && (
                <>
                    {/* 🔹 Overlay com fade suave */}
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80] lg:hidden"
                        onClick={handleClose}
                    />

                    {/* 🔹 Painel lateral com animação de entrada e saída */}
                    <motion.div
                        key="panel"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 70, damping: 14 }}
                        className="fixed top-0 right-0 h-full w-4/5 sm:w-[450px] bg-white shadow-2xl 
                                   z-[90] flex flex-col items-center overflow-y-auto p-6 
                                   rounded-tl-2xl lg:rounded-none"
                    >
                        {/* Cabeçalho */}
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-xl sm:text-2xl font-bold text-[#082F49] mt-20 sm:mt-16">
                                Link de Convite para Turma
                            </h1>
                            <div className="mb-20 sm:mb-16">
                                <button
                                    onClick={handleClose}
                                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Texto explicativo */}
                        <InputAnimado delay={0.1}>
                            <div className="mt-5">
                                <p className="text-[14px] text-gray-700 mb-4">
                                    Você pode enviar convites para que os responsáveis participem da turma.
                                </p>

                                <p className="text-[14px] text-gray-700 font-semibold mb-2">É simples:</p>
                                <ol className="list-decimal list-inside text-[13px] text-gray-600 mb-6 space-y-1">
                                    <li>Acesse a turma.</li>
                                    <li>Clique em um roteiro.</li>
                                    <li>Digite o e-mail do responsável e envie.</li>
                                    <li>Ele receberá um link com um código de 4 dígitos.</li>
                                    <li>Assim que o responsável confirmar o convite, ele será adicionado à turma.</li>
                                </ol>
                            </div>
                        </InputAnimado>

                        {/* Formulário */}
                        <form
                            onSubmit={handleSubmit}
                            className="w-full flex flex-col mt-10 space-y-4 mb-10"
                        >
                            <InputAnimado delay={0.3}>
                                <label className="text-sm font-medium text-gray-800 mt-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="Digite o email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full py-2 px-4 text-sm text-[#252525] placeholder-[#98A2B3]
                                    bg-transparent outline-none border border-[#D0D5DD] rounded-lg 
                                    focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
                                    focus:placeholder-transparent transition-all duration-200 ease-in-out"
                                    required
                                />
                            </InputAnimado>

                            <InputAnimado delay={0.4}>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full bg-[#0369A1] py-2 text-white text-md font-semibold 
                                    rounded-lg cursor-pointer hover:bg-[#075985] transition-all duration-200"
                                >
                                    Enviar Convite
                                </motion.button>
                            </InputAnimado>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
