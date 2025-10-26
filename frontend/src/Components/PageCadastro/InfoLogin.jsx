/* Dependencias */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

/* Imports */
import InputSenha from "./inputSenha";

/* Icons */
import { FcGoogle } from "react-icons/fc";

/* Funções arquivo */
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

export default function InfoLogin({ form, setForm, setEtapa }) {
  const [erroGeral, setErroGeral] = useState("");
  const [senhaInvalida, setSenhaInvalida] = useState(false);
  const [senhasDiferentes, setSenhasDiferentes] = useState(false);
  const [camposTocados, setCamposTocados] = useState({
    email: false,
    senha: false,
    confirmarSenha: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "senha") {
      const valida = validarSenhaForte(value);
      setSenhaInvalida(!valida);
      setSenhasDiferentes(form.confirmarSenha && value !== form.confirmarSenha);
    }

    if (name === "confirmarSenha") {
      setSenhasDiferentes(value !== form.senha);
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validarSenhaForte = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(senha);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setCamposTocados(prev => ({ ...prev, [name]: true }));

    if (name === "senha") {
      const valida = validarSenhaForte(form.senha);
      setSenhaInvalida(!valida);
    }

    if (name === "confirmarSenha") {
      setSenhasDiferentes(form.confirmarSenha !== form.senha);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email é aceito como está, sem validação
    const senhaValida = validarSenhaForte(form.senha);
    const confirmacaoOk = form.senha === form.confirmarSenha;

    setCamposTocados({
      email: true,
      senha: true,
      confirmarSenha: true
    });

    if (!senhaValida) {
      setErroGeral("A senha não atende aos requisitos.");
      return;
    }

    if (!confirmacaoOk) {
      setErroGeral("As senhas não coincidem.");
      return;
    }

    setErroGeral("");
    // Passa direto para a próxima etapa
    setEtapa(2);
  };

  return (
    <form onSubmit={handleSubmit} className="w-100 px-8 space-y-2">
      {/* Input Email */}
      <InputAnimado delay={0.1}>
        <div className="select-none">
          <p className="text-[14px] font-light select-none m-1">Email</p>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="exemplo@email.com"
            className={`w-full max-w-90 py-3 px-5 text-sm text-[#252525] placeholder-[#98A2B3] appearance-none bg-transparent outline-none border-1 border-[#D0D5DD] rounded-lg focus:border-[#BAE6FD] focus:bg-[rgba(186,230,253,0.10)] focus:placeholder-transparent transition-all duration-200 ease-in-out`}
          />
        </div>
      </InputAnimado>

      {/* Container Senha */}
      <InputAnimado delay={0.2}>
        <InputSenha
          label="Senha"
          placeholder="Digite sua Senha"
          inputKey="senha"
          value={form.senha}
          onChange={handleChange}
          onBlur={handleBlur}
          error={camposTocados.senha && senhaInvalida && form.senha.trim() !== ""}
          errorMessage="A senha deve ter pelo menos 8 caracteres, com letra maiúscula, minúscula, número e símbolo."
        />
      </InputAnimado>

      {/* Container Confirmar Senha */}
      <InputAnimado delay={0.3}>
        <InputSenha
          label="Confirmar Senha"
          placeholder="Confirme sua Senha"
          inputKey="confirmarSenha"
          value={form.confirmarSenha}
          onChange={handleChange}
          onBlur={handleBlur}
          error={camposTocados.confirmarSenha && senhasDiferentes && form.confirmarSenha.trim() !== ""}
          errorMessage="As senhas não coincidem."
        />
      </InputAnimado>

      {/* Mensagem de erro */}
      {erroGeral && (
        <InputAnimado delay={0}>
          <div className="text-red-500 text-sm font-medium text-center mt-3 select-none">
            {erroGeral}
          </div>
        </InputAnimado>
      )}

      <div className="">
        <motion.button
          type="submit"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1, ease: "easeOut", delay: 0.4 }}
          className="w-full max-w-90 bg-[rgba(3,105,161,0.9)] py-2 mt-5 text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-[rgba(3,105,161,1)] hover:scale-102 transition-all duration-300 ease-in-out select-none"
        >
          Avançar Etapa
        </motion.button>

        <motion.button
          type="button"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1, ease: "easeOut", delay: 0.6 }}
          className="w-full max-w-90 mt-1 flex space-x-1 font-light text-[14px] flex justify-end select-none"
        >
          <p>Já tem uma conta?</p>
          <Link to={"/login"} className="inline-block font-semibold text-[rgba(3,105,161,1)] transition-transform transform hover:scale-110">Log in</Link>
        </motion.button>
      </div>
    </form>
  );
}
