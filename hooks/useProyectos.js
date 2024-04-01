import React from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { URL } from '../utils/constants';


export default function useProyectos(){

    const createProyecto = async (Proyecto ) => {
        const { nombre, descripcion, creadorId, fecha } = Proyecto
        try {
            const res = await axios.post(`${URL}/Proyectos`, { nombre, descripcion, creadorId, fecha }, {
                withCredentials: false
            });
        
        return res
    } catch (error) {
       console.error(error)
     }
    }

     const getProyectoById = async (id) => {
        try {
            const res = await axios.get(`${URL}/Proyectos/${id}`, {
                withCredentials: false
            });
    
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getProyectos = async () => {
        try {
            const res = await axios.get(`${URL}/Proyectos`, {
                withCredentials: false
            });
    
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getProyectosByUserId = async (usuarioId) => {
        console.log(usuarioId)
        try {
            const res = await axios.get(`${URL}/Proyectos/Usuarios/${usuarioId}`, {
                withCredentials: false
            });
    
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const updateProyecto = async (id, nombre, descripcion) => {
        try {
            const res = await axios.put(`${URL}/Proyectos/${id}`, { nombre, descripcion }, {
                withCredentials: false
            });
    
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const changeEstadoProyecto = async (id, estado) => {
        try {
            const res = await axios.put(`${URL}/Proyectos/estado/${id}`, { estado }, {
                withCredentials: false
            });
    
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const changeProgresoProyecto = async (id, nuevoProgreso) => {
        try {
            const res = await axios.put(`${URL}/Proyectos/progreso/${id}?nuevoProgreso=${nuevoProgreso}`, {
                withCredentials: false
            });
    
            return res
        } catch (error) {
            console.error(error)
        }
    }
    const addMiembroProyecto = async (id, miembroId) => {
        try {
            const res = await axios.post(`${URL}/Proyectos/miembros/${id}`, { miembroId }, {
                withCredentials: false
            });
    
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const removeMiembroProyecto = async (proyectoid, usuarioId) => {
        try {
            const res = await axios.delete(`${URL}/MiembrosProyectos`,{proyectoid,usuarioId}, {
                withCredentials: false
            });
    
            return res
        } catch (error) {
            console.error(error)
        }
    }

  

    return {
        createProyecto,
        getProyectoById,
        getProyectos,
        getProyectosByUserId,
        updateProyecto,
        addMiembroProyecto,
        changeEstadoProyecto,
        changeProgresoProyecto,
        removeMiembroProyecto
    }
}