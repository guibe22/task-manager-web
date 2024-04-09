import axios from 'axios';
import { URL } from '../utils/constants';


export default function useTareas() {

    const createTarea = async (Tarea) => {
        console.log('Tarea en createTarea', Tarea)
        const { titulo, descripcion, proyectoId, estado, creadorId, prioridad, activo, fecha, fechaFinalizado} = Tarea
        try {
            const res = await axios.post(`${URL}/Tareas`, { titulo, descripcion, estado, proyectoId, creadorId, prioridad, activo, fecha}, {
                withCredentials: false
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getTareaById = async (id) => {
        try {
            const res = await axios.get(`${URL}/Tareas/${id}/Participantes`, {
                withCredentials: false
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getTareasByProyectoId = async (proyectoId) => {
        console.log( 'proyectoId en GetTareas',proyectoId)
        try {
            const res = await axios.get(`${URL}/Tareas/Proyectos/${proyectoId}`, {
                withCredentials: false
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getTareasByUserId = async (usuarioId) => {
        console.log('usuarioId en getTareasByUserId', usuarioId)
        try {
            const res = await axios.get(`${URL}/Tareas/Usuarios/${usuarioId}`, {
                withCredentials: false
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getTareaConParticipanteId = async (participanteId) => {
        try {
            const res = await axios.get(`${URL}/Tareas/${participanteId}/Participantes`, {
                withCredentials: false
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const changeEstadoTarea = async (id, nuevoEstado) => {
        console.log('id en changeEstadoTarea', id)
        console.log('nuevoEstado en changeEstadoTarea', nuevoEstado)
        try {
            const res = await axios.put(`${URL}/Tareas/estado/${id}?nuevoEstado=${nuevoEstado}`, {
                withCredentials: false
            });
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const addParticipante = async (tareaId, usuarioId) => {
        try {
            const activo = true
            const res = await axios.post(`${URL}/ParticipantesTareas`, { tareaId, usuarioId, activo }, {
                withCredentials: false
            });
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const removeParticipante = async (tareaId, usuarioId) => {
        try {
            const res = await axios.delete(`${URL}/ParticipantesTareas/Tarea/${tareaId}/Usuario/${usuarioId}`, {
                withCredentials: false
            });
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getComentariosByTareaId = async (tareaId) => {
        try {
            const res = await axios.get(`${URL}/Comentarios/ByTarea/${tareaId}`, {
                withCredentials: false
            });
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const CreateComentario = async (Comentario) => {
        const { comentario, usuarioId, tareaId, activo } = Comentario
        try {
            const res = await axios.post(`${URL}/Comentarios`, { comentario, usuarioId, tareaId, activo }, {
                withCredentials: false
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }




    return {
        createTarea,
        getTareaById,
        getTareasByProyectoId,
        getTareasByUserId,
        getTareaConParticipanteId,
        changeEstadoTarea,
        addParticipante,
        removeParticipante,
        getComentariosByTareaId,
        CreateComentario

    }
}