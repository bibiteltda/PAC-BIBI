// /* Dependencias */
// import { useState } from "react";

// /* Imports */

// /* Icons */
// import { FaHouse } from "react-icons/fa6";
// import { FaMoneyCheck } from "react-icons/fa";
// import { HiSquares2X2 } from "react-icons/hi2";
// import { GoGraph } from "react-icons/go";
// import { FaFileLines } from "react-icons/fa6";
// import { GrMoney } from "react-icons/gr";
// import { BsFillPersonVcardFill } from "react-icons/bs";
// import { FaFileSignature } from "react-icons/fa";

// /* Funções arquivo */

// export default function SideBar({ setFuncao, funcao, role }) {
//     const [ativo, setAtivo] = useState(funcao)

//     return (
//         <section className="w-full max-w-55 h-full flex items-center">
//             <div className="h-full w-55 text-3xl bg-white rounded-tr-xl rounded-br-xl px-4 py-5">

//                 <div className="w-full">
//                     <p className="text-xs text-[#A1A1A1] px-1 mb-1">Menu</p>
//                     <div className="w-full flex flex-col space-y-2">
//                         {/* Buttom home */}
//                         <button onClick={() => { setAtivo("Home"); setFuncao("Home") }} className={`
//                     flex items-center
//                     py-2 px-2 space-x-2
//                     text-[rgba(133,133,133,1)]
//                     cursor-pointer
//                     rounded-lg
//                     select-none
//                     group
//                     transition-all duration-300 ease-in-out transform
//                     ${ativo === "Home" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
//                     `}>
//                             <FaHouse className={`text-[26px] transition-all duration-300 ease-in-out transform
//                         ${ativo === "Home" ? "text-white" : "group-hover:text-white"}    
//                         `} />
//                             <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
//                         ${ativo === "Home" ? "text-white" : "group-hover:text-white"}   
//                         `}>Home</p>
//                         </button>
//                         {/* Buttom Funções */}
//                         <button onClick={() => { setAtivo("Funcoes"); setFuncao("Funcoes") }} className={`
//                     flex items-center
//                     py-2 px-2 space-x-2
//                     text-[rgba(133,133,133,1)]
//                     cursor-pointer
//                     rounded-lg
//                     select-none
//                     group
//                     transition-all duration-300 ease-in-out transform
//                     ${ativo === "Funcoes" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
//                     `}>
//                             <FaMoneyCheck className={`text-[26px] transition-all duration-300 ease-in-out transform
//                         ${ativo === "Funcoes" ? "text-white" : "group-hover:text-white"}    
//                         `} />
//                             <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
//                         ${ativo === "Funcoes" ? "text-white" : "group-hover:text-white"}   
//                         `}>Funções</p>
//                         </button>
//                         {/* Buttom Sobre Nós */}
//                         <button onClick={() => { setAtivo("Sobre"); setFuncao("Sobre") }} className={`
//                     flex items-center
//                     py-2 px-2 space-x-2
//                     text-[rgba(133,133,133,1)]
//                     cursor-pointer
//                     rounded-lg
//                     select-none
//                     group
//                     transition-all duration-300 ease-in-out transform
//                     ${ativo === "Sobre" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
//                     `}>
//                             <HiSquares2X2 className={`text-[26px] transition-all duration-300 ease-in-out transform
//                         ${ativo === "Sobre" ? "text-white" : "group-hover:text-white"}    
//                         `} />
//                             <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
//                         ${ativo === "Sobre" ? "text-white" : "group-hover:text-white"}   
//                         `}>Sobre Nós</p>
//                         </button>
//                     </div>
//                 </div>

