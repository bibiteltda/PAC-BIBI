/* Dependências */
import Logo from "../../assets/Logo.png";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

/* Componente */
export default function NavBar() {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // const [nome, setNome] = useState(userInfo.nome || "bibi");
    // const [email, setEmail] = useState(userInfo.email);

    const [perfilAtivo, setPerfilAtivo] = useState(false);
    return (
        <nav className="w-full h-15 flex justify-between items-center bg-[rgba(37,37,37,1)] px-6">
            <div className="flex items-center space-x-3">
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
            <div className="flex items-center space-x-4">
                <div className="h-8 w-[1px] bg-white rounded-full hidden sm:block"></div>

                <div className="flex items-center space-x-2">
                    <button onClick={() => { setPerfilAtivo(perfilAtivo === true ? false : true); }} className="w-8 h-8 flex justify-center items-center bg-[rgba(3,105,161,0.9)] rounded-lg overflow-hidden cursor-pointer
                    hover:rounded-[30px]
                    transition-all duration-300 ease-in-out
                    ">
                            <FaUser className="text-white text-sm"/>
                    </button>
                    
                    {perfilAtivo && (
                        <div className="hidden sm:flex flex-col justify-center">
                            <p className="text-white text-[13px] font-semibold leading-none tracking-widest">
                                {"BiBi Transporte Escolar"}
                            </p>
                            <p className="text-[#FEFEFE] text-[12px] font-extralight leading-none">
                                {"email@gmail.com"}
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
}
