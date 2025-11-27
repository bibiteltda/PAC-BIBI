import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../Components/PagePainel/NavBar";
import SideBar from "../Components/PagePainel/SideBar";
import Recibo from "../Components/PageRecibo/Recibo";

import useRecibo from "../hooks/useRecibo";

export default function PageRecibo() {
    const { id } = useParams();
    const { recibo, loading, error, find } = useRecibo();

    useEffect(() => {
        if (id) {
            find(id);
        }
    }, [id, find]);

    return (
        <div className="flex flex-col h-screen w-full bg-[#F9FAFB] relative">
            {/* Navbar */}
            <NavBar />

            <div className="flex flex-1 flex-col lg:flex-row">
                {/* Sidebar */}
                <div className="w-full lg:w-[250px] bg-white">
                    <SideBar funcao="Relatorios" role="condutor" />
                </div>

                {/* Conteúdo */}
                <main className="flex-1 flex justify-center items-start bg-[#F3F4F6] p-6 lg:p-8 overflow-y-auto">
                    <div className="w-full max-w-[800px] flex flex-col space-y-6 items-center">

                        <h1 className="text-3xl font-bold text-center">Recibo</h1>

                        {loading && <p>Carregando recibo…</p>}
                        {error && <p className="text-red-600">{error}</p>}

                        {recibo && <Recibo recibo={recibo} />}
                    </div>
                </main>

                <div className="hidden lg:block w-[250px]" />
            </div>
        </div>
    );
}