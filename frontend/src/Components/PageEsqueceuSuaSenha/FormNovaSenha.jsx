"use client";
/* Dependências */
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* Ícones */
import { FaCircleArrowLeft } from "react-icons/fa6";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";

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

/* InputSenha dentro do form */
const InputSenhaForm = ({
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    errorMessage,
}) => {
    const [mostrar, setMostrar] = useState(false);

    return (
        <div className="relative select-none">
            <p className="text-[13px] font-light mb-1 text-gray-700">{label}</p>

            <div className="relative w-full">
                <input
                    type={mostrar ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`w-full pr-10 py-2 px-4 text-sm text-[#252525] placeholder-[#98A2B3] 
                      appearance-none bg-transparent outline-none border-1 border-[#D0D5DD] 
                      rounded-lg focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] 
                      focus:placeholder-transparent transition-all duration-200 ease-in-out 
                      ${error ? "border-red-500 focus:border-red-500 focus:bg-red-500/20" : ""}`}
                />

                {/* Botão mostrar/ocultar senha */}
                <button
                    type="button"
                    onClick={() => setMostrar(!mostrar)}
                    className="absolute inset-y-0 right-3 flex items-center text-[rgba(3,105,161,1)] hover:text-[rgba(3,105,161,0.8)] transition-transform duration-300"
                >
                    {mostrar ? <RiEyeCloseLine size={22} /> : <RiEye2Line size={22} />}
                </button>
            </div>

            {/* Espaço reservado para erro */}
            <p className="text-sm text-red-500 mt-1 min-h-[0.8rem]">
                {error ? errorMessage : "\u00A0"}
            </p>
        </div>
    );
};

export default function FormEsqueceuSenha() {
    const navigate = useNavigate();

    const [userEmail] = useState("usuario@email.com");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");
    const [tocado, setTocado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTocado(true);

        if (!novaSenha.trim() || !confirmarSenha.trim()) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setErro("");
        console.log(
            "Senha redefinida para:",
            userEmail,
            "Nova senha:",
            novaSenha
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl w-[450px] h-[420px] flex items-center justify-center p-6">
            <div className="w-[350px] flex flex-col">
                {/* Botão de voltar */}
                <div className="mb-1">
                    <FaCircleArrowLeft
                        onClick={() => navigate("/login")}
                        className="text-[#0369A1] text-2xl cursor-pointer hover:scale-120 transition-all duration-300 ease-in-out mb-3"
                    />
                </div>

                {/* Título e texto */}
                <InputAnimado delay={0.1}>
                    <h1 className="text-2xl font-bold text-[#082F49] mb-1 select-none">
                        Redefinir Senha
                    </h1>
                    <p className="text-sm text-gray-600 mb-3">
                        Insira uma nova senha para o email{" "}
                        <span className="font-semibold text-[#0369A1]">{userEmail}</span>
                    </p>
                </InputAnimado>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-3 flex flex-col">
                    <InputAnimado delay={0.2}>
                        <InputSenhaForm
                            label="Nova Senha"
                            placeholder="Digite sua nova senha"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            onBlur={() => setTocado(true)}
                            error={erro && tocado}
                            errorMessage={erro}
                        />
                    </InputAnimado>

                    <InputAnimado delay={0.3}>
                        <InputSenhaForm
                            label="Confirmar Senha"
                            placeholder="Confirme sua nova senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            onBlur={() => setTocado(true)}
                            error={erro && tocado}
                            errorMessage={erro}
                        />
                    </InputAnimado>

                    <InputAnimado delay={0.4}>
                        <motion.button
                            type="submit"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1, ease: "easeOut", delay: 0.4 }}
                            className="w-full bg-[rgba(3,105,161,0.9)] py-2 mt-2 text-white text-lg font-semibold rounded-lg cursor-pointer hover:bg-[rgba(3,105,161,1)] hover:scale-102 transition-all duration-300 ease-in-out select-none"
                        >
                            Redefinir Senha
                        </motion.button>
                    </InputAnimado>
                </form>
            </div>
        </div>
    );
}
