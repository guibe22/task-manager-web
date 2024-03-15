'use client'
import React from 'react'
import { Logo, Title, Text, Card, Button,Toast } from '../../../components/index'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Spinner ,TextInput} from 'flowbite-react';
import Link from 'next/link'
import useUsuarios from '../../../hooks/useUsuarios';



const Login = () =>{
	const router = useRouter();
	const {Login} = useUsuarios();
    
	const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        Correo: '',
        Contraseña: ''
    });

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await Login(user.Correo, user.Contraseña)
			console.log(res)
			if (res.status === 200) {
				localStorage.setItem('token', res.token)
				router.push('/')
			}

		} catch (error) {
			Toast.fire({
				icon: 'error',
				title: 'Usuario o contraseña incorrectos'
			})
			console.error(error)
		} finally {
			setLoading(false);
		  }

	}
	return (

		<div className="flex min-h-screen items-center justify-center bg-gray-200">
			<Card >
				<div className="mt-6 gap-4">
					<div className='flex flex-col items-center justify-center'>
						<Logo h={'40px'} />
						<Title title="Do It" />
						<Text>
							Ingresa tus credenciales para acceder a la plataforma.
						</Text>
					</div>
				</div>


				<form className="mt-8 mb-2 sm:w-96" onSubmit={handleSubmit} >
					<div className="mb-4 flex flex-col gap-6">
						 <TextInput
							placeholder="Usuario o Correo"
							onChange={(e) => setUser({ ...user, Correo: e.target.value })}
						/>
						<TextInput
							placeholder="Contraseña"
							onChange={(e) => setUser({ ...user, Contraseña: e.target.value })}
							type="password"
						/> 
						<Link className="text-md text-center text-yellow-500 underline" href={"/"}>No tienes Usuario? ¡Regístrate!</Link>
					</div>

					<Button
						type='submit'
						data-ripple-light="true"
					>
						{loading ? <Spinner color="success" aria-label="Success spinner example" /> : 'Ingresar'}
					</Button>

				</form>

			</Card>
		</div>
	)
}
export default Login