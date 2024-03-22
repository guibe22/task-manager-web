import React from 'react';
import { HiOutlineUser, HiOutlineCog, HiOutlineChartSquareBar, HiOutlineDocumentText } from 'react-icons/hi';
import useUsuarios from '../hooks/useUsuarios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function DashboardMenu() {
    const router = useRouter();
    const { decodeToken } = useUsuarios();
    const [user, setUser] = useState(null);

    const handleUser = async () => {
        const user = await decodeToken();
        setUser(user);
    }
    const signOut = () => {
        localStorage.removeItem("token");
        router.push("/login");
      };
      
    useEffect(() => {
        handleUser();
    }, []);
    return (
        <div id="menu" className="bg-white col-span-3 rounded-lg p-6">
            <h1 className="font-bold text-lg lg:text-3xl text-black ">
                Dashboard
            </h1>
            <p className="text-black text-sm mb-2">Bienvenido!</p>
            <a href="#" className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-orange-100 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
                <div>
                    <HiOutlineUser className="rounded-full w-10 h-10 relative object-cover text-black" />
                </div>
                <div>
                    <p className="font-medium text-black leading-4">{user?.nombre}</p>
                    <span className="text-xs text-black">{user?.correo}</span>
                </div>
            </a>
            <hr className="my-2 border-slate-700" />
            <div id="menu" className="flex flex-col space-y-2 my-5">
                <a href="#" className="hover:bg-orange-100 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <HiOutlineChartSquareBar className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <p className="font-bold text-base lg:text-lg text-black">Proyectos</p>
                            <p className="text-black text-sm hidden md:block">vista de Proyectos</p>
                        </div>
                    </div>
                </a>
                <a href="#" className="hover:bg-orange-100 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <HiOutlineDocumentText className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <p className="font-bold text-base lg:text-lg text-black">Tareas </p>
                            <p className="text-black text-sm hidden md:block">tareas</p>
                        </div>
                    </div>
                </a>

                <button  onClick={signOut} className="hover:bg-orange-100  transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <HiOutlineCog className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <p className="font-bold text-base lg:text-lg text-black leading-4 ">Cerrar Sesion</p>
                            <p className="text-black text-sm hidden md:block">salir del sistema</p>
                        </div>
                    </div>
                </button>
            </div>
            <p className="text-sm text-center text-gray-600">@ 2024 || Grupo numero 2</p>
        </div>
    );
}

export default DashboardMenu;
