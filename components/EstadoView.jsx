
import { RiCheckboxCircleLine, RiLoader2Line, RiCheckboxCircleFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";



const EstadoView = ({ estado }) => {
    const estadoIconMap = {
        "recibido": { icon: <RiCheckboxCircleLine />, color: "text-blue-500" },
        "en progreso": { icon: <RiLoader2Line />, color: "text-yellow-500" },
        "finalizado": { icon: <RiCheckboxCircleFill />, color: "text-green-500" },
        "cancelado": { icon: <MdDelete />, color: "text-red-500" }
    };
    const { icon, color } = estadoIconMap[estado] || { icon: null, color: "text-black" };

    return (
        <span className={`flex items-center gap-2  font-bold  ${color} mb-2`}>
            {icon}
            <span>{estado?.charAt(0).toUpperCase() + estado?.substring(1)}</span>
        </span>
    )
}

export default EstadoView