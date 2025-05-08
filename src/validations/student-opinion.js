import * as Yup from "yup";

export const studentOpinionSchema = Yup.object().shape({
  student_name: Yup.string().required("الاسم مطلوبا"),
  student_avatar: Yup.string().required("صورة الطلاب مطلوبة"),
  rate: Yup.number().required("تقييم الطلاب مطلوب"),
  opinion: Yup.string().required("تعليق الطلاب مطلوب"),
});
