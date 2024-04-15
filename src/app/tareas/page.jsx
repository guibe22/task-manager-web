'use client'
import withAuth from "../../../utils/withAuth";
import { useTarea } from "../../../hooks/useTareas";
import useUsuarios from "../../../hooks/useUsuarios";
import useTareas from "../../../hooks/useTareas";
import { useState, useEffect} from "react";
import { Layout, Migas, EstadoView ,Prioridad } from "../../../components";
import ProyectoView from "./ProyectoView";
import Link from "next/link";
import {  Tooltip, Table } from "flowbite-react";
import { IoMdSend } from "react-icons/io";

const page = () => {
    const { decodeToken, getUsuarioById, } = useUsuarios();
    const { getTareasByUserId } = useTareas();
    const [tareas, setTareas] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleTareas = async () => {
        const user = await decodeToken();
        const res = await getTareasByUserId(user.usuarioid)
        setTareas(res?.data);

    }


    useEffect(() => {
        handleTareas();
        setLoading(false);
    }, []);



    return (
        <Layout>
            <Migas
                href={'/'}
                text={'MI LISTA DE TAREAS'}
            />
            <hr className="my-3 mb-3" />
            {!tareas && !loading && (
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl font-bold">No hay tareas asignadas</h1>
                </div>
            )}
            { tareas && !loading && tareas.length > 0 && (
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>Titulo</Table.HeadCell>
                        <Table.HeadCell>proyecto</Table.HeadCell>
                        <Table.HeadCell>Estado</Table.HeadCell>
                        <Table.HeadCell>Prioridad</Table.HeadCell>
                        <Table.HeadCell>Fecha</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>


                    <Table.Body className="divide-y">

                        {tareas.map((tarea, index) => (
                            <Table.Row
                                key={index}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap  text-gray-900 font-bold dark:text-white">
                                    {tarea?.titulo}
                                </Table.Cell>
                                <Table.Cell>
                                    <ProyectoView id={tarea?.proyectoId} />
                                </Table.Cell>
                                <Table.Cell>
                                    <EstadoView estado={tarea?.estado} />
                                </Table.Cell>
                                <Table.Cell>
                                    <Prioridad prioridad={tarea?.prioridad} />
                                </Table.Cell>
                                <Table.Cell>
                                    {new Date(tarea?.fecha).toLocaleDateString()}
                                </Table.Cell>

                                <Table.Cell className="flex justify-end">
                                    <Tooltip content="Ver">
                                        <Link href={`/tareas/${tarea?.tareaId}`}
                                            className="w-50"
                                            color="light"
                                           
                                        >
                                            <IoMdSend className="h-6 w-6" color="black" />
                                        </Link>
                                    </Tooltip>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}


        </Layout>
    );
};
export default withAuth(page);