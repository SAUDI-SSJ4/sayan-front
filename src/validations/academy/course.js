import * as Yup from "yup";

export const getCourseSchema = (course) =>
  Yup.object().shape({
    image: Yup.mixed().when([], {
      is: () => !course,
      then: (schema) => schema.required("الصورة مطلوبة"),
      otherwise: (schema) => schema.notRequired(),
    }),
    short_video: Yup.mixed().when([], {
      is: () => !course,
      then: (schema) => schema.required("الفيديو مطلوب"),
      otherwise: (schema) => schema.notRequired(),
    }),
    title: Yup.string().required("العنوان مطلوب"),
    type: Yup.string().required("نوع الدورة مطلوب"),
    trainer_id: Yup.string().required("المدرب مطلوب"),
    category_id: Yup.string().required("الفئة مطلوبة"),
    price: Yup.number()
      .required("السعر مطلوب")
      .min(0, "السعر يجب أن يكون رقم موجب"),
    level: Yup.string().required("مستوى الطالب مطلوب"),
    content: Yup.string().required("الوصف مطلوب"),
    short_content: Yup.string().required("المحتوى المختصر مطلوب"),
    learn: Yup.string().required("المهارات مطلوبة"),
    requirments: Yup.string().required("المتطلبات مطلوبة"),
  });
