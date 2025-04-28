import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../context';
import './styles.css';

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext);

    return (
        <aside
            className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50`}>
            <div className='flex justify-between items-center p-4'>
                <h2 className='font-medium text-xl dark:text-white'>Detail</h2>
                <div>
                    <XMarkIcon
                        className='h-6 w-6 text-black dark:text-white cursor-pointer'
                        onClick={() => context.closeProductDetail()}/>
                </div>
            </div>
            <figure className='flex justify-center px-6'>
                <img
                    className='w-36 h-36 rounded-lg object-cover'
                    src={context.productToShow.images}
                    alt={context.productToShow.title} />
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-xl mb-2 dark:text-white'>
                    ${typeof context.productToShow.price === 'number' ? 
                      context.productToShow.price.toFixed(2) : 
                      parseFloat(context.productToShow.price).toFixed(2)}
                </span>
                <span className='font-medium text-md dark:text-gray-300'>
                    {context.productToShow.title}
                </span>
                <span className='font-light text-sm dark:text-gray-400'>
                    {context.productToShow.description}
                </span>
            </p>
        </aside>
    );
};

export default ProductDetail;