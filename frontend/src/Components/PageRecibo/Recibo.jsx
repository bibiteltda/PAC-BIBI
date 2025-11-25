// import React, { useState, useEffect } from "react";

// export default function Recibo() {
//     // Estados para futura integração com backend
//     const [numero, setNumero] = useState("");
//     const [valor, setValor] = useState("");
//     const [recebidoDe, setRecebidoDe] = useState("");
//     const [quantia, setQuantia] = useState("");
//     const [ref, setRef] = useState("");
//     const [data, setData] = useState({ dia: "", mes: "", ano: "" });

//     // Simulação de fetch (poderá ser substituído por chamada à API)
//     useEffect(() => {
//         setNumero("00123");
//         setValor("1579,00");
//         setRecebidoDe("Fulano de Tal");
//         setQuantia("Mil quinhentos e setenta e nove reais");
//         setRef("Pagamento de serviço");
//         setData({ dia: "05", mes: "10", ano: "2025" });
//     }, []);

//     return (
//         <div className="relative w-[650px] h-[350px] bg-white rounded-lg font-sans text-[#0369A1] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),0_4px_6px_-2px_rgba(0,0,0,0.2)]">
//             {/* Logo canto superior esquerdo */}
//             <div className="absolute top-5 left-5 flex items-center space-x-1">
//                 <p className="text-4xl font-bold italic">BIBI</p>
//             </div>

//             {/* Número e valor */}
//             <div className="absolute top-5 right-5 flex flex-col items-end text-sm space-y-2">
//                 {/* Número alinhado com o valor */}
//                 <div className="flex items-center justify-end space-x-2">
//                     <span className="font-bold">N°</span>
//                     <span className="text-sm mr-11 ">{numero}</span>
//                 </div>

//                 {/* Valor com retângulo */}
//                 <div className="flex items-center space-x-2">
//                     <span className="font-bold">R$</span>
//                     <div className="w-20 h-5 border border-[#0369A1] bg-transparent rounded-sm flex items-center justify-center text-sm px-1">
//                         {valor}
//                     </div>
//                 </div>
//             </div>
//             {/* Título */}
//             <div className="mt-16 text-center">
//                 <p className="text-3xl font-bold">RECIBO</p>
//                 <hr className="w-[580px] border-[#0369A1] border-t-2 mt-2 mx-auto" />
//             </div>

//             {/* Campos do recibo */}
//             <div className="mt-3 ml-9 space-y-2 text-base">
//                 <div className="flex items-end space-x-2">
//                     <p>Recebi(emos) de:</p>
//                     <div className="w-[452px] border-b border-[#0369A1] px-2">
//                         {recebidoDe}
//                     </div>
//                 </div>

//                 <div className="mt-3 flex flex-col space-y-2">
//                     <div className="flex items-center space-x-2">
//                         <p>a quantia supra de:</p>
//                         <div className="w-[440px] h-5 border border-[#0369A1] bg-transparent rounded-sm px-2 flex items-center">
//                             {quantia}
//                         </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <div className="w-[582px] h-5 border border-[#0369A1] bg-transparent rounded-sm px-2 flex items-center"></div>
//                     </div>
//                 </div>

//                 <div className="flex items-end space-x-2">
//                     <p>Ref:</p>
//                     <div className="w-[546px] border-b border-[#0369A1] px-2">
//                         {ref}
//                     </div>
//                 </div>

//                 <div className="flex mt-5">
//                     <hr className="w-[580px] border-[#0369A1] border-t-2" />
//                 </div>

//                 <div>
//                     <p>
//                         Pelo que passo(amos) o presente recibo, para um só efeito.
//                     </p>
//                 </div>

//                 <div className="flex justify-between">
//                     <div className="relative w-[120px] flex items-center">
//                         <div className="ml-10 absolute bottom-0 left-0 w-full h-[2px] bg-[#0369A1]"></div>

//                         <div className="flex items-center space-x-1 z-10">
//                             <p>Data:</p>
//                             <span className="tracking-widest ml-2">
//                                 {data.dia}/
//                             </span>
//                             <span className="tracking-widest ml-1">
//                                 {data.mes}/
//                             </span>
//                             <span className="tracking-widest ml-1">
//                                 {data.ano}
//                             </span>
//                         </div>
//                     </div>

//                     <div className="flex mt-5 mr-8">
//                         <hr className="w-[200px] border-[#0369A1] border-t-2" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }











import React, { useState, useEffect } from "react";

