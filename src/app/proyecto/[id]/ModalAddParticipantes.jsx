'use client';

import { Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { use, useState, useEffect } from 'react';
import useProyectos from '../../../../hooks/useProyectos';
import Select from 'react-select'
import { Prioridad, Toast } from '../../../../components';
import useUsuarios from '../../../../hooks/useUsuarios';


export default function ModalAddParticipantes({ openModal, setOpenModal, handleProyecto, proyectoId }) {
    const { addMiembroProyecto } = useProyectos()
    const { getUsuarios } = useUsuarios()
    const [miembro, setMiembro] = useState(0)
    const [usuarios, setUsuarios] = useState([])

    const handleSubmit = async () => {
        try {
            const res = await addMiembroProyecto(proyectoId, miembro)
            if (res.status === 200) {
                handleProyecto()
                Toast.fire({
                    icon: 'success',
                    title: 'Miembro Agregado correctamente'
                });
                setOpenModal(false);

            }
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
            const res = await getUsuarios()


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
                            onChange={(e) => setMiembro(e.value)}
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
