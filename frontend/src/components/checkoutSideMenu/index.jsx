import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../context'
import OrderCard from '../orderCard'
import { totalPrice } from '../../utils'
import './styles.css'

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext)

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(product => product.id != id)
    context.setCartProducts(filteredProducts)
  }

  const handleCheckout = () => {
    const now = new Date();
    const orderToAdd = {
      date: now.toLocaleDateString('en-US', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),

      timestamp: now.getTime(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
  };

    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.closeCheckoutSideMenu();
  }

  return (
    <aside
        className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50`}>
        <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl dark:text-white'>My Order</h2>
            <div>
                <XMarkIcon
                    className='h-6 w-6 text-black dark:text-white cursor-pointer'
                    onClick={() => context.closeCheckoutSideMenu()}/>
            </div>
        </div>
        <div className='px-6 overflow-y-scroll flex-1'>
            {context.cartProducts.map(product => (
                <OrderCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    imageUrl={product.images}
                    price={product.price}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
        <div className='px-6 mb-6'>
            <p className='flex justify-between items-center mb-2'>
                <span className='font-light dark:text-gray-300'>Total:</span>
                <span className='font-medium text-2xl dark:text-white'>
                    ${totalPrice(context.cartProducts)}
                </span>
            </p>
            <Link to='/my-orders/last'>
                <button 
                    className='bg-black dark:bg-gray-700 py-3 text-white w-full rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors'
                    onClick={handleCheckout}>
                    Checkout
                </button>
            </Link>
        </div>
    </aside>
  );
};

export default CheckoutSideMenu