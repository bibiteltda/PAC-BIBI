/* Dependências */
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

export default function FormAlterarMensalidade() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        aluno: "Eric Gabriel Caetano",
        escola: "Amador Aguiar",
        valor: "",
        data: "",
        status: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Alteração de mensalidade:", form);
        // futura integração com backend
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl w-[480px] min-h-[500px] flex items-center justify-center p-6">
            {/* Container interno */}
            <div className="w-[380px] flex flex-col">
                {/* Botão de voltar */}

                {/* Título */}
                <InputAnimado delay={0.1}>
                    <h1 className="text-2xl font-bold text-[#082F49] mb-4 select-none text-center ">
                        Alteração de Mensalidade
                    </h1>
                </InputAnimado>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-3 flex flex-col">
                    {/* Dados do Aluno */}
                    <InputAnimado delay={0.2}>
                        <h2 className="text-md font-semibold text-[#082F49] mb-1 select-none">
                            Dados do Aluno
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-[13px] font-light mb-1 text-gray-700">Aluno</p>
                                <input
                                    type="text"
                                    value={form.aluno}
                                    disabled
                                    className="w-full py-2 px-4 text-sm text-white bg-[#0369A1] rounded-md outline-none cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-light mb-1 text-gray-700">Escola</p>
                                <input
                                    type="text"
                                    value={form.escola}
                                    disabled
                                    className="w-full py-2 px-4 text-sm text-white bg-[#0369A1] rounded-md outline-none cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </InputAnimado>

                    {/* Dados de Alteração */}
                    <InputAnimado delay={0.3}>
                        <h2 className="text-md font-semibold text-[#082F49] mb-2 select-none">
                            Dados de Alteração
                        </h2>
                        <div className="space-y-3">
                            {/* Valor */}
                            <div>
                                <p className="text-[13px] font-light mb-1 text-gray-700">Valor</p>
                                <input
                                    type="number"
                                    name="valor"
                                    value={form.valor}
                                    onChange={handleChange}
                                    placeholder="Digite o valor"
                                    className="w-full py-2 px-4 text-sm text-[#252525] placeholder-[#98A2B3]
                    bg-transparent outline-none border border-[#D0D5DD] rounded-lg 
                    focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
                    focus:placeholder-transparent transition-all duration-200 ease-in-out"
                                />
                            </div>

                            {/* Data */}
                            <div>
                                <p className="text-[13px] font-light mb-1 text-gray-700">Data</p>
                                <input
                                    type="date"
                                    name="data"
                                    value={form.data}
                                    onChange={handleChange}
                                    className="w-full py-2 px-4 text-sm text-[#252525]
                    bg-transparent outline-none border border-[#D0D5DD] rounded-lg 
                    focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
                    transition-all duration-200 ease-in-out"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <p className="text-[13px] font-light mb-1 text-gray-700">Status</p>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full py-2 px-4 text-sm text-[#252525]
                    bg-transparent outline-none border border-[#D0D5DD] rounded-lg 
                    focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
                    transition-all duration-200 ease-in-out"
                                >
                                    <option value="">Escolha o status da mensalidade</option>
                                    <option value="pago">Pago</option>
                                    <option value="pendente">Pendente</option>
                                    <option value="atrasado">Atrasado</option>
                                </select>
                            </div>
                        </div>
                    </InputAnimado>

                    {/* Botão */}
                    <InputAnimado delay={0.4}>
                        <motion.button
                            type="submit"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1, ease: "easeOut", delay: 0.5 }}
                            className="w-full bg-[rgba(3,105,161,0.9)] mt-2 mb-2 py-2 text-white text-lg font-semibold 
                rounded-lg cursor-pointer hover:bg-[rgba(3,105,161,1)] hover:scale-102 transition-all 
                duration-300 ease-in-out select-none"
                        >
                            Alterar Mensalidade
                        </motion.button>
                    </InputAnimado>
                </form>
            </div>
        </div>
    );
}
