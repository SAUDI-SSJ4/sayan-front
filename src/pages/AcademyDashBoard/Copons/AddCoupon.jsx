import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button, Row, Col } from "react-bootstrap";
import moment from "moment";
import CouponIcon from "../../../assets/icons/CouponIcon";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { toast } from "react-toastify"; // Import toast
import { useNavigate } from "react-router-dom";

// Validation Schema
const validationSchema = Yup.object({
  usage_limit: Yup.number()
    .required("حد الاستخدام مطلوب")
    .min(1, "يجب أن يكون أكبر من 0"),
  code: Yup.string().required("رمز القسيمة مطلوب"),
  discount_type: Yup.string().required("نوع الخصم مطلوب"),
  discount: Yup.number()
    .required("مقدار الخصم مطلوب")
    .min(0, "يجب أن يكون أكبر من أو يساوي 0"),
  discount_limit: Yup.number()
    .required("حد الخصم مطلوب")
    .min(0, "يجب أن يكون أكبر من أو يساوي 0"),
  start_date: Yup.date()
    .required("تاريخ البدء مطلوب")
    .min(new Date(), "يجب أن يكون تاريخ البدء في المستقبل"),
  end_date: Yup.date()
    .required("تاريخ الانتهاء مطلوب")
    .min(Yup.ref("start_date"), "يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء"),
  status: Yup.number()
    .required("الحالة مطلوبة")
    .oneOf([0, 1], "الحالة يجب أن تكون 0 أو 1"),
});

const initialValues = {
  usage_limit: 10,
  code: "",
  discount_type: "fixed",
  discount: 10,
  discount_limit: 10,
  start_date: moment().format("YYYY-MM-DD"),
  end_date: moment().add(1, "months").format("YYYY-MM-DD"),
  status: 1,
};

const AddCoupon = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderAcademy title={"اضافة كوبون"} icon={<CouponIcon />} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await academyAPI.post("/coupon", values);
            toast.success("تم إضافة الكوبون بنجاح");
            navigate("/academy/Coupons");
          } catch (error) {
            toast.error(
              error?.response?.data?.message || "حدث خطأ أثناء إضافة الكوبون"
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <div className="bg-white rounded-2 p-4">
            <Form>
              <Row>
                <Col md={6}>
                  <BootstrapForm.Group controlId="usage_limit">
                    <BootstrapForm.Label>حد الاستخدام</BootstrapForm.Label>
                    <Field
                      name="usage_limit"
                      type="number"
                      className="form-control py-3"
                    />
                    <ErrorMessage
                      name="usage_limit"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group controlId="code">
                    <BootstrapForm.Label>رمز القسيمة</BootstrapForm.Label>
                    <Field
                      name="code"
                      type="text"
                      className="form-control py-3"
                    />
                    <ErrorMessage
                      name="code"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group controlId="discount_type">
                    <BootstrapForm.Label>نوع الخصم</BootstrapForm.Label>
                    <Field
                      as="select"
                      name="discount_type"
                      className="form-control py-3"
                    >
                      <option value="fixed">مبلغ ثابت</option>
                      <option value="percentage">نسبة مئوية</option>
                    </Field>
                    <ErrorMessage
                      name="discount_type"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group controlId="discount">
                    <BootstrapForm.Label>مقدار الخصم</BootstrapForm.Label>
                    <Field
                      name="discount"
                      type="number"
                      className="form-control py-3"
                    />
                    <ErrorMessage
                      name="discount"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group controlId="discount_limit">
                    <BootstrapForm.Label>حد الخصم</BootstrapForm.Label>
                    <Field
                      name="discount_limit"
                      type="number"
                      className="form-control py-3"
                    />
                    <ErrorMessage
                      name="discount_limit"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group controlId="start_date">
                    <BootstrapForm.Label>تاريخ البدء</BootstrapForm.Label>
                    <Field
                      name="start_date"
                      type="date"
                      className="form-control py-3"
                    />
                    <ErrorMessage
                      name="start_date"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group controlId="end_date">
                    <BootstrapForm.Label>تاريخ الانتهاء</BootstrapForm.Label>
                    <Field
                      name="end_date"
                      type="date"
                      className="form-control py-3"
                    />
                    <ErrorMessage
                      name="end_date"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group
                    controlId="status"
                    className=" d-flex align-items-center  gap-2 my-4 p-3  "
                  >
                    <BootstrapForm.Label className="fs-6 m-0 p-0">
                      مفعل
                    </BootstrapForm.Label>
                    <Field
                      name="status"
                      type="checkbox"
                      className="form-check-input m-0 p-0 "
                      onChange={(e) =>
                        setFieldValue("status", e.target.checked ? 1 : 0)
                      }
                      checked={values.status === 1}
                    />
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                </Col>

                <Col md={12}>
                  <Button
                    type="submit"
                    variant="primary"
                    className="my-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default AddCoupon;
