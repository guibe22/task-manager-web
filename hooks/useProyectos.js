import React from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { URL } from '../utils/constants';


export default function useProyectos() {

    const createProyecto = async (Proyecto) => {
        const { nombre, descripcion, creadorId, fecha, estado,fechaFinalizado} = Proyecto
        try {
            const res = await axios.post(`${URL}/Proyectos`, { nombre, descripcion, creadorId, fecha, estado }, {
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
                
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getProyectoById = async (id) => {
        try {
            const res = await axios.get(`${URL}/Proyectos/${id}`, {
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getProyectos = async () => {
        try {
            const res = await axios.get(`${URL}/Proyectos`, {
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
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
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const updateProyecto = async (id, nombre, descripcion) => {
        try {
            const res = await axios.put(`${URL}/Proyectos/${id}`, { nombre, descripcion }, {
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const changeEstadoProyecto = async (id, estado) => {
        try {
            const res = await axios.put(`${URL}/Proyectos/estado/${id}?nuevoEstado=${estado}`, {
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const changeProgresoProyecto = async (id, nuevoProgreso) => {
        console.log('id en changeProgresoProyecto', id)
        console.log('nuevoProgreso en changeProgresoProyecto', nuevoProgreso)
        try {
            const res = await axios.put(`${URL}/Proyectos/progreso/${id}?nuevoProgreso=${nuevoProgreso}`, {
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }
    const addMiembroProyecto = async (ProyectoId, usuarioId) => {
        console.log('ProyectoId en addMiembroProyecto', ProyectoId)
        console.log('miembroId en addMiembroProyecto', usuarioId)
        const activo = true
        try {
            const res = await axios.post(`${URL}/MiembrosProyectos`, { ProyectoId, usuarioId, activo }, {
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const removeMiembroProyecto = async (proyectoId, usuarioId) => {
        try {
            const res = await axios.delete(`${URL}/MiembrosProyectos/ProyectoUsuario/${proyectoId}/${usuarioId}`, {
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getMiembrosProyecto = async (proyectoId) => {
        console.log('proyectoId en getMiembrosProyecto', proyectoId)
        try {
            const res = await axios.get(`${URL}/MiembrosProyectos/UsuariosPorProyecto/${proyectoId}`, {
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
            });

            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const getEstadisticasProyecto = async (usuarioId) => {
        try {
            const res = await axios.get(`${URL}/Proyectos/Estadisticas/${usuarioId}`, {
                withCredentials: false,
                referrerPolicy: 'unsafe-url' 
            });

            return res.data
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
        removeMiembroProyecto,
        getMiembrosProyecto,
        getEstadisticasProyecto
    }
}