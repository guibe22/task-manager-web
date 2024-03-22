
import React from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken';
import { URL, SECRET_KEY } from '../utils/constants';


export default function useUsuarios() {

    const Login = async (correo, contraseña) => {
        try {
            const res = await axios.post(`${URL}/Usuarios/Login`, { correo, contraseña }, {
                withCredentials: false
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const Register = async (usuario, nombre, correo, contraseña) => {
        try {
            const res = await axios.post(`${URL}/Usuarios`, { usuario, nombre, correo, contraseña }, {
                withCredentials: false
            });

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const getUsuarioById = async (id) => {
        try {

        } catch (error) {
            console.error(error)
        }
    }
    const decodeToken = async () => {
        const token = localStorage.getItem('tokenTaskManager')
        const secretKey = '+dz<3!3Q@_%]E)P]';

        const decodedToken = await jwt.verify(token, secretKey)
        console.log('decoded token',decodedToken);
        const usuario = {
            correo: decodedToken.correo,
            exp: decodedToken.exp,
            role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            nombre: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            usuario: decodedToken.usuario,
            usuarioid: decodedToken.usuarioid
        };
        console.log(usuario);
        return usuario;
    }


    return {
        Login,
        Register,
        getUsuarioById,
        decodeToken
    }
}