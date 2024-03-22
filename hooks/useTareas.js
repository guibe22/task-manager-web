export default function useTareas() {

    const createTarea = async (titulo, descripcion, proyectoId, creadorId, prioridad) => {
        try {
            const res = await axios.post(`${URL}/Tareas`, { titulo, descripcion, proyectoId, creadorId, prioridad }, {
                withCredentials: false
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getTareaById = async (id) => {
        try {
            const res = await axios.get(`${URL}/Tareas/${id}`, {
                withCredentials: false
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getTareasByProyectoId = async (proyectoId) => {
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

    const changeEstadoTarea = async (id, estado) => {
        try {
            const res = await axios.put(`${URL}/Tareas/estado/${id}`, { estado }, {
                withCredentials: false
            });
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const addParticipante = async (tareaId, participanteId) => {
        try {
            const res = await axios.post(`${URL}/ParticipantesTareas`, { tareaId, participanteId }, {
                withCredentials: false
            });
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const removeParticipante = async (tareaId, participanteId) => {
        try {
            const res = await axios.delete(`${URL}/ParticipantesTareas/${tareaId}/${participanteId}`, {
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
        removeParticipante

    }
}