//                 <div className="w-full">
//                     <p className="text-xs text-[#A1A1A1] px-1 mb-1 mt-5">Recursos</p>
//                     <div className="w-full flex flex-col space-y-2">
//                         {role === "condutor" && (
//                             <>
//                                 {/* Buttom Estatisticas */}
//                                 <button onClick={() => { setAtivo("Estatisticas"); setFuncao("Estatisticas") }} className={`
//                             flex items-center
//                             py-2 px-2 space-x-2
//                             text-[rgba(133,133,133,1)]
//                             cursor-pointer
//                             rounded-lg
//                             select-none
//                             group
//                             transition-all duration-300 ease-in-out transform
//                             ${ativo === "Estatisticas" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
//                             `}>
//                                     <GoGraph className={`text-[26px] transition-all duration-300 ease-in-out transform
//                                 ${ativo === "Estatisticas" ? "text-white" : "group-hover:text-white"}    
//                                 `} />
//                                     <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
//                                 ${ativo === "Estatisticas" ? "text-white" : "group-hover:text-white"}   
//                                 `}>Estatísticas</p>
//                                 </button>

//                                 {/* Buttom Relatórios */}
//                                 <button onClick={() => { setAtivo("Relatorios"); setFuncao("Relatorios") }} className={`
//                             flex items-center
//                             py-2 px-2 space-x-2
//                             text-[rgba(133,133,133,1)]
//                             cursor-pointer
//                             rounded-lg
//                             select-none
//                             group
//                             transition-all duration-300 ease-in-out transform
//                             ${ativo === "Relatorios" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
//                             `}>
//                                     <FaFileLines className={`text-[26px] transition-all duration-300 ease-in-out transform
//                                 ${ativo === "Relatorios" ? "text-white" : "group-hover:text-white"}    
//                                 `} />
//                                     <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
//                                 ${ativo === "Relatorios" ? "text-white" : "group-hover:text-white"}   
//                                 `}>Relatórios</p>
//                                 </button>

//                                 {/* Buttom Financeiro */}
//                                 <button onClick={() => { setAtivo("Financeiro"); setFuncao("Financeiro") }} className={`
//                             flex items-center
//                             py-2 px-2 space-x-2
//                             text-[rgba(133,133,133,1)]
//                             cursor-pointer
//                             rounded-lg
//                             select-none
//                             group
//                             transition-all duration-300 ease-in-out transform
//                             ${ativo === "Financeiro" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
//                             `}>
//                                     <GrMoney className={`text-[26px] transition-all duration-300 ease-in-out transform
//                                 ${ativo === "Financeiro" ? "text-white" : "group-hover:text-white"}    
//                                 `} />
//                                     <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
//                                 ${ativo === "Financeiro" ? "text-white" : "group-hover:text-white"}   
//                                 `}>Financeiro</p>
//                                 </button>

//                                 {/* Buttom Turmas */}
//                                 <button onClick={() => { setAtivo("Turmas"); setFuncao("Turmas") }} className={`
//                             flex items-center
//                             py-2 px-2 space-x-2
//                             text-[rgba(133,133,133,1)]
//                             cursor-pointer
//                             rounded-lg
//                             select-none
//                             group
//                             transition-all duration-300 ease-in-out transform
//                             ${ativo === "Turmas" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
//                             `}>
//                                     <BsFillPersonVcardFill className={`text-[26px] transition-all duration-300 ease-in-out transform
//                                 ${ativo === "Turmas" ? "text-white" : "group-hover:text-white"}    
//                                 `} />
//                                     <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
//                                 ${ativo === "Turmas" ? "text-white" : "group-hover:text-white"}   
//                                 `}>Turmas</p>
//                                 </button>
//                             </>
//                         )}



//                         {/* Buttom Contratos */}
//                         <button onClick={() => { setAtivo("Contratos"); setFuncao("Contratos") }} className={`
//                     flex items-center
//                     py-2 px-2 space-x-2
//                     text-[rgba(133,133,133,1)]
//                     cursor-pointer
//                     rounded-lg
//                     select-none
//                     group
//                     transition-all duration-300 ease-in-out transform
//                     ${ativo === "Contratos" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
//                     `}>
//                             <FaFileSignature className={`text-[26px] transition-all duration-300 ease-in-out transform
//                         ${ativo === "Contratos" ? "text-white" : "group-hover:text-white"}    
//                         `} />
//                             <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
//                         ${ativo === "Contratos" ? "text-white" : "group-hover:text-white"}   
//                         `}>Contratos</p>
//                         </button>

//                     </div>
//                 </div>
//             </div>

//         </section>
//     );
// }


