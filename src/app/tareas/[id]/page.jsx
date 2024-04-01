'use client'
import withAuth from "../../../../utils/withAuth";
import { Layout, Migas, EstadoView, Usuario, Prioridad } from "../../../../components";
import { useState, useEffect } from "react";
import useTareas from "../../../../hooks/useTareas";
import { Dropdown, Textarea, Button, Timeline, Tooltip } from "flowbite-react"
import useUsuarios from "../../../../hooks/useUsuarios";
import { setRequestMeta } from "next/dist/server/request-meta";
import { HiOutlineUser } from "react-icons/hi";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";
import ModalAddParticipantes from "./ModalAddParticipantes";
import { MdDelete } from "react-icons/md";

const page = ({ params }) => {
    const id = params.id;
    const [tarea, setTarea] = useState(null)
    const [user, setUser] = useState(null)
    const { decodeToken } = useUsuarios();
    const [comentarios, setComentarios] = useState([])
    const [addParticipantesModal, setAddParticipantesModal] = useState(false)
    const { getTareaById, getComentariosByTareaId, CreateComentario,removeParticipante, changeEstadoTarea } = useTareas()
    const [comentario, setComentario] = useState(
        {
            comentario: "",
            usuarioId: 0,
            tareaId: id,
            fecha: new Date(),
            activo: true

        }
    )
    const handleUser = async () => {
        const user = await decodeToken();
        setUser(user);
    }
    useEffect(() => {
        setComentario({ ...comentario, usuarioId: user?.usuarioid })
    }, [user])
    useEffect(() => {
        getTareaById(id).then(res => {
            setTarea(res.data)
        })
        getComentariosByTareaId(id).then(res => {
            const comentariosOrdenadosAlReves = res?.data ? res.data.reverse() : [];
            setComentarios(comentariosOrdenadosAlReves);
        })
        handleUser()
    }, [])

    const handleCreateComentario = async () => {


        CreateComentario(comentario).then(res => {
            getComentariosByTareaId(id).then(res => {
                const comentariosOrdenadosAlReves = res.data.reverse();
                setComentarios(comentariosOrdenadosAlReves);
            })
            setComentario({ ...comentario, comentario: "" })
        })
    }

    const handleChangeEstado = (estado) => {
        changeEstadoTarea(id, estado).then(res => {
            getTareaById(id).then(res => {
                setTarea(res.data)
            })
        })
    }
const handleDeleteParticipante = (usuarioId) => {
    removeParticipante(id,usuarioId).then(res => {
        getTareaById(id).then(res => {
            setTarea(res.data)
            Toast.fire({
                icon: 'success',
                title: 'Participante Eliminado correctamente'
            });
        })
    })
}




    return (
        <Layout>
            {tarea && (
                < div className='grid grid-cols-12 mx-auto gap-1 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-10 max-w-7xl my-3 px-2'>
                    <div className="bg-white col-span-9 rounded-lg p-6 border-r m-2 ">
                        <div className="grid grid-cols-12">
                            <div className="col-span-8">
                                <Migas href={`/proyecto/${tarea?.tarea?.proyectoId}`} text={`${tarea?.tarea?.titulo}`} />
                            </div>
                            <div className="col-span-4 flex justify-end  ">
                                <Dropdown label={'Cambiar Estado'} color="warning">
                                    <Dropdown.Item onClick={() => { handleChangeEstado("en progreso") }} >
                                        <EstadoView estado={"en progreso"} />
                                    </Dropdown.Item   >
                                    <Dropdown.Item onClick={() => { handleChangeEstado("finalizado") }}  >
                                        <EstadoView estado={"finalizado"} />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleChangeEstado("cancelado") }}>
                                        <EstadoView estado={"cancelado"} />
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        </div>
                        <hr className="m-6" />
                        <p className="text-black text-sm m-4 gap-2 ">{tarea?.tarea?.descripcion}</p>
                        <hr className="m-6" />
                        <h1 className="font-bold text-lg lg:text-3xl text-black  gap-2">
                            Comentarios
                        </h1>

                        <Textarea
                            placeholder="Escribe un comentario"
                            value={comentario.comentario}
                            onChange={(e) => setComentario({ ...comentario, comentario: e.target.value })}
                        />
                        <div className="flex justify-endflex justify-end">
                            <Button color="warning" className="my-3 " onClick={() => { handleCreateComentario() }} >
                                Comentar
                            </Button>
                        </div>

                        <Timeline>
                            {comentarios.map((comentario, index) => (
                                <Timeline.Item>
                                    <Timeline.Content>
                                        <Timeline.Time>{new Date(comentario?.fecha).toLocaleDateString()}</Timeline.Time>
                                        <Timeline.Title>{<Usuario id={comentario?.usuarioId} className="text-black " />}</Timeline.Title>
                                        <Timeline.Body>
                                            <p>{comentario?.comentario}</p>
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                            ))}

                        </Timeline>

                    </div>
                    <div className="bg-white col-span-3 rounded-lg p-6">
                        <h1 className="font-bold text-lg lg:text-3xl text-black  gap-2">
                            Detalles
                        </h1>
                        <Tooltip content="Estado">
                            <span className="flex items-center gap-2 mb-4 my-4">
                                <EstadoView estado={tarea?.tarea?.estado} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Prioridad">
                            <span className="flex items-center gap-2 mb-4 my-4">
                                <Prioridad prioridad={tarea?.tarea?.prioridad} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Creador" style="dark">
                            <span className="flex items-center gap-2 mb-4 my-4">
                                <HiOutlineUser />
                                <Usuario id={tarea?.tarea?.creadorId} className="text-black " />
                            </span>
                        </Tooltip>
                        <Tooltip content="fecha Inicio" style="dark">

                            <span className="flex items-center gap-2 mb-4">
                                <CiCalendarDate />
                                {tarea?.tarea?.fecha && (new Date(tarea?.tarea?.fecha).toLocaleDateString())}
                            </span>
                        </Tooltip>
                        {tarea?.tarea?.fechaFinalizado && (
                            <Tooltip content="fecha Fin" style="dark">

                                <span className="flex items-center gap-2 mb-4">
                                    <CiCalendarDate />
                                    {new Date(tarea?.tarea?.fechaFinalizado).toLocaleDateString()}
                                </span>
                            </Tooltip>
                        )}
                        <hr className="my-3" />
                        <div className="flex mb-5">
                            <h1 className="font-bold text-lg lg:text-3xl text-black  gap-2">
                                Participantes
                            </h1>
                            {tarea.tarea?.creadorId === user?.usuarioid && (
                                <Tooltip content="Agregar Participante">
                                    <button
                                        type="button"
                                         onClick={() => setAddParticipantesModal(true)}
                                        className=" flex text-black   hover:bg-black-300 hover: focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
                                    >
                                        <IoMdAddCircle />
                                    </button>
                                    <ModalAddParticipantes openModal={addParticipantesModal} setOpenModal={setAddParticipantesModal} setTarea={setTarea} TareaId={id} />
                                </Tooltip>
                            )

                            }
                        </div>

                        {tarea?.participantes.map((participante, index) => (
                            <Tooltip content={"participante"} style="dark">
                                <span
                                    key={index}
                                    className=" flex justify-start gap-2 mb-4"
                                ><button
                                    type="button"
                                    onClick={() => { handleDeleteParticipante(participante.usuarioId) }}
                                    class=" flex text-red-700   hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
                                >
                                        <MdDelete />
                                    </button>
                                    <Usuario id={participante.usuarioId} className="text-black " />

                                </span>
                            </Tooltip>
                        ))}






                    </div>
                </div>)}


        </Layout>
    )
}

export default withAuth(page);