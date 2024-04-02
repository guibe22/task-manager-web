'use client'
import withAuth from "../../../../utils/withAuth";
import { Layout, Migas, EstadoView, Usuario, Prioridad, Toast } from "../../../../components";
import { useEffect, useState } from "react";
import useUsuarios from "../../../../hooks/useUsuarios";
import useProyectos from "../../../../hooks/useProyectos";
import useTareas from "../../../../hooks/useTareas";
import { Progress, Tooltip, Button, Dropdown, Table } from "flowbite-react";
import { HiOutlineUser } from 'react-icons/hi';
import { CiCalendarDate } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle, IoMdSend, } from "react-icons/io";
import ModalAddtareas from "./ModalAddTarea";
import ModalAddParticipantes from "./ModalAddParticipantes";
import { useRouter } from "next/navigation";


const page = ({ params }) => {
    const router = useRouter();
    const id = params.id;
    const { decodeToken } = useUsuarios();
    const { getProyectoById, changeEstadoProyecto, changeProgresoProyecto, removeMiembroProyecto } = useProyectos();
    const { getTareasByProyectoId } = useTareas();
    const [proyecto, setProyecto] = useState(null);
    const [miembros, setMiembros] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addTareasModal, setAddTareasModal] = useState(false)
    const [addParticipantesModal, setAddParticipantesModal] = useState(false)


    const handleProyecto = async () => {
        try {
            setLoading(true);
            const res = await getProyectoById(id);
            setProyecto(res.data.proyecto);
            setMiembros(res.data.miembros);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleTareas = async () => {
        try {
            setLoading(true);
            const res = await getTareasByProyectoId(id);
            await setTareas(res.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            handleProyecto();
        }
    }
    const handleEstadoProyecto = async (estado) => {
        try {
            setLoading(true);
            const res = await changeEstadoProyecto(id, estado);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUser = async () => {
        const user = await decodeToken();
        setUser(user);
    }

    useEffect(() => {
        handleProyecto();
        handleUser();
        handleTareas();
    }, []);

    useEffect(() => {
        handleProgreso();
    }, [tareas]);

    const calcularProgreso = async () => {

        let tareasRealizadas = 0;
        for (let tarea of tareas) {
            if (tarea.tarea.estado === 'finalizado') {
                tareasRealizadas++;
            }
        }
        const progreso = (tareasRealizadas / tareas.length) * 100;

        return progreso;
    }

    const handleProgreso = async () => {
        const progreso = await calcularProgreso();
        console.log('progreso', progreso)
        const res = await changeProgresoProyecto(id, progreso).then(res => {
            getTareasByProyectoId(id)
            handleProyecto();
        });

    }

    const handleDeleteMiembro = async (miembroId) => {
        try {
            setLoading(true);
            const res = await removeMiembroProyecto(id, miembroId);
            handleProyecto();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleVerTarea = async (tareaId, tarea) => {
        console.log('entrando ', tarea)
        if (tarea.tarea.estado === 'finalizado') {
            return router.push(`/tareas/${tareaId}`);
        }

        if (tarea.tarea.creadorId === user.usuarioid) {
            return router.push(`/tareas/${tareaId}`);
        }

        if (tarea.participantes.contains(user.usuarioid)) {
            return router.push(`/tareas/${tareaId}`);
        }

        Toast.show({
            title: 'No tienes permiso para ver esta tarea',
            description: 'No puedes ver esta tarea porque no eres el creador ni un participante',
            type: 'error',
            duration: 5000,
        });
    }




    return (
        <Layout>
            {proyecto && (
                < div className='grid grid-cols-12 mx-auto gap-1 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-10 max-w-7xl my-3 px-2'>
                    <div className="bg-white col-span-9 rounded-lg p-6 border-r m-2 ">
                        <div className="grid grid-cols-12">
                            <div className="col-span-8">
                                <Migas href="/" text={`${proyecto?.nombre}`} />
                            </div>
                            <div className="col-span-4 flex justify-end ">
                                <Dropdown label={'Cambiar Estado'} color="warning">
                                    <Dropdown.Item onClick={() => { handleEstadoProyecto('en progreso') }}>
                                        <EstadoView estado={"en progreso"} />
                                    </Dropdown.Item   >
                                    <Dropdown.Item onClick={() => { handleEstadoProyecto('finalizado') }} >
                                        <EstadoView estado={"finalizado"} />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleEstadoProyecto('cancelado') }}>
                                        <EstadoView estado={"cancelado"} />
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        </div>
                        <p className="text-black text-sm m-4 gap-2 ">{proyecto?.descripcion}</p>

                        <Tooltip content="Progreso" style="dark">
                            <Progress progress={proyecto?.progreso} color="yellow" labelProgress size="lg" className="my-2 gap-2 " />
                        </Tooltip>
                        <hr className="m-6" />
                        <h1 className="font-bold text-lg lg:text-3xl text-black  gap-2">
                            Tareas
                        </h1>
                        {
                            user?.usuarioid === proyecto?.creadorId && (
                                <div className=" flex justify-end ">
                                    <Tooltip content="Agregar Tarea">
                                        <ModalAddtareas id={user.usuarioid} openModal={addTareasModal} setOpenModal={setAddTareasModal} handleTareas={handleTareas} proyectoId={id} />
                                        <Button color="warning" className="mx-3" onClick={() => { setAddTareasModal(true) }}>
                                            <IoMdAddCircle />
                                        </Button>
                                    </Tooltip>
                                </div>
                            )
                        }
                        {!loading && tareas.length > 0 && (
                            <Table striped>
                                <Table.Head>
                                    <Table.HeadCell>Titulo</Table.HeadCell>
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
                                                {tarea.tarea?.titulo}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <EstadoView estado={tarea.tarea?.estado} />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Prioridad prioridad={tarea.tarea?.prioridad} />
                                            </Table.Cell>
                                            <Table.Cell>
                                                {new Date(tarea.tarea?.fecha).toLocaleDateString()}
                                            </Table.Cell>

                                            <Table.Cell className="flex justify-end">
                                                <Tooltip content="Ver">
                                                    <Button
                                                        className="w-50"
                                                        color="light"
                                                        onClick={() => { handleVerTarea(tarea.tarea.tareaId, tarea) }}
                                                    >
                                                        <IoMdSend className="h-6 w-6" color="black" />
                                                    </Button>
                                                </Tooltip>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        )}


                    </div>
                    <div className="bg-white col-span-3 rounded-lg p-6">
                        <h1 className="font-bold text-lg lg:text-3xl text-black  gap-2">
                            Detalles
                        </h1>
                        <Tooltip content="Estado" style="dark">
                            <EstadoView estado={proyecto?.estado} />
                        </Tooltip>
                        <Tooltip content="Creador" style="dark">
                            <span className="flex items-center gap-2 mb-4 my-4">
                                <HiOutlineUser />
                                <Usuario id={proyecto?.creadorId} className="text-black " />
                            </span>
                        </Tooltip>
                        <Tooltip content="fecha Inicio" style="dark">

                            <span className="flex items-center gap-2 mb-4">
                                <CiCalendarDate />
                                {proyecto?.fecha && (new Date(proyecto.fecha).toLocaleDateString())}
                            </span>
                        </Tooltip>
                        {proyecto?.fechaFinalizado && (
                            <Tooltip content="fecha Fin" style="dark">

                                <span className="flex items-center gap-2 mb-4">
                                    <CiCalendarDate />
                                    {new Date(proyecto.fechaFinalizado).toLocaleDateString()}
                                </span>
                            </Tooltip>
                        )}

                        <hr className="my-3" />
                        <div className="flex mb-5">
                            <h1 className="font-bold text-lg lg:text-3xl text-black  gap-2">
                                Participantes
                            </h1>
                            {proyecto?.creadorId === user?.usuarioid && (
                                <Tooltip content="Agregar Participante">
                                    <button
                                        type="button"
                                        onClick={() => setAddParticipantesModal(true)}
                                        className=" flex text-black   hover:bg-black-300 hover: focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
                                    >
                                        <IoMdAddCircle />
                                    </button>
                                    <ModalAddParticipantes openModal={addParticipantesModal} setOpenModal={setAddParticipantesModal} handleProyecto={handleProyecto} proyectoId={id} />
                                </Tooltip>
                            )

                            }
                        </div>
                        {miembros.map((miembro, index) => (
                            <Tooltip content={miembro.nombre} style="dark">
                                <span
                                    key={index}
                                    className=" flex justify-start gap-2 mb-4"
                                ><button
                                    type="button"
                                    onClick={() => { handleDeleteMiembro(miembro.usuarioId) }}
                                    class=" flex text-red-700   hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
                                >
                                        <MdDelete />
                                    </button>
                                    {miembro.nombre}

                                </span>
                            </Tooltip>
                        ))}



                    </div>
                </div>)}
        </Layout>
    );
}

export default withAuth(page);