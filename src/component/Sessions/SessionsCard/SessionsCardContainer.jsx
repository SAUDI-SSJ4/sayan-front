import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { handleLevels } from "../../../utils/helpers";
import SARIcon from "../../../components/SARIcon/SARIcon";

const SessionsCardContainer = ({ products, isLoading, isFetched }) => {
  // التحقق من وجود منتجات صالحة
  const hasValidProducts = Array.isArray(products) && products.length > 0;
  const myProducts = hasValidProducts ? products.map((x, i) => ({
    ...x,
    id: x.id || `product-${i}`,
  })) : [];

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

      {!isLoading && hasValidProducts && (
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
                    <span className="d-flex align-items-center">
                      {Number(product.price).toLocaleString()}
                      <SARIcon />
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
لم تقم باضافة منتجات رقمية          </h2>
          <p style={{
            fontSize: "16px",
            color: "#64748b",
            lineHeight: "1.6",
            marginBottom: "20px",
            maxWidth: "400px",
          }}>
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
            fontWeight: "600",
          }}>
قم باضافة منتجات رقمية             <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionsCardContainer;