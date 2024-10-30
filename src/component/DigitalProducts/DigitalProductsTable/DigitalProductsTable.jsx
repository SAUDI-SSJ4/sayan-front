import { Table, Popover, Dropdown } from "rsuite";
import { mockUsers } from "../DigitalProductsCard/mock";
import { Checkbox } from "@mui/material";
import React from "react";
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
  data,
  setidDeleteModal,
  setDeleteModal,
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

export default DigitalProductTable;
