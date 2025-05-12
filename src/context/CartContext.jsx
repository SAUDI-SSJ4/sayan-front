import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // استخراج معرف السلة من الكوكيز
  const getCartCookieId = useCallback(() => {
    return Cookies.get('cart_id');
  }, []);

  // تهيئة الأكسيوس مع الهيدرز
  const getAxiosConfig = useCallback(() => {
    const token = Cookies.get('student_token');
    const cartId = getCartCookieId();
    
    const headers = {
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (cartId) {
      headers['TheCookie'] = cartId;
    }
    
    return { headers };
  }, [getCartCookieId]);

  // جلب محتويات السلة من الخادم
  const fetchCartItems = useCallback(async () => {
    // تجنب الاستدعاء المتكرر إذا كان التحميل جاري بالفعل
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await axios.get('https://www.sayan-server.com/api/v1/cart', getAxiosConfig());
      
      if (response.data && response.data.data) {
        setCartItems(response.data.data);
      }
    } catch (error) {
      console.error('خطأ في جلب محتويات السلة:', error);
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  }, [getAxiosConfig, loading]);

  // جلب محتويات السلة عند تحميل الصفحة أو تغيير معرف السلة
  useEffect(() => {
    const cartId = getCartCookieId();
    // تجنب الاستدعاء إذا لم يكن هناك معرف للسلة أو إذا تم التهيئة بالفعل
    if (cartId && !isInitialized && !loading) {
      fetchCartItems();
    }
  }, [getCartCookieId, fetchCartItems, isInitialized, loading]);

  const addToCart = useCallback(async (course) => {
    setLoading(true);
    
    try {
      const response = await axios.post('https://www.sayan-server.com/api/v1/cart/add', {
        item_type: 'course',
        item_id: course.id,
        quantity: 1
      }, getAxiosConfig());
      
      if (response.data && response.data.data && response.data.data.cookie_id) {
        // حفظ معرف السلة في الكوكيز
        Cookies.set('cart_id', response.data.data.cookie_id);
        
        // تحديث محتويات السلة
        const updatedResponse = await axios.get('https://www.sayan-server.com/api/v1/cart', getAxiosConfig());
        if (updatedResponse.data && updatedResponse.data.data) {
          setCartItems(updatedResponse.data.data);
        }
      }
    } catch (error) {
      console.error('خطأ في إضافة العنصر للسلة:', error);
    } finally {
      setLoading(false);
    }
  }, [getAxiosConfig]);

  const removeFromCart = useCallback(async (cartItemId) => {
    setLoading(true);
    
    try {
      await axios.delete(`https://www.sayan-server.com/api/v1/cart/delete/${cartItemId}`, getAxiosConfig());
      
      // تحديث محتويات السلة بعد الحذف
      const updatedResponse = await axios.get('https://www.sayan-server.com/api/v1/cart', getAxiosConfig());
      if (updatedResponse.data && updatedResponse.data.data) {
        setCartItems(updatedResponse.data.data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('خطأ في حذف العنصر من السلة:', error);
    } finally {
      setLoading(false);
    }
  }, [getAxiosConfig]);

  const clearCart = useCallback(async () => {
    setLoading(true);
    
    try {
      await axios.delete('https://www.sayan-server.com/api/v1/cart/clear', getAxiosConfig());
      
      // تفريغ السلة محلياً
      setCartItems([]);
    } catch (error) {
      console.error('خطأ في تفريغ السلة:', error);
    } finally {
      setLoading(false);
    }
  }, [getAxiosConfig]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 1), 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      fetchCartItems
    }}>
      {children}
    </CartContext.Provider>
  );
};
