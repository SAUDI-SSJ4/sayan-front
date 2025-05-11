import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { handleLevels } from "../../../utils/helpers";

// بيانات وهمية جميلة تلقائية
const FAKE_PRODUCTS = [
  {
    level: "beginner",
    title: "أساسيات البرمجة بلغة جافاسكريبت",
    trainer: "محمد الجهني",
    price: 99,
    rated: 5,
    image: "https://i.imgur.com/znpqLnH.png",
  },
  {
    level: "advanced",
    title: "تطوير تطبيقات الويب باستخدام React",
    trainer: "أحمد القحطاني",
    price: 199,
    rated: 4.5,
    image: "https://i.imgur.com/k69uVT2.png",
  },
  {
    level: "intermediate",
    title: "تصميم تجربة المستخدم (UX)",
    trainer: "حصة بني خالد",
    price: 80,
    rated: 4,
    image: "https://i.imgur.com/7JxGea0.png",
  },
  {
    level: "beginner",
    title: "أسس الذكاء الاصطناعي",
    trainer: "فهد الشهري",
    price: 120,
    rated: 4.8,
    image: "https://i.imgur.com/5keKNLW.png",
  },
  {
    level: "advanced",
    title: "البيانات الضخمة وعلوم البيانات",
    trainer: "سارة بخيت",
    price: 250,
    rated: 5,
    image: "https://i.imgur.com/ZFaS4vT.png",
  },
  {
    level: "intermediate",
    title: "إدارة المشاريع الاحترافية",
    trainer: "جود الجهيمان",
    price: 94,
    rated: 4.1,
    image: "https://i.imgur.com/n1t6mmR.png",
  },
  {
    level: "advanced",
    title: "الأمن السيبراني التطبيقي",
    trainer: "عبدالرحمن مشاري",
    price: 175,
    rated: 4.9,
    image: "https://i.imgur.com/T5vQE68.png",
  },
  {
    level: "beginner",
    title: "مقدمة في تطوير الجوال",
    trainer: "ريم الحربي",
    price: 85,
    rated: 4.3,
    image: "https://i.imgur.com/F0BihN4.png",
  },
];

const SessionsCardContainer = ({ products, isLoading, isFetched }) => {
  // بيانات العرض (وهمية إذا لا يوجد بيانات حقيقية)
  const myProducts =
    (Array.isArray(products) && products.length > 0
      ? products
      : FAKE_PRODUCTS
    ).map((x, i) => ({
      ...x,
      id: x.id || `dummy-${i}`,
    }));

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const totalPages = Math.ceil(myProducts.length / pageSize);
  const paginatedProducts = myProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  return (
    <div
      className="overflow-x-auto"
      style={{
        minHeight: 360,
        padding: "14px 0",
        margin: "0 auto",
      }}
    >
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <Spinner animation="border" />
        </div>
      )}

      {!isLoading && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: "26px 20px",
              margin: "0 auto",
              padding: "8px 5px",
              direction: "rtl",
            }}
          >
            {paginatedProducts.map((product, index) => (
              <div
                key={product.id || index}
                style={{
                  background: "linear-gradient(125deg,#fff 84%,#f8fafd 100%)",
                  borderRadius: "17.5px",
                  boxShadow: "0 4px 22px rgba(60,96,200,0.09)",
                  border: "1.5px solid #f3f5fa",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  overflow: "hidden",
                  transition: ".15s",
                  minHeight: 378,
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "225px",
                    overflow: "hidden",
                    borderTopLeftRadius: "17.5px",
                    borderTopRightRadius: "17.5px",
                    background: "#f4f8ff",
                    borderBottom: "1.5px solid #f0f2f8",
                  }}
                >
                  <img
                    src={product.image || "/images/placeholder-course.png"}
                    alt={product.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      borderTopLeftRadius: "17.5px",
                      borderTopRightRadius: "17.5px",
                      transition: ".18s",
                    }}
                  />
                </div>
                <div
                  style={{
                    flex: 1,
                    width: "100%",
                    padding: "18px 16px 12px 16px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "#2156b0",
                      fontSize: "1.08rem",
                      marginBottom: 7,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      minHeight: 26,
                    }}
                    title={product.title}
                  >
                    {product.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      marginBottom: 5,
                      fontSize: "0.97rem",
                    }}
                  >
                    <span
                      style={{
                        background: "#eaf3ff",
                        color: "#1967d2",
                        fontWeight: 600,
                        borderRadius: "6px",
                        fontSize: "0.84rem",
                        padding: "2.5px 10px",
                        marginLeft: 4,
                        letterSpacing: ".2px",
                        display: "inline-block",
                      }}
                    >
                      {handleLevels(product.level)}
                    </span>
                    <span style={{ color: "#555", fontSize: ".99rem", fontWeight: 500 }}>
                      {product.trainer}
                    </span>
                  </div>
                  <div
                    style={{
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        color: "#1967d2",
                        fontWeight: 800,
                        fontSize: "1.13rem",
                        letterSpacing: ".18px",
                        background: "#e9f1fd",
                        padding: "3.5px 10px",
                        borderRadius: "7px",
                        display: "inline-block",
                      }}
                    >
                      ريال {Number(product.price).toLocaleString()}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: "0.97rem", color: "#a8a8a8" }}>
                      {product.rated} <span style={{ color: "#FFD700", fontSize: "1.07em" }}>★</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SessionsCardContainer;