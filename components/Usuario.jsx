import { useEffect, useState } from "react";
import useUsuarios from "../hooks/useUsuarios";



export default function Usuario({id, ...props }) {
    console.log('id en usuario', id)
    const { getUsuarioById } = useUsuarios();
    const [nombre, setNombre] = useState("");

    const handleUser = async () => {
        const user = await getUsuarioById(id);
        console.log('user', user)
        setNombre(user?.nombre);
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