/* Dependencias */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

/* Imports */
import BarraDeProgresso from "../Components/PageCadastro/BarraDeProgresso";
import InfoLogin from "../Components/PageCadastro/InfoLogin";
import ValidaEmail from "../Components/PageCadastro/ValidaEmail.jsx";
import InfoAdicionais from "../Components/PageCadastro/InfoAdicionais";

/* Icons */
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function PageCadastro() {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth();

    const [form, setForm] = useState({
        email: "",
        senha: "",
        confirmarSenha: "",
        nome: "",
        cpf: "",
        celular: "",
        role: "condutor",
    });
    const [etapa, setEtapa] = useState(0);

    /* Função para avançar etapa */
    const avancarEtapa = () => setEtapa(prev => prev + 1);

    /* Função para Finalizar Cadastro e enviar para backend */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            login: form.email,
            senha: form.senha,
            nome: form.nome,
            cpf: form.cpf,
            contato: form.celular,
            role: form.role === "condutor" ? "motorista" : "responsavel",
        };

        const usuario = await register(payload);
        if (usuario) {
            navigate("/dashboard");
        }
    };


    /* Função para voltar etapa */
    const voltarEtapa = () => {
        if (etapa === 0) navigate("/"); 
        else setEtapa(prev => prev - 1);
    };

    return (
        <section className="flex flex-col lg:flex-row h-screen w-screen font-inter">
            {/* Lado esquerdo */}
            <div className="flex lg:flex-col justify-between md:w-full lg:w-1/2 p-3 md:p-6 lg:p-10 bg-gradient-to-br from-[#1267A0] to-[#082F49] text-white">
                <div className="flex items-center">
                    <p className="text-2xl md:text-4xl lg:text-4xl font-bold italic">BIBI</p>
                    <div className="text-4xl text-[#007DFA]">·</div>
                </div>
                <div className="w-40 md:w-80 text-xs md:text-xl lg:text-5xl font-extralight italic space-y-0.2">
                    <h1>Bem-vindo.</h1>
                    <p>Comece sua jornada agora com nosso sistema de gestão!</p>
                </div>
            </div>

            {/* Lado direito */}
            <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
                <div className="space-y-4">
                    <div className="px-8">
                        <FaCircleArrowLeft
                            onClick={voltarEtapa}
                            className="text-[#0369A1] text-2xl cursor-pointer hover:scale-120 transition-all duration-300 ease-in-out"
                        />
                    </div>

                    <BarraDeProgresso indexEtapa={etapa}/>
                    <p className="font-semibold text-3xl select-none px-8">Crie uma conta</p>

                    {/* Etapas */}
                    {etapa === 0 && <InfoLogin form={form} setForm={setForm} setEtapa={setEtapa} />}
                    {etapa === 1 && <ValidaEmail form={form} setEtapa={avancarEtapa} />}  
                    {etapa === 2 && <InfoAdicionais form={form} setForm={setForm} handleSubmit={handleSubmit} />}

                    {loading && <p className="text-blue-500 px-8">Cadastrando...</p>}
                    {error && <p className="text-red-500 px-8">{error}</p>}
                </div>
            </div>
        </section>
    )
}
