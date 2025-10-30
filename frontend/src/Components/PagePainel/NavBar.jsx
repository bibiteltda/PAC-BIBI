/* Dependências */
import Logo from "../../assets/Logo.png";
import { useState } from "react";

/* Componente */
export default function NavBar() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [ nome, setNome ] = useState( userInfo.nome );
    const [ email, setEmail ] = useState( userInfo.email );
    return (
        <nav className="w-full h-25 flex justify-between items-center bg-[#252525] px-3">
            <div className="flex space-x-3 mt-2 ">
                {/* Ícone da logo */}
                <div
                    className="
            w-10 h-7
            flex justify-center items-center 
            bg-[rgba(3,105,161,0.9)]
            rounded-lg
            cursor-pointer
            group
            hover:bg-[rgba(3,105,161,1)]
            transition-all duration-300 ease-in-out transform
          "
                >
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-11 group-hover:scale-100 transition-all duration-300 ease-in-out"
                    />
                </div>

                {/* Nome do app */}
                <div className="flex items-center select-none">
                    <p className="text-2xl text-white font-bold italic tracking-widest">
                        BIBI
                    </p>
                    <div className="text-3xl text-[#007DFA]">·</div>
                </div>
            </div>

            {/* Usuário */}
            <div className="flex items-center space-x-7">
                <div className="h-12 w-[1px] bg-white rounded-full hidden sm:block"></div>

                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 border border-white rounded-sm overflow-hidden">
                        <img
                            src={foto}
                            alt="foto"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="hidden sm:flex flex-col justify-center">
                        <p className="text-white text-[13px] font-semibold leading-none tracking-widest">
                            {nome}
                        </p>
                        <p className="text-[#FEFEFE] text-[11px] font-extralight leading-none">
                            {email}
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
}
