import { Table, Popover, Dropdown } from "rsuite";
import { mockUsers } from "../DigitalProductsCard/mock";
import { Checkbox } from "@mui/material";
import React from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Error } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

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

const CheckCell = ({
  rowData,
  onClick,
  checkedKeys,
  dataKey,
  style,

  ...props
}) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={style}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onClick={() => onClick(rowData, checkedKeys)}
        checked={checkedKeys.some((item) => item === rowData)}
      />
    </div>
  </Cell>
);


const ActionCell = ({ rowData, dataKey, setShow, ...props }) => {
  let navigate = useNavigate();
  return (
    <Cell {...props} className="link-group">
      <div style={{ color: "#A3AED0" }}>
        <BorderColorOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/academy/settings/footer/edit/${rowData[dataKey]}`)}
        />
      </div>
    </Cell>
  );
};

const FooterTable = ({ checkAllHandler, checkedKeys, setData, setCheckedKeys, setDeleteModal }) => {
  let indeterminate = false;
  const router = useNavigate();

  const handleCheck = (value, checkedKeys) => {
    if (!checkedKeys.some((item) => item === value)) {
      setCheckedKeys((perv) => [...perv, value]);
    } else {
      setCheckedKeys((perv) => perv.filter((item) => item !== value));
    }
  };

  // تم حذف getFooter API - استخدام بيانات فارغة مؤقتاً
  const { data: footerData = { footer: { title: "", content: "", image: "" } }, isLoading = false, isError = false } = useQuery({
    queryKey: ["Footer"],
    queryFn: () => Promise.resolve({ footer: { title: "", content: "", image: "" } }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });


  if (isError) return <Error />;

  if (isLoading)
    return (
      <div className="w-full h-50 d-flex justify-content-center align-items-center">
        <Spinner className="" />
      </div>
    );


  return (
    <div style={{ backgroundColor: "white", padding: "10px" }}>
      <div className="row g-3"></div>
      <div style={{ overflowX: "auto" }} className="mt-2">
        <Table
          height={600}
          style={{ direction: "rtl" }}
          headerHeight={60}
          rowHeight={150}
          data={[footerData?.footer]}
          id="table"
        >
          <Column width={100} align="center">
            <HeaderCell style={{ display: "flex", alignItems: "center" }}>
              <div style={{ lineHeight: "40px" }}>
                <Checkbox
                  inline
                  indeterminate={indeterminate}
                  onClick={() => checkAllHandler()}
                />
              </div>
            </HeaderCell>
            <CheckCell
              style={{ display: "flex", alignItems: "center" }}
              dataKey="id"
              checkedKeys={checkedKeys}
              onClick={handleCheck}
            />
          </Column>
          <Column minWidth={170} flexGrow={1} align="center">
            <HeaderCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "#2B3674",
                fontWeight: "700",
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
              المحتوى
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
              الهاتف
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="phone"
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
              dataKey="address"
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
              فيس بوك
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="facebook"
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
              تويتر
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="twitter"
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
              لينكد ان
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="linkedin"
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
              انستجرام
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="instagram"
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
              سناب شات
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="snapchat"
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
              يوتيوب
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="youtube"
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
              البريد الالكترونى
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="email"
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
              setShow={setDeleteModal}
            />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default FooterTable;
