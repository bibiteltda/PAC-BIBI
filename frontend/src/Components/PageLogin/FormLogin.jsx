/* Dependências */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/* Imports */
import InputSenha from "../PageCadastro/inputSenha";
import useAuth from '../hooks/useAuth';

/* Icons */
import { FcGoogle } from "react-icons/fc";

/* Componentes */
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

export default function FormLogin({ form, setForm, setEtapa }) {
  const [erroGeral, setErroGeral] = useState("");

  const [camposTocados, setCamposTocados] = useState({
    email: false,
    senha: false,
  });

  const [emailInvalido, setEmailInvalido] = useState(false);
  const [senhaInvalida, setSenhaInvalida] = useState(false);

  /* Validação em tempo real do email */
  useEffect(() => {
    const regex = /^\S+@\S+\.\S+$/;
    setEmailInvalido(form.email && !regex.test(form.email));
  }, [form.email]);

  /* Validação em tempo real da senha */
  useEffect(() => {
    const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(form.senha);
    setSenhaInvalida(form.senha && !senhaValida);
  }, [form.senha]);

  /* Atualiza os campos do form */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Função submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposVazios =
      !form.email.trim() || !form.senha.trim() || !form.confirmarSenha.trim();

    setCamposTocados({
      email: true,
      senha: true,
    });

    if (camposVazios) {
      setErroGeral("Preencha todos os campos.");
      return;
    }

    if (emailInvalido) {
      setErroGeral("Digite um email válido.");
      return;
    }

    if (senhaInvalida) {
      setErroGeral("Senha inválida.");
      return;
    }

    // Tudo ok
    setErroGeral("");
    setEtapa(1);
    const payload = {
      login: form.email,
      senha: form.senha,
    };

    const usuario = await login(payload);
    if (usuario) {
        navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 space-y-2">
      {/* Input Email */}
      <InputAnimado delay={0.1}>
        <div className="select-none">
          <p className="text-[14px] font-light select-none m-1">Email</p>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="exemplo@email.com"
            className={`
              w-full max-w-90
              py-3 px-5
              text-sm text-[#252525]
              placeholder-[#98A2B3]
              appearance-none bg-transparent outline-none 
              border-1 border-[#D0D5DD] rounded-lg
              focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent
              transition-all duration-200 ease-in-out
              ${camposTocados.email && emailInvalido
                ? "border-red-500 focus:border-red-500 focus:bg-red-500/20"
                : "border-[#D0D5DD] focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)]"
              }
            `}
          />
          {camposTocados.email && emailInvalido && (
            <p className="text-sm text-red-500 mt-1">Digite um email válido</p>
          )}
        </div>
      </InputAnimado>

      {/* Input Senha */}
      <InputAnimado delay={0.2}>
        <InputSenha
          label="Senha"
          placeholder="Digite sua Senha"
          inputKey="senha"
          value={form.senha}
          onChange={handleChange}
          error={camposTocados.senha && senhaInvalida}
          errorMessage="A senha deve ter pelo menos 8 caracteres, com letra maiúscula, minúscula, número e símbolo."
        />
      </InputAnimado>

      {/* Mensagem de erro geral */}
      {erroGeral && (
        <InputAnimado delay={0}>
          <div className="text-red-500 text-sm font-medium text-center mt-3 select-none">
            {erroGeral}
          </div>
        </InputAnimado>
      )}

      {/* Botões */}
      <div>
        <motion.button
          key={form.role}
          type="submit"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1, ease: "easeOut", delay: 0.4 }}
          className="
            w-full max-w-90 
            bg-[rgba(3,105,161,0.9)]
            py-2 mt-5
            text-white text-xl font-semibold
            rounded-lg
            cursor-pointer
            hover:bg-[rgba(3,105,161,1)] hover:scale-102
            transition-all duration-300 ease-in-out
            select-none
          "
        >
          Avançar Etapa
        </motion.button>

        <motion.button
          type="button"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1, ease: "easeOut", delay: 0.5 }}
          className="
            cursor-pointer mt-3 w-full max-w-90 h-12 rounded-lg flex justify-center items-center space-x-2
            bg-[#CBEBFF] hover:bg-[#A1DBFF]
            transition-all duration-300 ease-in-out transform hover:scale-102
          "
        >
          <FcGoogle className="text-xl" />
          <p className="text-[#0077FF] font-semibold text-1xl">
            Continuar com o Google
          </p>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1, ease: "easeOut", delay: 0.6 }}
          className="w-full max-w-90 mt-1 flex space-x-1 font-light text-[14px] justify-end select-none"
        >
          <p>Não tem uma conta?</p>
          <Link
            to={"/login"}
            className="inline-block font-semibold text-[rgba(3,105,161,1)] transition-transform transform hover:scale-110"
          >
            Registrar
          </Link>
        </motion.div>
      </div>
    </form>
  );
}
