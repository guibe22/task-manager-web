'use client';

import { Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { use, useState, useEffect } from 'react';
import useTareas from '../../../../hooks/useTareas';
import Select from 'react-select'
import { Prioridad, Toast } from '../../../../components';
import useProyectos from '../../../../hooks/useProyectos';


export default function ModalAddParticipantes({ openModal, setOpenModal, setTarea, TareaId, ProyectoId }) {
    const{addParticipante,getTareaById} = useTareas()
   const {getMiembrosProyecto} = useProyectos()
    const [Participante, setParticipante] = useState(0)
    const [usuarios, setUsuarios] = useState([])

    const handleSubmit = async () => {
        try {
            const res = await addParticipante(TareaId, Participante).then(res => {
                getTareaById(TareaId).then(res => {
                    setTarea(res.data)
                    setOpenModal(false);
                    Toast.fire({
                        icon: 'success',
                        title: 'Participante Agregado correctamente'
                    });
                })
            })
           
            
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: 'error',
                title: 'Ocurrio un error creando la Tarea'
            });
        }
    }
    const handleUsuarios = async () => {
        try {
            const res = await getMiembrosProyecto(ProyectoId)
            console.log(res)


            const usuarios = res.map(usuario => {
                return {
                    value: usuario.usuarioId,
                    label: usuario.nombre
                }
            })
            setUsuarios(usuarios)

            console.log(res)
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: 'error',
                title: 'Ocurrio un error obteniendo los usuarios'
            });
        }
    }
    useEffect(() => {
        handleUsuarios()
    }, [])



    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Agregar Usuario al Proyecto</Modal.Header>
                <Modal.Body>
                    <div className="mb-4 flex flex-col gap-6">
                        <Select
                            placeholder="Usuarios"
                            options={usuarios}
                            onChange={(e) => setParticipante(e.value)}
                        />

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="warning" onClick={() => handleSubmit()}>
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
