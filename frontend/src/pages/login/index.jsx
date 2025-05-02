import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../context';
import Layout from '../../components/layout';

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

    const handleGitHubLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-80 transition-colors">
                    <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Login</h1>
                    <button
                        onClick={handleGitHubLogin}
                        className="w-full bg-gray-800 dark:bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                    >
                        Login with GitHub
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Login;