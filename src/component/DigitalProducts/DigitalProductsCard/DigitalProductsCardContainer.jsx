import { useEffect } from "react";
import DigitalProductsCard from "./DigitalProductsCard";
import AreaChart from "../../charts/doubleArea";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AreaChartNormal from "../../charts/AreaChart";

const DigitalProductsCardContainer = ({
  setCheckedKeys,
  checkedKeys,
  setData,
  digitalProducts = [], // بيانات المنتجات من API
  isLoading = false
}) => {
  const handleCheck = (item) => {
    if (checkedKeys.some((i) => i === item)) {
      setCheckedKeys(checkedKeys.filter((i) => i !== item));
    } else {
      setCheckedKeys([...checkedKeys, item]);
    }
  };
  
  useEffect(() => {
    setData(digitalProducts);
  }, [digitalProducts, setData]);

  // التحقق من وجود منتجات صالحة
  const hasValidProducts = Array.isArray(digitalProducts) && digitalProducts.length > 0;

  return (
    <div
      className="digital-info"
      style={{
        backgroundColor: "white",
        padding: "25px",
        border: "1px #EDEFF2 solid",
        borderRadius: "10px"
      }}
    >
      {/* عرض الإحصائيات فقط إذا كان هناك منتجات */}
      {hasValidProducts && (
        <div className="row g-3 mt-3">
          <div className="row g-3 p-0 justify-content-center m-auto">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="chartCard h-100">
                <div className="ChartHeader">
                  <div className="ChartText">
                    <h3 className="fs-6 fw-medium title-text--1">
                      معدل رضاء العملاء
                    </h3>
                    <p className="fs-6 fw-medium title-text--1">93%</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <AreaChart />
                  </div>
                </div>
                <div className="ChartFooter">
                  <div>
                    <FiberManualRecordIcon
                      sx={{
                        color: "       #47FFFF80",
                        width: "20px",
                        height: "20px"
                      }}
                      className="fs-6 fw-medium title-text--1"
                    />
                    90% (راضي)
                  </div>
                  <div>
                    <FiberManualRecordIcon
                      sx={{
                        color: "rgba(255, 71, 170, 0.8)",
                        width: "20px",
                        height: "20px"
                      }}
                      className="fs-6 fw-medium title-text--1"
                    />
                    10% (غير راضي)
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="chartCard h-100">
                <div className="ChartHeader">
                  <div className="ChartText">
                    <h3 className="fs-6 fw-medium title-text--1">
                      عدد الطلبات أثناء العروض{" "}
                    </h3>
                    <p className="fs-6 fw-medium title-text--1"> 258 طلب</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <AreaChartNormal
                      color={"rgba(71, 255, 145, 0.1) "}
                      borderColor={"rgba(71, 255, 145, 1)"}
                    />
                  </div>
                </div>
                <div className="ChartFooter">
                  <div className="fs-6 fw-medium title-text--1">عرض التقرير</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="chartCard h-100">
                <div className="ChartHeader">
                  <div className="ChartText">
                    <h3 className="fs-6 fw-medium title-text--1"> المبيعات </h3>
                    <p className="fs-6 fw-medium title-text--1">5,302 ر.س.</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <AreaChartNormal
                      color={"rgba(14, 133, 255, 0.1) "}
                      borderColor={"rgba(14, 133, 255, 1)"}
                    />
                  </div>
                </div>
                <div className="ChartFooter">
                  <div className="fs-6 fw-medium title-text--1">عرض التقرير</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* عرض المنتجات إذا كانت موجودة */}
      {hasValidProducts && (
        <div className="row g-3 mt-3">
          {digitalProducts.map((item, index) => {
            return (
              <div className="col-12 col-md-6 col-lg-4 col-xl-4" key={index}>
                <DigitalProductsCard
                  image={item.user?.image}
                  onCheck={() => handleCheck(item)}
                  checked={checkedKeys.some((i) => i === item)}
                  user={item.user}
                  active={item.isActive === "active"}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* رسالة عدم وجود محتوى */}
      {!isLoading && !hasValidProducts && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f8fbff 0%, #e8f4ff 100%)",
          borderRadius: "20px",
          border: "2px dashed #b8d4ff",
          margin: "20px 0"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)"
          }}>
            <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
          </div>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#2c3e50",
            marginBottom: "12px",
          }}>
            ابدأ في إضافة منتجاتك الرقمية!
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#64748b",
            lineHeight: "1.6",
            marginBottom: "20px",
            maxWidth: "400px"
          }}>
            لا توجد منتجات رقمية حالياً. قم بإضافة منتجاتك الأولى لبدء بيع المحتوى الرقمي والوصول إلى عملائك.
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "rgba(102, 126, 234, 0.1)",
            borderRadius: "50px",
            color: "#667eea",
            fontSize: "14px",
            fontWeight: "600"
          }}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"/>
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalProductsCardContainer;
