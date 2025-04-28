import { useContext } from 'react'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../context'

const Card = (data) => {
  const context = useContext(ShoppingCartContext)

  const showProduct = (productDetail) => {
    context.openProductDetail()
    context.setProductToShow(productDetail)
  }

  const addProductsToCart = (event, productData) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productData])
    context.openCheckoutSideMenu()
    context.closeProductDetail()
  }

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

    if (isInCart) {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'>
          <CheckIcon className='h-6 w-6 text-white'></CheckIcon>
        </div>
      )
    } else {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
          onClick={(event) => addProductsToCart(event, data.data)}>
          <PlusIcon className='h-6 w-6 text-black'></PlusIcon>
        </div>
      )
    }
  }

  return (
    <div
        className='bg-white dark:bg-gray-800 cursor-pointer w-fit h-fit overflow-hidden shadow-lg dark:shadow-gray-700/50 transition-all hover:scale-[1.02] hover:shadow-xl dark:hover:shadow-gray-600/50 group relative'
        onClick={() => showProduct(data.data)}>
        <figure className='relative mb-2 w-full h-4/5'>
            <span className='absolute bottom-0 left-0 bg-white/60 dark:bg-gray-700/80 rounded-lg text-black dark:text-white text-xs m-2 px-3 py-0.5'>
                {data.data.category.name}
            </span>
            <img 
                className='w-full h-full object-cover rounded-lg' 
                src={data.data.images[0]} 
                alt={data.data.title} 
            />
            {renderIcon(data.data.id)}
        </figure>
        <p className='flex justify-between px-2'>
            <span className='text-sm font-light dark:text-gray-300'>{data.data.title}</span>
        </p>
        <p className='flex justify-between px-2 pb-2'>
            <span className='text-black/60 dark:text-gray-400 text-2xl font-medium'>
                ${typeof data.data.price === 'number' ? data.data.price.toFixed(2) : parseFloat(data.data.price).toFixed(2)}
            </span>
        </p>
    </div>
  );
};

export default Card