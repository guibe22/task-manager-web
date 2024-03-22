'use client'
import React from 'react'
import { Logo, Title, Text, Card, Button, Toast } from '../../../components/index'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Spinner, TextInput } from 'flowbite-react';
import Link from 'next/link'
import useUsuarios from '../../../hooks/useUsuarios';



const Login = () => {
	const router = useRouter();
	const { Register } = useUsuarios();

	const [loading, setLoading] = React.useState(false);
	const [user, setUser] = React.useState({
		usuario: '',
		nombre: '',
		correo: '',
		contraseña: '',
		repetirContraseña: ''
	});

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		
		if (user.contraseña !== user.repetirContraseña) {
			Toast.fire({
				icon: 'error',
				title: 'Las contraseñas no coinciden'
			})
			setLoading(false)
			return
		}
	
		try {
			const res = await Register(user.usuario, user.nombre, user.correo, user.contraseña)
			console.log(res)
			if (res.status === 200) {
				Toast.fire({
					icon: 'success',
					title: 'Usuario creado correctamente'
				})
				router.push('/login')
			}

		} catch (error) {
			Toast.fire({
				icon: 'error',
				title: 'Ocurrio un error creando el usuario'
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
							Crea un Usuario para acceder a la plataforma.
						</Text>
					</div>
				</div>


				<form className="mt-8 mb-2 sm:w-96" onSubmit={handleSubmit} >
					<div className="mb-4 flex flex-col gap-6">
						<TextInput
							placeholder="Usuario"
							onChange={(e) => setUser({ ...user, usuario: e.target.value })}
							required
						/>
						<TextInput
							placeholder="Nombre Completo"
							onChange={(e) => setUser({ ...user, nombre: e.target.value })}
							required
						/>
						<TextInput
							placeholder="Correo"
							onChange={(e) => setUser({ ...user, correo: e.target.value })}
							required
						/>
						<TextInput
							placeholder="Contraseña"
							onChange={(e) => setUser({ ...user, contraseña: e.target.value })}
							type="password"
							required
						/>
						<TextInput
							placeholder="Repetir Contraseña"
							onChange={(e) => setUser({ ...user, repetirContraseña: e.target.value })}
							type="password"
							required
						/>
					</div>

					<Button
						type='submit'
						data-ripple-light="true"
					>
						{loading ? <Spinner color="success" aria-label="Success spinner example" /> : 'Registrarse'}
					</Button>

				</form>

			</Card>
		</div>
	)
}
export default Login