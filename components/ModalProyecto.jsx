'use client';

import { Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import useProyectos from '../hooks/useProyectos';
import Toast from './Toast';


export default function ModalProyecto({ id, openModal, setOpenModal, handleProyectos }) {
    const { createProyecto } = useProyectos();

    const [proyecto, setProyecto] = useState({
        proyectoId: 0,
        nombre: "",
        descripcion: "",
        creadorId: id,
        estado: "recibido",
        progreso: 0,
        fecha: new Date(),

        activo: true
    });
    const handleSubmit = async () => {
        console.log(proyecto)
        try {
            const res = await createProyecto(proyecto);
            if (res.status === 200) {
                handleProyectos()
                Toast.fire({
                    icon: 'success',
                    title: 'Proyecto creado correctamente'
                });
                setOpenModal(false);
                setProyecto({
                    proyectoId: 0,
                    nombre: "",
                    descripcion: "",
                    creadorId: id,
                    estado: "recibido",
                    progreso: 0,
                    fecha: new Date(),
                    activo: true
                })
            }
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: 'error',
                title: 'Ocurrio un error creando el proyecto'
            });
        }
    }

    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Crear Proyecto</Modal.Header>
                <Modal.Body>
                    <div className="mb-4 flex flex-col gap-6">
                        <TextInput
                            label="Nombre"
                            placeholder="Nombre"
                            value={proyecto.nombre}
                            onChange={(e) => setProyecto({ ...proyecto, nombre: e.target.value })}
                        />
                        <Textarea
                            label="Descripcion"
                            placeholder="Descripcion"
                            value={proyecto.descripcion}
                            onChange={(e) => setProyecto({ ...proyecto, descripcion: e.target.value })}
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
