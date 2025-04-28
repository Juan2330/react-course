import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout';
import OrdersCard from '../../components/ordersCard';
import { ShoppingCartContext } from '../../context';

function MyOrders() {
    const context = useContext(ShoppingCartContext);

    return (
        <Layout>
            <div className='flex items-center justify-center relative w-80 mb-4'>
                <h1 className='font-medium text-xl dark:text-white'>My Orders</h1>
            </div>
            {
                context.order.length > 0 ? (
                    context.order.map((order, index) => (
                        <Link key={index} to={`/my-orders/${index}`}>
                            <OrdersCard 
                                date={order.date}
                                totalPrice={order.totalPrice} 
                                totalProducts={order.totalProducts} 
                            />
                        </Link>
                    ))
                ) : (
                    <div className='text-center py-10'>
                        <p className='text-gray-600 dark:text-gray-300'>No orders yet</p>
                    </div>
                )
            }
        </Layout>
    );
}

export default MyOrders;