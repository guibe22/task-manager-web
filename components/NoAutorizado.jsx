import Link from "next/link";
export default function NotAutorizado() {
    return (
        <div >
            <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <div className="relative">
                        <div className="absolute">
                            <div className="">
                                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                    usted no tiene permisos para acceder a esta página
                                </h1>
                               
                              
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="https://i.pinimg.com/originals/ac/06/47/ac064781d562d0963f62ab456c0f2f01.png" />
                </div>
            </div>
        </div>
    );
}