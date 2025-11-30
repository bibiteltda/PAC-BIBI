import React, { useEffect, useState } from "react";
import { formatAssinatura } from "./EstiloAss";

export default function Recibo({ recibo }) {

    if (!recibo) return null;

    const { id, pagante, valor, valorExtenso, data, assinatura, ref } = recibo;

    const [dia, mes, ano] = data.split("/");

    return (
        <div
            className="
                relative bg-white rounded-lg font-sans text-[#0369A1]
                shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),0_4px_6px_-2px_rgba(0,0,0,0.2)]
                w-[650px] h-[350px]
                max-sm:w-[360px] max-sm:min-h-[490px] max-sm:p-5
            "
        >
            {/* Logo */}
            <div className="absolute top-5 left-5 flex items-center space-x-1 max-sm:top-4 max-sm:left-4">
                <p className="text-4xl font-bold italic max-sm:text-2xl">BIBI</p>
            </div>

            {/* Número e Valor */}
            <div className="absolute top-5 right-5 flex flex-col items-end text-sm space-y-2 max-sm:text-xs max-sm:top-4 max-sm:right-4">
                <div className="flex items-center justify-end space-x-2">
                    <span className="font-bold">N°</span>
                    <span className="text-sm mr-11 max-sm:mr-2">{id}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="font-bold">R$</span>
                    <div
                        className="
                            w-20 h-5 border border-[#0369A1] rounded-sm 
                            flex items-center justify-center text-sm px-1
                            max-sm:w-16 max-sm:h-4 max-sm:text-xs
                        "
                    >
                        {valor}
                    </div>
                </div>
            </div>

            {/* Título */}
            <div className="mt-16 text-center max-sm:mt-14">
                <p className="text-3xl font-bold max-sm:text-xl">RECIBO</p>
                <hr className="w-[580px] border-[#0369A1] border-t-2 mt-2 mx-auto max-sm:w-full" />
            </div>

            {/* Conteúdo */}
            <div
                className="
                    mt-3 ml-9 text-base space-y-3
                    max-sm:ml-0 max-sm:text-sm max-sm:space-y-2
                "
            >

                {/* RECEBI DE */}
                <div className="flex items-end space-x-2 max-sm:flex-col max-sm:items-start max-sm:space-y-1">
                    <p className="max-sm:font-semibold">Recebi(emos) de:</p>
                    <div className="border-b border-[#0369A1] px-2 w-[452px] max-sm:w-full">
                        {pagante}
                    </div>
                </div>

                {/* QUANTIA SUPRA */}
                <div className="flex flex-col space-y-2 max-sm:space-y-2">
                    <div className="flex items-center space-x-2 max-sm:flex-col max-sm:items-start max-sm:space-y-1">
                        <p className="max-sm:font-semibold">a quantia supra de:</p>
                        <div
                            className="
                                border border-[#0369A1] rounded-sm px-2 flex items-center
                                w-[440px] h-5
                                max-sm:w-full max-sm:h-auto max-sm:py-2
                            "
                        >
                            {valorExtenso}
                        </div>
                    </div>
                </div>

                {/* REF */}
                <div className="flex items-end space-x-2 max-sm:flex-col max-sm:items-start max-sm:space-y-1">
                    <p className="max-sm:font-semibold">Ref:</p>
                    <div className="w-[546px] border-b border-[#0369A1] px-2 max-sm:w-full">
                        {ref}
                    </div>
                </div>

                {/* Linha separadora */}
                <div className="flex mt-5 max-sm:mt-4">
                    <hr className="w-[580px] border-[#0369A1] border-t-2 max-sm:w-full" />
                </div>

                <p className="max-sm:leading-snug">
                    Pelo que passo(amos) o presente recibo, para um só efeito.
                </p>

                {/* DATA + ASSINATURA */}
                <div className="flex justify-between max-sm:flex-col max-sm:gap-3 max-sm:pt-1">

                    {/* DATA */}
                    <div className="w-[150px] max-sm:w-full">
                        <div className="flex items-center space-x-1 pb-0">
                            <p>Data:</p>
                            <span>{dia}/</span>
                            <span>{mes}/</span>
                            <span>{ano}</span>
                        </div>

                        <div className="h-[1px] bg-[#0369A1] w-full max-sm:w-[60%]"></div>
                    </div>

                    {/* ASSINATURA */}
                    <div className="w-[220px] max-sm:w-full pr-8">
                        <div className="text-right pb-1 max-sm:text-left">
                            {formatAssinatura(assinatura)}
                        </div>

                        <div className="h-[0.3px] bg-[#0369A1] w-[80%] ml-auto max-sm:w-[67%] max-sm:ml-0"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}
