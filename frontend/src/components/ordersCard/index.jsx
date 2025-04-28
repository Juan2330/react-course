import { ChevronRightIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

const OrdersCard = props => {
    const { date, totalPrice, totalProducts } = props;

    const formatDate = (dateString) => {
        if (!dateString) return 'No date';
        
        if (typeof dateString === 'string') {
            return dateString;
        }
        
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2);
    };

    return (
        <div className="flex justify-between items-center mb-3 border border-black dark:border-gray-600 rounded-lg p-4 w-80 hover:shadow-md dark:hover:shadow-gray-700/50 transition-shadow">
            <div className='flex justify-between w-full'>
                <p className='flex flex-col'>
                    <span className='font-light dark:text-gray-300'>{formatDate(date)}</span>
                    <span className='font-light dark:text-gray-400'>{totalProducts} items</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='font-medium text-2xl dark:text-white'>
                        ${formatPrice(totalPrice)}
                    </span>
                    <ChevronRightIcon className='h-6 w-6 text-black dark:text-white cursor-pointer'/>
                </p>
            </div>
        </div>
    );
};

OrdersCard.propTypes = {
    date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date)
    ]).isRequired,
    totalPrice: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    totalProducts: PropTypes.number.isRequired,
};

export default OrdersCard;