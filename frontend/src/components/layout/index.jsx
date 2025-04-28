import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ShoppingCartContext } from '../../context';

const Layout = ({ children }) => {
    const context = useContext(ShoppingCartContext);
    
    Layout.propTypes = {
        children: PropTypes.node.isRequired,
    }
    
    return (
        <div className={`flex flex-col items-center mt-20 ${context.darkMode ? 'dark' : ''}`}>
            {children}
        </div>
    );
};

export default Layout;