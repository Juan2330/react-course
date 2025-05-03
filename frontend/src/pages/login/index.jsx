import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../context';

function Login() {
    const { setUser } = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
                    method: 'GET',
                    credentials: 'include', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    navigate('/');
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
            }
        };

        verifyAuth();
    }, [navigate, setUser]);


    return (
        <button
            className="border px-4 py-2 rounded-md bg-black text-white"
            onClick={() =>
                (window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`)
            }
        >
            Login with GitHub
        </button>
    );
}

export default Login;