/* Dependencias */
import { useState, useRef } from "react";

export default function ValidaEmail({ setEtapa }) {
  const inputsRef = useRef([]);
  const [codigo, setCodigo] = useState(["", "", "", ""]);

  /* Função para alterar valor dos inputs */
  const handleChange = (e, i) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const novoCodigo = [...codigo];
      novoCodigo[i] = value;
      setCodigo(novoCodigo);

      if (i < inputsRef.current.length - 1) {
        inputsRef.current[i + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  /* Função para apagar inputs corretamente */
  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && e.target.value === "") {
      if (i > 0) {
        inputsRef.current[i - 1].focus();
      }
    }
  };

  /* Função para passar para a próxima etapa direto */
  const handleSubmit = (e) => {
    e.preventDefault();
    setEtapa(2); // vai direto para a próxima etapa sem validação
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Container Inputs */}
      <div className="flex mt-3 space-x-3 px-8">
        {Array(4).fill(0).map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            maxLength={1}
            inputMode="numeric"
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="
              w-20 h-24
              text-center text-[rgba(3,105,161,1)] text-2xl font-semibold
              bg-[rgba(186,230,253,0.30)]
              border-1 rounded-lg
              outline-none appearance-none
              focus:bg-[rgba(186,230,253,0.50)]
              transition-all duration-200 ease-in-out
              [-moz-appearance:textfield]
            "
          />
        ))}
      </div>

      {/* Legenda */}
      <p className="text-sm font-light mt-1 select-none px-8">
        Insira o código de 4 dígitos.
      </p>

      {/* Botão de envio */}
      <button
        type="submit"
        className="
          w-full max-w-90 
          bg-[rgba(3,105,161,0.9)]
          mx-8 py-2 mt-4
          text-white text-xl font-semibold
          rounded-lg
          cursor-pointer
          hover:bg-[rgba(3,105,161,1)] hover:scale-102
          transition-all duration-300 ease-in-out
          select-none
        "
      >
        Avançar Etapa
      </button>
    </form>
  );
}
