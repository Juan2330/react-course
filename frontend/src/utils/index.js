/**
 * This function calculates total price of a new order
 * @param {Array} products cartProduct: Array of Objects
 * @returns {string} Total price formatted with 2 decimals
 */
export const totalPrice = (products) => {
    if (!Array.isArray(products)) return '0.00';
    return products
        .reduce((sum, product) => sum + (Number(product.price) || 0), 0)
        .toFixed(2);
};

/**
 * Formats a price to 2 decimal places
 * @param {number|string} price 
 * @returns {string}
 */
export const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
};