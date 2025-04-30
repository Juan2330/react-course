/**
 * This function calculates total price of a new order
 * @param {Array} products cartProduct: Array of Objects
 * @returns {string} Total price formatted with 2 decimals
 */
export const totalPrice = (products) => {
    return products.reduce((sum, product) => sum + product.price, 0).toFixed(2);
};

/**
 * Formats a price to 2 decimal places
 * @param {number|string} price 
 * @returns {string}
 */
export const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
};