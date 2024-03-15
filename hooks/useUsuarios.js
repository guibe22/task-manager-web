
import React from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { URL } from '../utils/constants';


export default function useUsuarios() {

    const Login =  async (correo, contraseña) =>{
        try {
            const res = await axios.post(`${URL}/Api/Usuarios/Login`, { correo, contraseña }, {
                withCredentials: false
            });

        const accessControlAllowOrigin = res.headers['access-control-allow-origin'];

        if (accessControlAllowOrigin) {
            console.log('Encabezado Access-Control-Allow-Origin:', accessControlAllowOrigin);
        } else {
            console.log('El encabezado Access-Control-Allow-Origin no está presente.');
        }
        
        return res
} catch (error) {
   console.error(error)
 }
}

    return {
        Login
    }
}