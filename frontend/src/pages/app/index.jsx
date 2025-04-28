import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ShoppingCartProvider } from '../../context/index';
import Home from '../home';
import MyAccount from '../myAccount';
import MyOrder from '../myOrder';
import MyOrders from '../myOrders';
import NotFound from '../notFound';
import Login from '../login';
import Navbar from '../../components/navbar';
import CheckoutSideMenu from '../../components/checkoutSideMenu';
import './App.css';

const AppRoutes = () => {
    let routes = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/electronics", element: <Home /> },
        { path: "/jewelery", element: <Home /> },
        { path: "/men's clothing", element: <Home /> },
        { path: "/women's clothing", element: <Home /> },
        { path: '/my-account', element: <MyAccount /> },
        { path: '/my-order', element: <MyOrder /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/my-orders/last', element: <MyOrder /> },
        { path: '/my-orders/:id', element: <MyOrder /> },
        { path: '/login', element: <Login /> },
        { path: '/*', element: <NotFound /> },
    ]);

    return routes;
};

const App = () => {
    return (
        <ShoppingCartProvider>
            <BrowserRouter>
                <AppRoutes />
                <Navbar />
                <CheckoutSideMenu />
            </BrowserRouter>
        </ShoppingCartProvider>
    );
};

export default App;