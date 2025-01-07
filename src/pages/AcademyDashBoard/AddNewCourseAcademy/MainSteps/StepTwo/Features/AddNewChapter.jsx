import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../../../AddNewCourse.module.css";
import Swal from "sweetalert2";
import { Button } from "rsuite";
import { useMutation } from "@tanstack/react-query";
import { academy_client } from "../../../../../../utils/apis/client.config";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
});

const AddNewChapter = () => {
  const [isFormFilled, setIsFormFilled] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await academy_client.post('/academy/chapter', {
        ...data,
        is_published: true
      });
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "نجاح!",
        text: "تمت إضافة الفصل بنجاح",
        icon: "success",
        confirmButtonText: "موافق",
      });
      formik.resetForm();
      setIsFormFilled(false);
    },
    onError: () => {
      Swal.fire({
        title: "فشل",
        text: "حدث خطأ أثناء محاولة إضافة الفصل. يرجى المحاولة مرة أخرى.",
        icon: "error",
        confirmButtonText: "موافق",
      });
      setIsFormFilled(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsFormFilled(true);
      Swal.fire({
        title: "اضافة الفصل الي الدورة",
        text: "هل تريد اضافة هذا الدرس الي هذا الفصل في هذة الدورة",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "اضافة",
        cancelButtonText: "لا",
      }).then((result) => {
        if (result.isConfirmed) {
          mutation.mutate({ title: values.title });
        } else {
          setIsFormFilled(false);
        }
      });
    },
  });

  return (<>
    <div className={`${style.content} container text-center `} style={{padding:"60px 40px"}}>
      <h4 style={{ color:"#2B3674",fontWeight:"600"}}>اضافة فصل جديد</h4>

      <form onSubmit={formik.handleSubmit} className="row g-3 w-80 justify-content-center m-auto">
        <div className="justify-content-center">
          <div className="col-lg-11 col-md-12">
            <div className={style.formControl}>
              <label htmlFor="title" className={style.label}>
                العنوان
              </label>
              <input
                type="text"
                placeholder="ادخل عنوان الفصل هنا"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={style.input}
              />
              {formik.touched.title && formik.errors.title && (
                <div className={style.error}>{formik.errors.title}</div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <Button
            type="submit"
            appearance="primary"
            size="lg"
            style={{ width: "100%",padding: '15px 0px' }}
            disabled={mutation.isLoading || !formik.values.title}
          >
            {mutation.isLoading ? 'جاري الإضافة...' : 'اضافة فصل جديد'}
          </Button>
        </div>
      </form>
    </div>
    <div className={`${style.sidebar} ${style.right}`}>

    </div>
  </>

  );
};

export default AddNewChapter;