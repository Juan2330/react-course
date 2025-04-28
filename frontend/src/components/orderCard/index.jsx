import { XMarkIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

const OrderCard = props => {
    const { id, title, imageUrl, price, handleDelete } = props;
    let renderXMarkIcon;
    
    if (handleDelete) {
        renderXMarkIcon = (
            <XMarkIcon 
                onClick={() => handleDelete(id)} 
                className='h-6 w-6 text-black dark:text-white cursor-pointer'
            />
        );
    }

    return (
        <div className="flex justify-between items-center mb-3">
            <div className='flex items-center gap-2'>
                <figure className='w-20 h-20'>
                    <img
                        className='w-full h-full rounded-lg object-cover'
                        src={imageUrl[0]}
                        alt={title}
                    />
                </figure>
                <p className='text-sm font-light dark:text-gray-300'>{title}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-lg font-medium dark:text-white'>
                    ${typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2)}
                </p>
                {renderXMarkIcon}
            </div>
        </div>
    );
};

OrderCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.array.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleDelete: PropTypes.func
};

export default OrderCard;