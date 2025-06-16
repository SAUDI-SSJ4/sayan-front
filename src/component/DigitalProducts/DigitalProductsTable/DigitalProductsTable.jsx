import { Table, Popover, Dropdown } from "rsuite";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useNavigate } from "react-router-dom";

const { Column, HeaderCell, Cell } = Table;


const NameCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props}>
      <div style={{ whiteSpace: "normal" }}>{rowData[dataKey]}</div>
    </Cell>
  );
};

const StatusCell = ({ rowData, dataKey, ...props }) => {
  return <Cell {...props}>{rowData[dataKey] == 1 ? "مفعل" : "غير مفعل"}</Cell>;
};
const ImageCell = ({ rowData, dataKey, router, link, ...props }) => (
  <Cell {...props} style={{ padding: 0, cursor: "pointer" }}>
    <div
      style={{
        minWidth: "170px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      onClick={() => {
        router("/admin/AcadmicMarketing");
      }}
    >
      <img
        src={rowData.image}
        style={{
          width: "100px",
          height: "100px",
          right: "0",
          borderRadius: "50%",
        }}
      />
    </div>
  </Cell>
);


const ActionCell = ({ rowData, dataKey, setShow, setid, ...props }) => {
  let navigate = useNavigate();
  return (
    <Cell {...props} className="link-group">
      <div style={{ color: "#A3AED0", display: "flex", gap: "1rem" }}>
        <BorderColorOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/academy/DigitalProducts/AddNewProduct/${rowData[dataKey]}`)}
        />

        <DeleteOutlineOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setShow(true), setid(rowData[dataKey]);
          }}
        />
      </div>
    </Cell>
  );
};

const DigitalProductTable = ({
  data = [],
  setidDeleteModal = () => {},
  setDeleteModal = () => {},
}) => {
  const router = useNavigate();

  return (
    <div style={{ backgroundColor: "white", padding: "10px" }}>
      <div className="row g-3"></div>
      <div style={{ overflowX: "auto" }} className="mt-2">
        <Table
          height={600}
          style={{ direction: "rtl" }}
          headerHeight={60}
          rowHeight={150}
          data={data}
          id="table"
        >
          <Column minWidth={170} flexGrow={1} align="center">
            <HeaderCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
                width: "50px",
              }}
            >
              {"الصورة"}
            </HeaderCell>
            <ImageCell dataKey="image" router={router} link />
          </Column>
          <Column flexGrow={1} minWidth={150}>
            <HeaderCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
              }}
            >
              العنوان
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="title"
            />
          </Column>
          <Column flexGrow={1} minWidth={150}>
            <HeaderCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
              }}
            >
              المحتوى التفصيلى
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="content"
            />
          </Column>
          <Column flexGrow={1} minWidth={150}>
            <HeaderCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
              }}
            >
              المحتوى المختصر
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="short_content"
            />
          </Column>
          <Column flexGrow={1} minWidth={150}>
            <HeaderCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
              }}
            >
              الحالة
            </HeaderCell>
            <StatusCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="status"
            />
          </Column>
          <Column flexGrow={1} minWidth={150}>
            <HeaderCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
              }}
            >
              السعر
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="price"
            />
          </Column>
          <Column flexGrow={1} minWidth={150}>
            <HeaderCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
              }}
            >
              النوع{" "}
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="type"
            />
          </Column>
          <Column flexGrow={1} minWidth={150}>
            <HeaderCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
              }}
            >
              التقيم
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="rate"
            />
          </Column>

          <Column minWidth={150}>
            <HeaderCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
              }}
            ></HeaderCell>
            <ActionCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
              }}
              dataKey="id"
              setid={setidDeleteModal}
              setShow={setDeleteModal}
            />
          </Column>
        </Table>
      </div>
    </div>
  );
};

// حاوي الجدول مع منطق عرض رسالة عدم وجود محتوى
const DigitalProductsTable = ({
  checkedKeys,
  setCheckedKeys,
  checkAllHandler,
  setData,
  digitalProducts = [],
  isLoading = false
}) => {
  useEffect(() => {
    setData(digitalProducts);
  }, [digitalProducts, setData]);

  // التحقق من وجود منتجات صالحة
  const hasValidProducts = Array.isArray(digitalProducts) && digitalProducts.length > 0;

  if (!isLoading && !hasValidProducts) {
    return (
      <div style={{ backgroundColor: "white", padding: "25px", border: "1px #EDEFF2 solid", borderRadius: "10px" }}>
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
      </div>
    );
  }

  return (
    <DigitalProductTable
      data={digitalProducts}
      setidDeleteModal={() => {}}
      setDeleteModal={() => {}}
    />
  );
};

export default DigitalProductsTable;
