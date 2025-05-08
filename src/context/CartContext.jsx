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
    if (!Cookies.get('cart_id')) {
      const randomId = `cart_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      Cookies.set('cart_id', randomId, { path: '/' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (course) => {
    const token = Cookies.get('student_token');
    const cart_id = Cookies.get('cart_id');
    
    if (!cart_id) {
      const randomId = `cart_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      Cookies.set('cart_id', randomId, { path: '/' });
    }
    
    try {
      const headers = {
        'Accept': 'application/json',
        'TheCookie': `cart_id=${Cookies.get('cart_id')}`
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await axios.post('https://www.sayan-server.com/api/v1/cart/add', {
        item_id: course.id,
        item_type: "course",
        quantity: 1
      }, { headers });
      
      if (response && response.data && response.data.data) {
        if (response.data.data.cookie_id) {
          Cookies.set('cart_id', response.data.data.cookie_id, { path: '/' });
        }
      }

    } catch (error) {
      console.error('Error adding item to cart:', error);
      return;
    }
    
    setCartItems(prevItems => {
      const exists = prevItems.some(item => item.id === course.id);
      if (exists) {
        return prevItems;
      }
      return [...prevItems, course];
    });
  };

  const removeFromCart = async (courseId) => {
    const token = Cookies.get('student_token');
    const cart_id = Cookies.get('cart_id');

    if (!cart_id) {
      console.error('No cart ID found');
      return;
    }

    try {
      const getCartResponse = await axios.get('https://www.sayan-server.com/api/v1/cart', {
        headers: {
          'Accept': 'application/json',
          'TheCookie': `cart_id=${cart_id}`
        }
      });
      
      const cartItem = getCartResponse.data.data.find(item => item.item_id === courseId);
      
      if (!cartItem) {
        console.error(`Cart item with course ID ${courseId} not found`);
        setCartItems(prevItems => prevItems.filter(item => item.id !== courseId));
        return;
      }
      
      const headers = {
        'Accept': 'application/json',
        'TheCookie': `cart_id=${cart_id}`
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      await axios.delete(`https://www.sayan-server.com/api/v1/cart/delete/${cartItem.cart_id}`, { 
        headers 
      });
      
      console.log(`Item ${courseId} successfully removed from cart`);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }

    setCartItems(prevItems => prevItems.filter(item => item.id !== courseId));
  };

  const clearCart = async () => {
    const token = Cookies.get('student_token');
    const cart_id = Cookies.get('cart_id');

    if (!cart_id) {
      console.error('No cart ID found');
      return;
    }

    try {
      const headers = {
        'Accept': 'application/json',
        'TheCookie': `cart_id=${cart_id}`
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      await axios.delete('https://www.sayan-server.com/api/v1/cart/clear', { headers });
    } catch (error) {
      console.error('Error clearing cart:', error);
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
