import { FaClock,FaLock, FaLockOpen   } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiMailOpenFill } from "react-icons/ri";


const EstadoView = ({ estado }) => {
    const estadoIconMap = {
        "abierto": { icon: <FaLockOpen/>, color: "text-blue-500" },
        "en progreso": { icon: <FaClock />, color: "text-yellow-500" },
        "cerrado": { icon: <FaLock />, color: "text-red-500" },
        "reabierto": { icon: <FaLockOpen/>, color: "text-green-500" },
        "cancelado": { icon: <MdDelete />, color: "text-gray-500" }
    };
    const { icon, color } = estadoIconMap[estado] || { icon: null, color: "text-black" };

    return (
        <span className={`flex items-center gap-2  font-bold  ${color}`}>
            {icon}
            <span>{estado?.charAt(0).toUpperCase() + estado?.substring(1)}</span>
        </span>
    )
}

export default EstadoView