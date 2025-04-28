import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../context';

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = 'underline underline-offset-4';

  const handleToggleDarkMode = () => {
    console.log('Dark mode before toggle:', context.darkMode);
    context.toggleDarkMode();
  };

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm bg-white/80 dark:bg-gray-900/95 shadow-md backdrop-blur-sm transition-colors duration-300">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? 'text-black dark:text-white' : 'text-black dark:text-gray-300'
            }>
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) =>
              isActive ? activeStyle : 'text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }>
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => context.setSearchByCategory("electronics")} 
            className={({ isActive }) =>
              isActive ? activeStyle : 'text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }>
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jewelery"
            onClick={() => context.setSearchByCategory("jewelery")} 
            className={({ isActive }) =>
              isActive ? activeStyle : 'text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }>
            Jewelery
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/men's clothing"
            onClick={() => context.setSearchByCategory("men's clothing")} 
            className={({ isActive }) =>
              isActive ? activeStyle : 'text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }>
            Men&#39;s clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/women's clothing"
            onClick={() => context.setSearchByCategory("women's clothing")} 
            className={({ isActive }) =>
              isActive ? activeStyle : 'text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }>
            Women&#39;s clothing
          </NavLink>
        </li>
      </ul>

      <ul className="flex items-center gap-3">
        {context.user ? (
          <>
            <li className="text-black/80 dark:text-gray-300">
              {context.user.emails?.[0]?.value || context.user.username}
            </li>
            <li>
              <NavLink
                to="/my-orders"
                className={({ isActive }) =>
                  isActive ? activeStyle : 'text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white'
                }>
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-account"
                className={({ isActive }) =>
                  isActive ? activeStyle : 'text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white'
                }>
                My Account
              </NavLink>
            </li>
            <li>
              <button 
                onClick={handleToggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={context.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {context.darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </li>
            <li>
              <button 
                onClick={() => context.logout()}
                className="text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? activeStyle : 'text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }>
              Login
            </NavLink>
          </li>
        )}
        <li className="flex items-center gap-1">
          <ShoppingBagIcon className="h-6 w-6 text-black dark:text-white"/>
          <span className="text-black dark:text-white">{context.cartProducts.length}</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;