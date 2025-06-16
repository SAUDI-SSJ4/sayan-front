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
    trainer_id: Yup.string()
      .required("المدرب مطلوب")
      .test('not-empty', 'يجب اختيار مدرب صالح', value => value && value !== '' && value !== '0'),
    category_id: Yup.string()
      .required("الفئة مطلوبة")
      .test('not-empty', 'يجب اختيار فئة صالحة', value => value && value !== '' && value !== '0'),
    price: Yup.number()
      .required("السعر مطلوب")
      .min(0, "السعر يجب أن يكون رقم موجب"),
    level: Yup.string().required("مستوى الطالب مطلوب"),
    content: Yup.string().required("الوصف مطلوب"),
    short_content: Yup.string().required("المحتوى المختصر مطلوب"),
    learn: Yup.string().required("المهارات مطلوبة"),
    requirments: Yup.string().required("المتطلبات مطلوبة"),
  });

export const getCourseLessonSchema = (lesson, isInteractiveTool = false) =>
  Yup.object().shape({
    title: Yup.string().required("عنوان الدرس مطلوب"),
    video: isInteractiveTool ? 
      Yup.mixed().notRequired() : 
      Yup.mixed().when([], {
        is: () => !lesson,
        then: (schema) => schema.required("الفيديو مطلوب"),
        otherwise: (schema) => schema.notRequired(),
      }),
    video_title: isInteractiveTool ? 
      Yup.string().notRequired() : 
      Yup.string().required("عنوان الفيديو مطلوب"),
    description: Yup.string().required(isInteractiveTool ? "وصف الدرس مطلوب" : "وصف الفيديو مطلوب"),
  });
