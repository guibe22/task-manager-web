import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
      // Verifica si el token existe en el LocalStorage
      const storedToken = localStorage.getItem('token');

      // Si no hay token, redirige al usuario al inicio de sesión
      if (!storedToken) {
        router.push('/login');
      } else {
        setToken(storedToken);
      }
    }, []);

    // Renderiza la página solo si el token existe, de lo contrario, no muestra nada
    return token ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;