export default function Recibo() {
    const [numero, setNumero] = useState("");
    const [valor, setValor] = useState("");
    const [recebidoDe, setRecebidoDe] = useState("");
    const [quantia, setQuantia] = useState("");
    const [ref, setRef] = useState("");
    const [data, setData] = useState({ dia: "", mes: "", ano: "" });

    useEffect(() => {
        setNumero("00123");
        setValor("1579,00");
        setRecebidoDe("Fulano de Tal");
        setQuantia("Mil quinhentos e setenta e nove reais");
        setRef("Pagamento de serviço");
        setData({ dia: "05", mes: "10", ano: "2025" });
    }, []);

    return (
        <div
            className="
        relative bg-white rounded-lg font-sans text-[#0369A1]
        shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),0_4px_6px_-2px_rgba(0,0,0,0.2)]

        w-[650px] h-[350px]

        max-sm:w-[360px]
        max-sm:min-h-[440px]
        max-sm:p-5
      "
        >
            {/* Logo */}
            <div className="absolute top-5 left-5 flex items-center space-x-1 max-sm:top-4 max-sm:left-4">
                <p className="text-4xl font-bold italic max-sm:text-2xl">BIBI</p>
            </div>

            {/* Número e valor */}
            <div className="absolute top-5 right-5 flex flex-col items-end text-sm space-y-2 max-sm:text-xs max-sm:top-4 max-sm:right-4">
                <div className="flex items-center justify-end space-x-2">
                    <span className="font-bold">N°</span>
                    <span className="text-sm mr-11 max-sm:mr-2">{numero}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="font-bold">R$</span>
                    <div
                        className="
              w-20 h-5 border border-[#0369A1] rounded-sm flex items-center justify-center text-sm px-1
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

            {/* CONTEÚDO */}
            <div
                className="
          mt-3 ml-9 text-base space-y-3
          max-sm:ml-0 max-sm:text-sm max-sm:space-y-2
        "
            >
                {/* Recebi(emos) */}
                <div
                    className="
            flex items-end space-x-2
            max-sm:flex-col max-sm:items-start max-sm:space-y-1
          "
                >
                    <p className="max-sm:font-semibold">Recebi(emos) de:</p>

                    <div
                        className="
              border-b border-[#0369A1] px-2
              w-[452px]
              max-sm:w-full
            "
                    >
                        {recebidoDe}
                    </div>
                </div>

                {/* Quantia */}
                <div className="flex flex-col space-y-2 max-sm:space-y-2">
                    <div
                        className="
              flex items-center space-x-2
              max-sm:flex-col max-sm:items-start max-sm:space-y-1
            "
                    >
                        <p className="max-sm:font-semibold">a quantia supra de:</p>

                        <div
                            className="
                border border-[#0369A1] rounded-sm px-2 flex items-center
                w-[440px] h-5
                max-sm:w-full max-sm:h-auto max-sm:py-2
              "
                        >
                            {quantia}
                        </div>
                    </div>

                    {/* linha extra — escondida no mobile */}
                    <div className="flex items-center space-x-2 max-sm:hidden">
                        <div className="w-[582px] h-5 border border-[#0369A1] rounded-sm px-2"></div>
                    </div>
                </div>

                {/* Ref */}
                <div
                    className="
            flex items-end space-x-2
            max-sm:flex-col max-sm:items-start max-sm:space-y-1
          "
                >
                    <p className="max-sm:font-semibold">Ref:</p>
                    <div
                        className="
              w-[546px] border-b border-[#0369A1] px-2
              max-sm:w-full
            "
                    >
                        {ref}
                    </div>
                </div>

                {/* Linha divisória */}
                <div className="flex mt-5 max-sm:mt-4">
                    <hr className="w-[580px] border-[#0369A1] border-t-2 max-sm:w-full" />
                </div>

                {/* Texto */}
                <p className="max-sm:leading-snug">
                    Pelo que passo(amos) o presente recibo, para um só efeito.
                </p>

                {/* Data + assinatura */}
                <div
                    className="
            flex justify-between items-start
            max-sm:flex-col max-sm:space-y-4 max-sm:pt-2
          "
                >
                    {/* Data */}
                    <div
                        className="
              relative flex items-center
              w-[120px]
              max-sm:w-full max-sm:mb-2
            "
                    >
                        {/* Linha da data */}
                        <div
                            className="
                absolute bottom-0 left-0 h-[2px] bg-[#0369A1]
                ml-10 w-full
                max-sm:ml-0 max-sm:w-[45%]
              "
                        ></div>

                        <div className="flex items-center space-x-1 z-10 max-sm:space-x-3">
                            <p>Data:</p>
                            <span>{data.dia}/</span>
                            <span>{data.mes}/</span>
                            <span>{data.ano}</span>
                        </div>
                    </div>

                    {/* Assinatura  */}
                    <div
                        className="
              flex justify-end
              w-[200px]
              mr-8 mt-5
              max-sm:w-full max-sm:mr-0 max-sm:mt-3
            "
                    >
                        <hr
                            className="
                w-full border-[#0369A1] border-t-2
              "
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

