import { useEffect, useState } from "react";
import useProyectos from "../../../hooks/useProyectos";



export default function ProyectoView({id, ...props }) {
    const { getProyectoById } = useProyectos();
    const [nombre, setNombre] = useState("");

    const handleUser = async () => {
        const user = await getProyectoById(id);

        console.log('proyecto', user)
        setNombre(user?.data?.proyecto?.nombre);
    }

    useEffect(() => {
        handleUser();
    }, []);

    return (
        <span className={props.className}>
            {nombre}
        </span>
    );
}