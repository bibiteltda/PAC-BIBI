/* Dependências */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/* Ícones */
import { FaCircleArrowLeft } from "react-icons/fa6";

/* Input animado */
const InputAnimado = ({ children, delay = 0 }) => {
    const [animou, setAnimou] = useState(false);

    return (
        <motion.div
            initial={!animou ? { opacity: 0, y: -10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 10,
                delay,
            }}
            onAnimationComplete={() => setAnimou(true)}
        >
            {children}
        </motion.div>
    );
};

export default function FormAdicionarAluno() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: "",
        idade: "",
        escola: "",
        responsavel: "",
        motorista: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Novo aluno:", form);
        // aqui no futuro envia para o backend
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl w-[500px] min-h-[550px] flex items-center justify-center p-6">
            {/* Container interno */}
            <div className="w-[400px] flex flex-col">
                {/* Botão de voltar */}
                <div className="mb-2">
                    <FaCircleArrowLeft
                        onClick={() => navigate(-1)}
                        className="text-[#0369A1] text-2xl cursor-pointer hover:scale-120 transition-all duration-300 ease-in-out mb-3"
                    />
                </div>

                {/* Título */}
                <InputAnimado delay={0.1}>
                    <h1 className="text-2xl font-bold text-[#082F49] mb-1 select-none">
                        Adicionar Aluno
                    </h1>
                    <p className="text-sm text-gray-600 mb-4">
                        Preencha os dados abaixo para cadastrar um novo aluno.
                    </p>
                </InputAnimado>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-3 flex flex-col">
                    {/* Nome */}
                    <InputAnimado delay={0.2}>
                        <div>
                            <p className="text-[13px] font-light mb-1 text-gray-700">Nome</p>
                            <input
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Digite o nome do aluno"
                                className="w-full py-2 px-4 text-sm text-[#252525] placeholder-[#98A2B3] 
                                    bg-transparent outline-none border border-[#D0D5DD] rounded-lg 
                                    focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
                                    focus:placeholder-transparent transition-all duration-200 ease-in-out"
                            />
                        </div>
                    </InputAnimado>

                    {/* Idade */}
                    <InputAnimado delay={0.25}>
                        <div>
                            <p className="text-[13px] font-light mb-1 text-gray-700">Idade</p>
                            <input
                                type="number"
                                name="idade"
                                value={form.idade}
                                onChange={handleChange}
                                placeholder="Digite a idade"
                                className="w-full py-2 px-4 text-sm text-[#252525] placeholder-[#98A2B3] 
                                    bg-transparent outline-none border border-[#D0D5DD] rounded-lg 
                                    focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
                                    focus:placeholder-transparent transition-all duration-200 ease-in-out"
                            />
                        </div>
                    </InputAnimado>

                    {/* Escola (Dropdown) */}
                    <InputAnimado delay={0.3}>
                        <div>
                            <p className="text-[13px] font-light mb-1 text-gray-700">Escola</p>
                            <select
                                name="escola"
                                value={form.escola}
                                onChange={handleChange}
                                className="w-full py-2 px-4 text-sm text-[#252525] 
                                    bg-transparent outline-none border border-[#D0D5DD] rounded-lg 
                                    focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
                                    transition-all duration-200 ease-in-out"
                            >
                                <option value="">Selecione uma escola</option>
                                <option value="Escola A">Escola A</option>
                                <option value="Escola B">Escola B</option>
                                <option value="Escola C">Escola C</option>
                            </select>
                        </div>
                    </InputAnimado>

                    {/* Responsável */}
                    <InputAnimado delay={0.35}>
                        <div>
                            <p className="text-[13px] font-light mb-1 text-gray-700">Responsável</p>
                            <input
                                type="text"
                                name="responsavel"
                                value={form.responsavel}
                                onChange={handleChange}
                                placeholder="Digite o responsável"
                                className="w-full py-2 px-4 text-sm text-[#252525] placeholder-[#98A2B3] 
                                    bg-transparent outline-none border border-[#D0D5DD] rounded-lg 
                                    focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
                                    focus:placeholder-transparent transition-all duration-200 ease-in-out"
                            />
                        </div>
                    </InputAnimado>

                    {/* Motorista */}
                    <InputAnimado delay={0.4}>
                        <div>
                            <p className="text-[13px] font-light mb-1 text-gray-700">Motorista</p>
                            <input
                                type="text"
                                name="motorista"
                                value={form.motorista}
                                onChange={handleChange}
                                placeholder="Digite o motorista"
                                className="w-full py-2 px-4 text-sm text-[#252525] placeholder-[#98A2B3] 
                                    bg-transparent outline-none border border-[#D0D5DD] rounded-lg 
                                    focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
                                    focus:placeholder-transparent transition-all duration-200 ease-in-out"
                            />
                        </div>
                    </InputAnimado>

                    {/* Botão */}
                    <InputAnimado delay={0.45}>
                        <motion.button
                            type="submit"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1, ease: "easeOut", delay: 0.5 }}
                            className="w-full bg-[rgba(3,105,161,0.9)] mt-2 py-2 text-white text-lg font-semibold 
                                rounded-lg cursor-pointer hover:bg-[rgba(3,105,161,1)] hover:scale-102 transition-all 
                                duration-300 ease-in-out select-none"
                        >
                            Adicionar Aluno
                        </motion.button>
                    </InputAnimado>
                </form>
            </div>
        </div>
    );
}