/* Dependências */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Ícones */
import { FaHouse, FaMoneyCheck, FaFileLines, FaFileSignature } from "react-icons/fa6";
import { HiSquares2X2 } from "react-icons/hi2";
import { GoGraph } from "react-icons/go";
import { GrMoney } from "react-icons/gr";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

export default function SideBar({ setFuncao, funcao, role }) {
    const [ativo, setAtivo] = useState(funcao);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (nome) => {
        setAtivo(nome);
        setFuncao(nome);
        setIsOpen(false);
    };

    const menusPrincipais = [
        { nome: "Home", icon: <FaHouse size={22} /> },
        { nome: "Funcoes", icon: <FaMoneyCheck size={22} /> },
        { nome: "Sobre", icon: <HiSquares2X2 size={22} /> },
    ];

    const recursosCondutor = [
        { nome: "Estatisticas", icon: <GoGraph size={22} /> },
        { nome: "Relatorios", icon: <FaFileLines size={22} /> },
        { nome: "Financeiro", icon: <GrMoney size={22} /> },
        { nome: "Turmas", icon: <BsFillPersonVcardFill size={22} /> },
    ];

    const recursosGerais = [
        { nome: "Contratos", icon: <FaFileSignature size={22} /> },
    ];

    return (
        <>
            {/* Botão hambúrguer (visível apenas no mobile) */}
            <div className="lg:hidden flex items-center bg-white p-4 shadow-md w-full sticky top-0 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center text-[#0369A1] hover:scale-105 transition-transform"
                >
                    <RxHamburgerMenu size={26} />
                </button>
            </div>

            {/* Sidebar fixa em telas grandes */}
            <div className="hidden lg:flex lg:flex-col lg:w-[250px] lg:bg-white lg:shadow-sm lg:rounded-tr-xl lg:rounded-br-xl lg:h-full lg:p-5">
                <MenuContent
                    ativo={ativo}
                    handleSelect={handleSelect}
                    menusPrincipais={menusPrincipais}
                    recursosCondutor={recursosCondutor}
                    recursosGerais={recursosGerais}
                    role={role}
                />
            </div>

            {/* Sidebar retrátil (mobile) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Fundo escurecido */}
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Painel lateral */}
                        <motion.aside
                            key="sidebar"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 80, damping: 14 }}
                            className="fixed top-0 left-0 h-full w-[250px] bg-white shadow-2xl z-50 p-5 flex flex-col"
                        >
                            {/* Cabeçalho mobile */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-[#0369A1]">Menu</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-[#0369A1] hover:scale-110 transition-transform"
                                >
                                    <IoClose size={28} />
                                </button>
                            </div>

                            <MenuContent
                                ativo={ativo}
                                handleSelect={handleSelect}
                                menusPrincipais={menusPrincipais}
                                recursosCondutor={recursosCondutor}
                                recursosGerais={recursosGerais}
                                role={role}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

/* ------------------------ */
/* Subcomponente de conteúdo */
/* ------------------------ */
function MenuContent({
    ativo,
    handleSelect,
    menusPrincipais,
    recursosCondutor,
    recursosGerais,
    role,
}) {
    const renderBotao = (item) => (
        <button
            key={item.nome}
            onClick={() => handleSelect(item.nome)}
            className={`flex items-center py-2 px-3 space-x-3 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out
                ${ativo === item.nome
                    ? "bg-[#0369A1] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-[#0369A1] hover:text-white"
                }`}
        >
            <span className="text-lg">{item.icon}</span>
            <span>{item.nome}</span>
        </button>
    );

    return (
        <div className="flex flex-col space-y-5">
            {/* Menu */}
            <div>
                <p className="text-xs text-gray-400 mb-2 uppercase">Menu</p>
                <div className="flex flex-col space-y-2">
                    {menusPrincipais.map(renderBotao)}
                </div>
            </div>

            {/* Recursos */}
            <div>
                <p className="text-xs text-gray-400 mb-2 uppercase">Recursos</p>
                <div className="flex flex-col space-y-2">
                    {role === "condutor" && recursosCondutor.map(renderBotao)}
                    {recursosGerais.map(renderBotao)}
                </div>
            </div>
        </div>
    );
}
