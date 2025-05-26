import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiTool, 
  FiFileText, 
  FiCheck, 
  FiAlertCircle, 
  FiPlus, 
  FiEdit2, 
  FiTrash2,
  FiSave,
  FiX,
  FiImage,
  FiList,
  FiRotateCw
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useToast } from "../../../../../../utils/hooks/useToast";
import {
  editLesson,
  postLessonTools,
  deleteLessonTools,
  editLessonTools
} from "../../../../../../utils/apis/client/academy";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";
import { Button } from "react-bootstrap";

const TOOL_TYPES = {
  ORDERING: 'ordering',
  FLIPPING: 'flipping_cards'
};

const InteractiveToolForm = ({ lesson, courseId, chapterId, onClose }) => {
  // Hooks
  const dispatch = useDispatch();
  const { success, error } = useToast();

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [toolType, setToolType] = useState(null);
  const [lessonTitle, setLessonTitle] = useState(lesson?.title || "");
  const [isToolTypeLocked, setIsToolTypeLocked] = useState(false);

  // Effects
  useEffect(() => {
    console.log("InteractiveToolForm - Received lesson:", lesson);
    console.log("InteractiveToolForm - Lesson tools:", lesson?.tools);
    if (lesson?.tools && Array.isArray(lesson.tools) && lesson.tools.length > 0) {
      console.log("InteractiveToolForm - Loading existing tools:", lesson.tools);
      setCards(lesson.tools);
      
      // Use the reevaluate function for consistency
      reevaluateToolType(lesson.tools);
      
      setShowAddCard(false);
    } else {
      console.log("InteractiveToolForm - No tools found, starting with empty array");
      setCards([]);
      setToolType(null);
      setIsToolTypeLocked(false);
      setShowAddCard(true);
    }
    setLessonTitle(lesson?.title || "");
  }, [lesson]);

  // Formik and Validation
  const getValidationSchema = (type) => {
    if (type === TOOL_TYPES.ORDERING) {
      return Yup.object({
        title: Yup.string().max(200, "حد أقصى 200 حرف").required("التعريف مطلوب"),
        content: Yup.string().required("المحتوى مطلوب"),
        order: Yup.number().required("الترتيب مطلوب").min(1, "الترتيب يجب أن يكون أكبر من 0"),
        color: Yup.string().max(10, "حد أقصى 10 أحرف"),
      });
    } else if (type === TOOL_TYPES.FLIPPING) {
      return Yup.object({
        title: Yup.string().max(200, "حد أقصى 200 حرف").required("التعريف مطلوب"),
        content: Yup.string().required("المحتوى مطلوب"),
        image: Yup.mixed().test('image-required', 'الصورة مطلوبة', function(value) {
          // إذا كنا في وضع التعديل وكانت هناك صورة موجودة مسبقاً، فالصورة الجديدة اختيارية
          if (editingCard && editingCard.image && typeof editingCard.image === 'string') {
            return true; // الصورة موجودة مسبقاً، لا حاجة لصورة جديدة
          }
          // إذا لم تكن هناك صورة موجودة، فالصورة مطلوبة
          return value != null;
        }),
        color: Yup.string().max(10, "حد أقصى 10 أحرف"),
      });
    }
    return Yup.object({});
  };

  const getInitialValues = (type) => {
    return {
      title: "",
      content: "",
      image: null,
      color: "#007bff",
      order: type === TOOL_TYPES.ORDERING ? (cards.length > 0 ? Math.max(...cards.map(c => c.order || 0), 0) + 1 : 1) : undefined,
      type: type
    };
  };

  const cardFormik = useFormik({
    initialValues: toolType ? getInitialValues(toolType) : {},
    validationSchema: toolType ? getValidationSchema(toolType) : Yup.object({}),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      console.log("InteractiveToolForm - Submitting card:", values);
      
      try {
        const formData = new FormData();
        const dataToSend = { ...values, description: values.content };
        
        Object.entries(dataToSend).forEach(([key, value]) => {
          if (key === 'image') {
            // التعامل مع الصورة بشكل خاص
            if (value && value instanceof File) {
              // صورة جديدة تم اختيارها
              formData.append(key, value);
            } else if (editingCard && !value && editingCard.image) {
              // لا توجد صورة جديدة، والصورة الحالية موجودة - لا نرسل شيء
              // السيرفر سيحتفظ بالصورة الحالية
            }
            // إذا لم تكن هناك صورة جديدة ولا صورة حالية، فلن نرسل شيء
          } else if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });

        let res;
        if (editingCard) {
          console.log("InteractiveToolForm - Editing existing card:", editingCard.id);
          formData.append('_method', 'PUT');
          res = await editLessonTools(lesson.id, editingCard.id, formData);
        } else {
          console.log("InteractiveToolForm - Adding new card to lesson:", lesson.id);
          res = await postLessonTools(lesson.id, formData);
        }
        
        console.log("InteractiveToolForm - API response:", res);

        if (res.status) {
          if (editingCard) {
            setCards(cards.map(card => card.id === editingCard.id ? { ...res.data, ...values } : card ));
            success("تم تعديل البطاقة بنجاح");
          } else {
            const newCardData = res.data || { ...values, id: Date.now() };
            setCards([...cards, newCardData]);
            success("تم إضافة البطاقة بنجاح");
            if (!toolType) {
              setToolType(values.type);
              if (values.type === TOOL_TYPES.ORDERING) {
                setIsToolTypeLocked(true);
              }
            }
          }
          setEditingCard(null);
          resetForm();
          setShowAddCard(false);
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
        } else {
          throw new Error(res.message || `فشل في ${editingCard ? 'تعديل' : 'إضافة'} البطاقة`);
        }
      } catch (err) {
        console.error("InteractiveToolForm - Error saving card:", err);
        error(err.message || `حدث خطأ أثناء ${editingCard ? 'تعديل' : 'إضافة'} البطاقة`);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Handlers
  const handleSaveLessonTitle = async () => {
    if (!lessonTitle.trim()) {
      error("اسم الدرس مطلوب");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', lessonTitle);
      formData.append('_method', 'PUT');
      const res = await editLesson({ courseId, chapterId, lessonId: lesson.id }, formData);
      if (res.status) {
        success("تم تحديث اسم الدرس بنجاح");
        dispatch(fetchCurrentCourseSummaryThunk(courseId));
      } else {
        throw new Error(res.message || "فشل في تحديث اسم الدرس");
      }
    } catch (err) {
      console.error("Error updating lesson title:", err);
      error(err.message || "حدث خطأ أثناء تحديث اسم الدرس");
    }
  };

  const handleEditCard = (card) => {
    console.log("InteractiveToolForm - Editing card:", card);
    console.log("InteractiveToolForm - Card image path:", card.image);
    console.log("InteractiveToolForm - Server URL:", import.meta.env.VITE_SERVER_DEV);
    
    setEditingCard(card);
    
    // تحديد نوع الأداة بناءً على البطاقة المحررة
    const cardType = isValidOrderValue(card.order) ? TOOL_TYPES.ORDERING : TOOL_TYPES.FLIPPING;
    
    cardFormik.setValues({
      title: card.title || "",
      content: card.content || card.description || "",
      image: card.image || null, // الاحتفاظ بمسار الصورة الموجودة
      color: card.color || "#007bff",
      order: card.order || 1,
      type: cardType
    });
    
    // طباعة المسارات المحتملة للصورة
    if (card.image) {
      console.log("Possible image URLs:", {
        withStorage: `${import.meta.env.VITE_SERVER_DEV}storage/${card.image}`,
        withoutStorage: `${import.meta.env.VITE_SERVER_DEV}${card.image}`,
        direct: card.image
      });
    }
    
    setShowAddCard(true);
  };

  const handleDeleteCard = async (cardId) => {
    console.log("InteractiveToolForm - Deleting card:", cardId);
    if (window.confirm("هل أنت متأكد من حذف هذه البطاقة؟")) {
      try {
        const res = await deleteLessonTools(lesson.id, cardId);
        console.log("InteractiveToolForm - Delete response:", res);
        if (res.status) {
          const newCards = cards.filter(card => card.id !== cardId);
          setCards(newCards);
          success("تم حذف البطاقة بنجاح");
          
          // Re-evaluate tool type after deletion
          reevaluateToolType(newCards);
          
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
        } else {
          throw new Error(res.message || "فشل في حذف البطاقة");
        }
      } catch (err) {
        console.error("InteractiveToolForm - Error deleting card:", err);
        error(err.message || "حدث خطأ أثناء حذف البطاقة");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
    setShowAddCard(false);
    cardFormik.resetForm();
  };

  const handleSelectToolType = (type) => {
    if (isToolTypeLocked && toolType === TOOL_TYPES.ORDERING) {
      error("لا يمكن تغيير نوع الأداة إذا كانت الأداة الأولى هي بطاقات ترتيب.");
      return;
    }
    setToolType(type);
    cardFormik.setValues(getInitialValues(type));
    if (type === TOOL_TYPES.ORDERING && cards.length === 0) {
      setIsToolTypeLocked(true);
    }
    setShowAddCard(true);
  };

  const handleAddNewCard = () => {
    setEditingCard(null);
    cardFormik.resetForm();
    
    // Auto-detect tool type based on existing cards
    let detectedType = toolType;
    
    if (!detectedType && cards.length > 0) {
      const hasValidOrderField = cards.some(card => isValidOrderValue(card.order));
      console.log("=== Auto-detection in handleAddNewCard ===");
      console.log("Cards:", cards.map(card => ({ id: card.id, title: card.title, order: card.order, isValidOrder: isValidOrderValue(card.order) })));
      console.log("Has valid order field:", hasValidOrderField);
      
      if (hasValidOrderField) {
        detectedType = TOOL_TYPES.ORDERING;
        setToolType(TOOL_TYPES.ORDERING);
        setIsToolTypeLocked(true);
        console.log("InteractiveToolForm - Auto-detected ordering type");
      } else {
        detectedType = TOOL_TYPES.FLIPPING;
        setToolType(TOOL_TYPES.FLIPPING);
        setIsToolTypeLocked(false);
        console.log("InteractiveToolForm - Auto-detected flipping type");
      }
    }
    
    // Set form values based on detected type
    if (detectedType) {
      cardFormik.setValues(getInitialValues(detectedType));
      console.log("Setting form values for type:", detectedType);
    } else {
      cardFormik.setValues({});
    }
    
    setShowAddCard(true);
  };

  const handleInputFocus = (e, fieldName) => {
    if (!cardFormik.errors[fieldName]) {
      e.target.style.borderColor = '#0062ff';
      e.target.style.boxShadow = '0 0 0 3px rgba(0, 98, 255, 0.1)';
    }
  };

  const handleInputBlur = (e, fieldName) => {
    cardFormik.handleBlur(e);
    e.target.style.borderColor = cardFormik.touched[fieldName] && cardFormik.errors[fieldName] ? '#ef4444' : '#e2e8f0';
    e.target.style.boxShadow = 'none';
  };

  // Helper Functions
  const isValidOrderValue = (orderValue) => {
    // Check if order value is a valid positive number
    if (orderValue === undefined || orderValue === null || orderValue === "") {
      return false;
    }
    const numValue = Number(orderValue);
    return !isNaN(numValue) && numValue > 0;
  };

  const reevaluateToolType = (cardsList) => {
    if (!cardsList || cardsList.length === 0) {
      setToolType(null);
      setIsToolTypeLocked(false);
      return;
    }

    const hasValidOrderField = cardsList.some(card => isValidOrderValue(card.order));
    console.log("=== Re-evaluating tool type ===");
    console.log("Cards:", cardsList.map(card => ({ id: card.id, title: card.title, order: card.order, isValidOrder: isValidOrderValue(card.order) })));
    console.log("Has valid order field:", hasValidOrderField);

    if (hasValidOrderField) {
      setToolType(TOOL_TYPES.ORDERING);
      setIsToolTypeLocked(true);
      console.log("Re-evaluated as ordering type");
    } else {
      setToolType(TOOL_TYPES.FLIPPING);
      setIsToolTypeLocked(false);
      console.log("Re-evaluated as flipping type");
    }
  };

  const isOrderDuplicate = (order) => {
    if (toolType !== TOOL_TYPES.ORDERING) return false;
    const editingId = editingCard?.id;
    return cards.some(card => card.order === order && card.id !== editingId);
  };

  // Render Functions
  const renderAddCardForm = () => {
    const orderDuplicate = toolType === TOOL_TYPES.ORDERING && isOrderDuplicate(Number(cardFormik.values.order));
    return (
      <form onSubmit={cardFormik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* التعريف */}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>التعريف</label>
          <input
            type="text"
            name="title"
            placeholder="أدخل تعريف الأداة"
            value={cardFormik.values.title || ''}
            onChange={cardFormik.handleChange}
            onFocus={(e) => handleInputFocus(e, 'title')}
            onBlur={(e) => handleInputBlur(e, 'title')}
            style={{ width: '100%', padding: '12px 14px', border: `2px solid ${cardFormik.touched.title && cardFormik.errors.title ? '#ef4444' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '14px', backgroundColor: 'white', transition: 'all 0.3s ease', outline: 'none' }}
          />
          {cardFormik.touched.title && cardFormik.errors.title && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', color: '#ef4444', fontSize: '12px' }}>
              <FiAlertCircle size={12} />
              {cardFormik.errors.title}
            </div>
          )}
        </div>

        {/* المحتوى (يظهر في كلا النوعين) */}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>المحتوى</label>
          <textarea
            name="content"
            placeholder="أدخل محتوى الأداة"
            value={cardFormik.values.content || ''}
            onChange={cardFormik.handleChange}
            onFocus={(e) => handleInputFocus(e, 'content')}
            onBlur={(e) => handleInputBlur(e, 'content')}
            rows={3}
            style={{ width: '100%', padding: '12px 14px', border: `2px solid ${cardFormik.touched.content && cardFormik.errors.content ? '#ef4444' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '14px', backgroundColor: 'white', transition: 'all 0.3s ease', outline: 'none', resize: 'vertical' }}
          />
          {cardFormik.touched.content && cardFormik.errors.content && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', color: '#ef4444', fontSize: '12px' }}>
              <FiAlertCircle size={12} />
              {cardFormik.errors.content}
            </div>
          )}
        </div>

        {/* الترتيب فقط في بطاقات الترتيب */}
        {toolType === TOOL_TYPES.ORDERING && (
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
              الترتيب (مطلوب ويبدأ من 1)
            </label>
            <input
              type="number"
              name="order"
              placeholder="أدخل ترتيب البطاقة"
              value={cardFormik.values.order || ''}
              onChange={cardFormik.handleChange}
              onFocus={(e) => handleInputFocus(e, 'order')}
              onBlur={(e) => handleInputBlur(e, 'order')}
              min="1"
              style={{ width: '100%', padding: '12px 14px', border: `2px solid ${(cardFormik.touched.order && (cardFormik.errors.order || orderDuplicate)) ? '#ef4444' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '14px', backgroundColor: 'white', transition: 'all 0.3s ease', outline: 'none' }}
            />
            {(cardFormik.touched.order && cardFormik.errors.order) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', color: '#ef4444', fontSize: '12px' }}>
                <FiAlertCircle size={12} />
                {cardFormik.errors.order}
              </div>
            )}
            {orderDuplicate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', color: '#ef4444', fontSize: '12px' }}>
                <FiAlertCircle size={12} />
                رقم الترتيب مستخدم بالفعل في بطاقة أخرى
              </div>
            )}
          </div>
        )}

        {/* الصورة فقط في البطاقة المقلوبة */}
        {toolType === TOOL_TYPES.FLIPPING && (
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>الصورة</label>
            
            {/* عرض الصورة الحالية إذا كانت موجودة */}
            {editingCard && cardFormik.values.image && typeof cardFormik.values.image === 'string' && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>الصورة الحالية:</p>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8fafc'
                }}>
                  <img 
                    src={cardFormik.values.image.startsWith('http') 
                      ? cardFormik.values.image 
                      : `${import.meta.env.VITE_SERVER_DEV}storage/${cardFormik.values.image}`
                    }
                    alt="الصورة الحالية"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                    onError={(e) => {
                      console.log("Image load error, trying alternative path...");
                      // جرب مسار بديل
                      const altSrc = cardFormik.values.image.startsWith('http') 
                        ? `${import.meta.env.VITE_SERVER_DEV}${cardFormik.values.image}`
                        : `${import.meta.env.VITE_SERVER_DEV}${cardFormik.values.image}`;
                      
                      if (e.target.src !== altSrc) {
                        e.target.src = altSrc;
                      } else {
                        // إذا فشل المسار البديل أيضاً
                        console.log("Both image paths failed:", {
                          original: cardFormik.values.image,
                          attempted: [
                            `${import.meta.env.VITE_SERVER_DEV}storage/${cardFormik.values.image}`,
                            altSrc
                          ]
                        });
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                    onLoad={() => {
                      console.log("Image loaded successfully:", cardFormik.values.image);
                    }}
                  />
                  <div style={{ 
                    display: 'none', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#64748b',
                    fontSize: '12px',
                    textAlign: 'center',
                    padding: '8px'
                  }}>
                    لا يمكن تحميل الصورة<br/>
                    <span style={{ fontSize: '10px' }}>المسار: {cardFormik.values.image}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* عرض معاينة الصورة الجديدة إذا تم اختيارها */}
            {cardFormik.values.image && cardFormik.values.image instanceof File && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '12px', color: '#10b981', marginBottom: '8px' }}>الصورة الجديدة المختارة:</p>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  border: '2px solid #10b981', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f0fdf4'
                }}>
                  <img 
                    src={URL.createObjectURL(cardFormik.values.image)}
                    alt="الصورة الجديدة"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </div>
              </div>
            )}
            
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                cardFormik.setFieldValue('image', file);
              }}
              style={{ width: '100%', padding: '12px 14px', border: `2px solid ${cardFormik.touched.image && cardFormik.errors.image ? '#ef4444' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '14px', backgroundColor: 'white', transition: 'all 0.3s ease', outline: 'none' }}
            />
            <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
              {editingCard && cardFormik.values.image && typeof cardFormik.values.image === 'string' 
                ? 'اختر صورة جديدة لاستبدال الصورة الحالية (اختياري)' 
                : 'اختر صورة للبطاقة'
              }
            </p>
            {cardFormik.touched.image && cardFormik.errors.image && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', color: '#ef4444', fontSize: '12px' }}>
                <FiAlertCircle size={12} />
                {cardFormik.errors.image}
              </div>
            )}
          </div>
        )}

        {/* اللون مع عرض اللون المختار */}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>اللون</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              name="color"
              placeholder="#FF5733"
              value={cardFormik.values.color || ''}
              onChange={cardFormik.handleChange}
              onFocus={(e) => handleInputFocus(e, 'color')}
              onBlur={(e) => handleInputBlur(e, 'color')}
              style={{ flex: 1, padding: '12px 14px', border: `2px solid ${cardFormik.touched.color && cardFormik.errors.color ? '#ef4444' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '14px', backgroundColor: 'white', transition: 'all 0.3s ease', outline: 'none' }}
            />
            <div style={{
              width: '50px',
              height: '44px',
              backgroundColor: cardFormik.values.color || '#007bff',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'white',
              textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
              fontWeight: 'bold'
            }}>
              {cardFormik.values.color || '#007bff'}
            </div>
            <input
              type="color"
              value={cardFormik.values.color || '#007bff'}
              onChange={(e) => cardFormik.setFieldValue('color', e.target.value)}
              style={{
                width: '44px',
                height: '44px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                padding: '0'
              }}
            />
          </div>
          {cardFormik.touched.color && cardFormik.errors.color && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', color: '#ef4444', fontSize: '12px' }}>
              <FiAlertCircle size={12} />
              {cardFormik.errors.color}
            </div>
          )}
        </div>

        {/* أزرار الحفظ والإلغاء */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || orderDuplicate}
            style={{ flex: 1, height: '44px', background: isSubmitting || orderDuplicate ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: isSubmitting || orderDuplicate ? 'not-allowed' : 'pointer' }}
          >
            {isSubmitting ? (<><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />جاري الحفظ...</>) : (<><FiSave size={16} />{editingCard ? 'تعديل البطاقة' : `إضافة ${toolType === TOOL_TYPES.ORDERING ? 'بطاقة ترتيب' : 'بطاقة قابلة للقلب'} جديدة`}</>)}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleCancelEdit}
            style={{ padding: '0 20px', height: '44px', backgroundColor: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
          >إلغاء</motion.button>
        </div>
      </form>
    );
  };

  // Main Component JSX
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ 
        width: '100%',
        minHeight: 'auto'
      }}
    >
      {/* Lesson Title Edit Section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          backgroundColor: '#f8fafc',
          border: '2px solid #e2e8f0',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h5 style={{ margin: '0 0 20px 0', color: '#374151', fontWeight: '600', fontSize: '16px' }}>
            اسم الدرس
          </h5>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="أدخل اسم الدرس"
              style={{
                flex: 1,
                padding: '16px 18px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '15px',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#0062ff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 98, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveLessonTitle}
              style={{
                padding: '16px 24px',
                backgroundColor: '#0062ff',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(0, 98, 255, 0.3)'
              }}
            >
              <FiSave size={16} />
              حفظ
            </motion.button>
          </div>
        </div>
      </div>

      {/* Tool Type Selection (if no cards and not locked) */}
      {!toolType && cards.length === 0 && !isToolTypeLocked && (
        <div style={{ marginBottom: '32px' }}>
          <h5 style={{ margin: '0 0 24px 0', color: '#374151', fontWeight: '600', fontSize: '18px', textAlign: 'center' }}>
            اختر نوع الأداة التفاعلية
          </h5>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectToolType(TOOL_TYPES.ORDERING)}
              style={{
                padding: '32px 24px',
                backgroundColor: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '16px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#0062ff';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 98, 255, 0.15)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <FiList size={32} color="#0062ff" />
              </div>
              <h6 style={{ margin: '0 0 12px 0', color: '#1e293b', fontWeight: '600', fontSize: '16px' }}>
                بطاقات الترتيب
              </h6>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
                تحتوي على: التعريف، المحتوى، الترتيب (إلزامي ويبدأ من 1)، اللون
              </p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectToolType(TOOL_TYPES.FLIPPING)}
              disabled={isToolTypeLocked && toolType === TOOL_TYPES.ORDERING}
              style={{
                padding: '32px 24px',
                backgroundColor: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '16px',
                cursor: (isToolTypeLocked && toolType === TOOL_TYPES.ORDERING) ? 'not-allowed' : 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                opacity: (isToolTypeLocked && toolType === TOOL_TYPES.ORDERING) ? 0.5 : 1,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={(e) => {
                if (!(isToolTypeLocked && toolType === TOOL_TYPES.ORDERING)) {
                  e.target.style.borderColor = '#8b5cf6';
                  e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.15)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                 if (!(isToolTypeLocked && toolType === TOOL_TYPES.ORDERING)) {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  e.target.style.transform = 'translateY(0)';
                 }
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#f3e8ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <FiRotateCw size={32} color="#8b5cf6" />
              </div>
              <h6 style={{ margin: '0 0 12px 0', color: '#1e293b', fontWeight: '600', fontSize: '16px' }}>
                البطاقات القابلة للقلب
              </h6>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
                تحتوي على: التعريف، المحتوى، الصورة، اللون
              </p>
            </motion.button>
          </div>
        </div>
      )}

      {/* Tool Type Selection (if toolType is locked to ordering) */}
      {!toolType && isToolTypeLocked && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <FiAlertCircle size={20} color="#0284c7" />
            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '14px' }}>
              تم اكتشاف أن هذا الدرس يحتوي على بطاقات ترتيب. جميع البطاقات الجديدة ستكون من نوع بطاقات الترتيب.
            </p>
          </div>
          <div style={{ 
            marginTop: '16px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => handleSelectToolType(TOOL_TYPES.ORDERING)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#0062ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FiList size={20} color="white" />
              </div>
              <div>
                <h6 style={{ margin: '0 0 4px 0', color: '#1e293b', fontWeight: '600' }}>
                  إضافة بطاقة ترتيب جديدة
                </h6>
                <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>
                  تحتوي على: التعريف، النص، الترتيب، اللون
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display Existing Cards & Add New Card Button (if toolType is set) */}
      {toolType && cards.length > 0 && !showAddCard && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h5 style={{ margin: 0, color: '#374151', fontWeight: '600' }}>
              البطاقات الموجودة ({cards.length})
            </h5>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddNewCard}
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FiPlus size={16} />
              إضافة بطاقة جديدة
            </motion.button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AnimatePresence>
              {cards.map((card, index) => (
                <motion.div
                  key={card.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexGrow: 1, minWidth: 0 }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      backgroundColor: card.color || '#007bff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {toolType === TOOL_TYPES.ORDERING ? 
                        <FiList color="white" size={14} /> : 
                        <FiRotateCw color="white" size={14} />
                      }
                    </div>
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <h6 style={{ margin: 0, fontWeight: '600', color: '#1e293b', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {card.title || 'تعريف غير محدد'}
                      </h6>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {toolType === TOOL_TYPES.ORDERING ? 
                          `الترتيب: ${card.order || 'غير محدد'} • المحتوى: ${card.content || card.description ? 'متوفر' : 'غير متوفر'}` :
                          `المحتوى: ${card.content || card.description ? 'متوفر' : 'غير متوفر'} • ${card.image ? 'يحتوي على صورة' : 'بدون صورة'}`
                        }
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditCard(card)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#f1f5f9',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FiEdit2 size={12} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteCard(card.id)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#fef2f2',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FiTrash2 size={12} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Add/Edit Card Form */}
      <AnimatePresence>
        {showAddCard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <h5 style={{ margin: 0, color: '#374151', fontWeight: '600' }}>
                {editingCard ? 'تعديل البطاقة' : 
                  toolType ? `إضافة ${toolType === TOOL_TYPES.ORDERING ? 'بطاقة ترتيب' : 'بطاقة قابلة للقلب'} جديدة` : 'إضافة بطاقة جديدة'
                }
              </h5>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCancelEdit}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#f1f5f9',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FiX size={16} />
              </motion.button>
            </div>

            {/* Tool type selection within form (if not set and not locked) */}
            {!toolType && !isToolTypeLocked && (
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ margin: '0 0 12px 0', color: '#374151', fontWeight: '600' }}>
                  اختر نوع الأداة أولاً
                </h6>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectToolType(TOOL_TYPES.ORDERING)}
                    style={{
                      padding: '12px',
                      backgroundColor: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: (isToolTypeLocked && toolType === TOOL_TYPES.ORDERING) ? 'not-allowed' : 'pointer',
                      textAlign: 'center',
                      fontSize: '14px',
                      opacity: (isToolTypeLocked && toolType === TOOL_TYPES.ORDERING) ? 0.5 : 1,
                    }}
                    disabled={isToolTypeLocked && toolType === TOOL_TYPES.ORDERING}
                  >
                    بطاقات الترتيب
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectToolType(TOOL_TYPES.FLIPPING)}
                    style={{
                      padding: '12px',
                      backgroundColor: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: (isToolTypeLocked && toolType === TOOL_TYPES.ORDERING) ? 'not-allowed' : 'pointer',
                      textAlign: 'center',
                      fontSize: '14px',
                      opacity: (isToolTypeLocked && toolType === TOOL_TYPES.ORDERING) ? 0.5 : 1,
                    }}
                    disabled={isToolTypeLocked && toolType === TOOL_TYPES.ORDERING}
                  >
                    البطاقات القابلة للقلب
                  </motion.button>
                </div>
              </div>
            )}

            {/* Tool type selection within form (if locked to ordering) */}
            {!toolType && isToolTypeLocked && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <FiAlertCircle size={16} color="#0284c7" />
                  <p style={{ margin: 0, color: '#0c4a6e', fontSize: '13px' }}>
                    تم اكتشاف أن هذا الدرس يحتوي على بطاقات ترتيب فقط
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectToolType(TOOL_TYPES.ORDERING)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#0062ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <FiList size={16} />
                  إضافة بطاقة ترتيب (تعريف، نص، ترتيب، لون)
                </motion.button>
              </div>
            )}

            {toolType && renderAddCardForm()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onClose && onClose()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#0062ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FiCheck size={16} />
          إنهاء التعديل
        </motion.button>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default InteractiveToolForm; 