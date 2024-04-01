'use client';

import { Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import useTareas from '../../../../hooks/useTareas';
import Select from 'react-select'
import { Prioridad, Toast } from '../../../../components';


export default function ModalAddtareas({ id, openModal, setOpenModal, handleTareas, proyectoId }) {
    const { createTarea } = useTareas()
    


    const [tarea, setTarea] = useState({
        titulo: "",
        descripcion: "",
        estado: "recibido",
        prioridad: "",
        creadorId: id,
        fecha: new Date(),
        fechaFinalizado: null,
        proyectoId: parseInt(proyectoId),
        activo : true
    })
    const handleSubmit = async () => {
        try {
            const res = await createTarea(tarea);
            if (res.status === 200) {
                handleTareas()
                Toast.fire({
                    icon: 'success',
                    title: 'Tarea creada correctamente'
                });
                setOpenModal(false);
                setTarea({
                    titulo: "",
                    descripcion: "",
                    estado: "recibido",
                    prioridad: "",
                    creadorId: id,
                    fecha: new Date(),
                    proyectoId: parseInt(proyectoId),
                    activo : true
                })

            }
        } catch (error) {
            
            Toast.fire({
                icon: 'error',
                title: 'Ocurrio un error creando la Tarea'
            });
            console.error(error);
        }
    }
    const prioridades = [
        { value: 'baja', label: <Prioridad prioridad="baja" /> },
        { value: 'media', label: <Prioridad prioridad="media" /> },
        { value: 'alta', label: <Prioridad prioridad="alta" /> }
    ]

    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Crear Tarea</Modal.Header>
                <Modal.Body>
                    <div className="mb-4 flex flex-col gap-6">
                        <TextInput
                            label="Titulo"
                            placeholder="Nombre"
                            value={tarea.nombre}
                            onChange={(e) => setTarea({ ...tarea, titulo: e.target.value })}
                        />
                        <Textarea
                            label="Descripcion"
                            placeholder="Descripcion"
                            value={tarea.descripcion}
                            onChange={(e) => setTarea({ ...tarea, descripcion: e.target.value })}
                        />
                        <Select
                            placeholder="Prioridad"
                            options={prioridades}
                            onChange={(e) => setTarea({ ...tarea, prioridad: e.value })}
                        />

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="warning" onClick={() => handleSubmit()}>
                        Crear
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
