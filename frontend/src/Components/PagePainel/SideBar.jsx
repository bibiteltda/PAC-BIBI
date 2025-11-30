/* Dependências */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const handleSelect = (nome) => {
        setAtivo(nome);
        setFuncao(nome);
        setIsOpen(false);

        const rotas = {
            Home: "/",
            Funcoes: "/funcoes",
            Sobre: "/sobre-nos",
            Relatorios: "/relatorio",
            Financeiro: "/controle-mensal",
            Turmas: "/turmas",
        };

        if (rotas[nome]) {
            navigate(rotas[nome]);
        }
    };

    const menusPrincipais = [
        { nome: "Home", icon: <FaHouse size={22} /> },
        { nome: "Funcoes", icon: <FaMoneyCheck size={22} /> },
        { nome: "Sobre", icon: <HiSquares2X2 size={22} /> },
    ];

    const recursosCondutor = [
        { nome: "Relatorios", icon: <FaFileLines size={22} /> },
        { nome: "Financeiro", icon: <GrMoney size={22} />, },
        { nome: "Turmas", icon: <BsFillPersonVcardFill size={22} /> },
    ];

    const recursosGerais = [

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
            className={`flex items-center cursor-pointer py-2 px-3 space-x-3 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out
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
