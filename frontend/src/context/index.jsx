import { createContext, useState, useEffect } from 'react';
import PropTypes from "prop-types";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const [productToShow, setProductToShow] = useState({});
    const [cartProducts, setCartProducts] = useState([]);
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const [order, setOrder] = useState([]);
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)
    const [searchByTitle, setSearchByTitle] = useState(null)
    const [searchByCategory, setSearchByCategory] = useState(null)
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    const logout = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
          method: 'GET',
          credentials: 'include'
        });
        setUser(null);
        window.location.href = '/'; 
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    useEffect(() => {
      const checkAuth = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
              credentials: 'include' 
            });
            const data = await response.json();
            if (response.ok) {
              setUser(data);
            } else {
              setUser(null);
            }
          } catch (error) {
            console.error(error);
            setUser(null);
          }
        };
        checkAuth();
      }, []);

    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.filter((item) =>
            ['electronics', 'jewelery', "men's clothing", "women's clothing"].includes(item.category)
          );
          setItems(
            filteredData.map((item) => ({
              id: item.id,
              title: item.title,
              price: item.price,
              category: { name: item.category },
              description: item.description,
              images: [item.image],
            }))
          );
        });
    }, []);
    
    useEffect(() => {
      if (user) {
          const savedDarkMode = localStorage.getItem('darkMode');
          if (savedDarkMode) {
              setDarkMode(JSON.parse(savedDarkMode));
          }
      }
    }, [user]);

    const filteredItemsByTitle = (items, searchByTitle) => {
      return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase())) 
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
      return items?.filter(item => item.category.name.toLowerCase() === searchByCategory.toLowerCase());
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === 'BY_TITLE') {
        return filteredItemsByTitle(items, searchByTitle)
      }

      if (searchType === 'BY_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory)
      }

      if (searchType === 'BY_TITLE_AND_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory).filter(item =>
          item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        )
      }

      if (!searchType) {
        return items
      }
    }

    useEffect(() => {
      if (searchByTitle && searchByCategory) {
        setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory));
      } else if (searchByTitle && !searchByCategory) {
        setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory));
      } else if (!searchByTitle && searchByCategory) {
        setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory));
      } else {
        setFilteredItems(items);
      }
    }, [items, searchByTitle, searchByCategory])

    useEffect(() => {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrder(JSON.parse(savedOrders));
      }
    }, []);

    useEffect(() => {
      if (order.length > 0) {
        localStorage.setItem('orders', JSON.stringify(order));
      }
    }, [order]);

    useEffect(() => {
      
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [darkMode]);

    const totalPrice = (products) => {
      return products.reduce((sum, product) => sum + product.price, 0);
    };

    const handleCheckout = (products) => {
      const orderToAdd = {
        date: new Date().toLocaleDateString(),
        products,
        totalProducts: products.length,
        totalPrice: totalPrice(products)
      };

      const updatedOrders = [...order, orderToAdd];
      setOrder(updatedOrders);
      setCartProducts([]);
        setSearchByTitle(null);
      };

      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ShoppingCartContext.Provider value={{
          count,
          setCount,
          openProductDetail,
          closeProductDetail,
          isProductDetailOpen,
          productToShow,
          setProductToShow,
          cartProducts,
          setCartProducts,
          isCheckoutSideMenuOpen,
          openCheckoutSideMenu,
          closeCheckoutSideMenu,
          order,
          setOrder,
          items,
          setItems,
          searchByTitle, 
          setSearchByTitle,
          filteredItems,
          searchByCategory, 
          setSearchByCategory,
          user,
          setUser,
          logout,
          handleCheckout,
          darkMode,
          toggleDarkMode
        }}>
          {children}
        </ShoppingCartContext.Provider>
      );
};

ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};