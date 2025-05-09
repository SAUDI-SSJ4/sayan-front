import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (course) => {
    const token = Cookies.get('student_token');
    
    /* Make API call to add item to cart */
    try {
      const response = await axios.post('https://www.sayan-server.com/api/v1/cart/add', {
        course_id: course.id,
        quantity: 1
      }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (response) {
        // document.cookie = `cart_id=${response.data.cookie_id}; path=/`;
        console.log("response: ", response.data.data.cookie_id);
        Cookies.set('cart_id', response.data.data.cookie_id);
      }

    } catch (error) {
      console.error('Error adding item to cart:', error);
      return;
    }
    

    setCartItems(prevItems => {
      // Check if course is already in cart
      const exists = prevItems.some(item => item.id === course.id);
      if (exists) {
        return prevItems;
      }
      return [...prevItems, course];
    });
  };

  const removeFromCart = async (courseId) => {
    /*
    https://www.sayan-server.com/api/v1/cart/remove/{cart_item_id}
    */
   
    const token = Cookies.get('student_token');

    /* Make API call to add item to cart */
    try {
      const response = await axios.delete(`https://www.sayan-server.com/api/v1/cart/delete/${courseId}`, {}, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (response) {
        // document.cookie = `cart_id=${response.data.cookie_id}; path=/`;
        console.log("response:", response );
      }

    } catch (error) {
      console.error('Error Removing item to cart:', error);
      return;
    }


    setCartItems(prevItems => prevItems.filter(item => item.id !== courseId));
  };

  const clearCart = async () => {
    /*
    https://www.sayan-server.com/api/v1/cart/clear
    */



    const token = Cookies.get('student_token');

    /* Make API call to add item to cart */
    try {
      const response = await axios.delete(`https://www.sayan-server.com/api/v1/cart/clear`, {}, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (response) {
        // document.cookie = `cart_id=${response.data.cookie_id}; path=/`;
        console.log("response:", response );
      }

    } catch (error) {
      console.error('Error Removing item to cart:', error);
      return;
    }




    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
