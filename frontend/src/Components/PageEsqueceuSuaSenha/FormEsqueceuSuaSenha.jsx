/* Dependências */
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* Ícones */
import { FaCircleArrowLeft } from "react-icons/fa6";

/* Validador de email */
import validaEmail from "../PageCadastro/validaEmail.jsx";

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

export default function FormEsqueceuSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [tocado, setTocado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTocado(true);

    if (!email.trim()) {
      setErro("Preencha o campo de email.");
      return;
    }

    if (!validaEmail(email)) {
      setErro("Digite um email válido.");
      return;
    }

    setErro("");
    console.log("Enviar link de recuperação para:", email);
  };

  return (
    /* Apenas o card, sem ocupar a tela toda */
    <div className="bg-white rounded-2xl shadow-xl w-[450px] h-[370px] flex items-center justify-center p-6">
      {/* Container interno */}
      <div className="w-[350px] flex flex-col">
        {/* Botão de voltar */}
        <div className="mb-2">
          <FaCircleArrowLeft
            onClick={() => navigate("/login")}
            className="text-[#0369A1] text-2xl cursor-pointer hover:scale-120 transition-all duration-300 ease-in-out mb-3"
          />
        </div>

        {/* Título e texto */}
        <InputAnimado delay={0.1}>
          <h1 className="text-2xl font-bold text-[#082F49] mb-1 select-none">
            Esqueceu sua senha
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Insira seu email abaixo para receber um link e redefinir sua senha.
          </p>
        </InputAnimado>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
          {/* Input Email */}
          <InputAnimado delay={0.2}>
            <div className="select-none">
              <p className="text-[13px] font-light select-none mb-1 text-gray-700 ">Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTocado(true)}
                placeholder="exemplo@email.com"
                className={`w-full py-2 px-4 text-sm text-[#252525] placeholder-[#98A2B3] appearance-none 
                  bg-transparent outline-none border-1 border-[#D0D5DD] rounded-lg focus:border-[#BAE6FD]
                   focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent transition-all duration-200
                    ease-in-out ${erro && tocado ? "border-red-500 focus:border-red-500 focus:bg-red-500/20" : ""}`}
              />
              {erro && tocado && (
                <p className="text-sm text-red-500 mt-1">{erro}</p>
              )}
            </div>
          </InputAnimado>

          {/* Botão */}
          <InputAnimado delay={0.3}>
            <motion.button
              type="submit"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, ease: "easeOut", delay: 0.4 }}
              className="w-full bg-[rgba(3,105,161,0.9)] py-2 text-white text-xl font-semibold 
              rounded-lg cursor-pointer hover:bg-[rgba(3,105,161,1)] hover:scale-102 transition-all 
              duration-300 ease-in-out select-none"
            >
              Enviar email
            </motion.button>
          </InputAnimado>
        </form>
      </div>
    </div>
  );
}
