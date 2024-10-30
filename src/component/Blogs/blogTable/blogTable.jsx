import {
  Table,
  Popover,
  Whisper,
  Dropdown,
  IconButton,
  Progress
} from "rsuite";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { mockUsers } from "../blogCard/mock";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(8);

const NameCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props}>
      <a>{rowData[dataKey]}</a>
    </Cell>
  );
};

const ImageCell = ({ rowData, dataKey, router, link, ...props }) => (
  <Cell {...props} style={{ padding: 0, cursor: "pointer" }}>
    <div
      style={{
        minWidth: "170px",
        gap: "10px",
        alignItems: "center",
        position: "relative",
        display: "flex"
      }}
      onClick={() => {
        router("/admin/AcadmicMarketing");
      }}
    >
      <img
        src={rowData.user.image}
        style={{
          width: "40px",
          height: "40px",
          position: "absolute",
          right: "0",
          borderRadius: "50%"
        }}
      />
      <div style={{ width: "40px", height: "40px" }}></div>

      <span style={{ maxWidth: "90px" }}>{rowData.user.name}</span>
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

const renderMenu = ({ onClose, left, top, className }, ref) => {
  const handleSelect = (eventKey) => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item eventKey={1}>Follow</Dropdown.Item>
        <Dropdown.Item eventKey={2}>Sponsor</Dropdown.Item>
        <Dropdown.Item eventKey={3}>Add to friends</Dropdown.Item>
        <Dropdown.Item eventKey={4}>View Profile</Dropdown.Item>
        <Dropdown.Item eventKey={5}>Block</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const ActionCell = ({ rowData, dataKey, setShow, ...props }) => {
  return (
    <Cell {...props} className="link-group">
      <div style={{ display: "flex", gap: "30px", color: "#A3AED0" }}>
        <BorderColorOutlinedIcon />
        <DeleteOutlineOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setShow(true)}
        />
      </div>
    </Cell>
  );
};

const BlogTable = ({
  checkAllHandler,
  checkedKeys,
  setData,
  setCheckedKeys
}) => {
  let checked = false;
  let indeterminate = false;
  const router = useNavigate();

  const handleCheck = (value, checkedKeys) => {
    if (!checkedKeys.some((item) => item === value)) {
      setCheckedKeys((perv) => [...perv, value]);
    } else {
      setCheckedKeys((perv) => perv.filter((item) => item !== value));
    }
  };
  useEffect(() => {
    setData(data);
  }, []);
  const [showModal2, setShowModal2] = React.useState(false);
  // REMOVE AND CALCEL MODAL
  const successCancel = () => {
    setShowModal2(false);

    toast.success("تم الالغاء بنجاح");
  };

  const successRemove = () => {
    setShowModal2(false);

    toast.success("تم الحذف بنجاح");
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        height={600}
        style={{ direction: "rtl" }}
        headerHeight={60}
        rowHeight={60}
        data={data}
        id="table"
      >
        <Column width={100} align="center">
          <HeaderCell style={{ display: "flex", alignItems: "center" }}>
            <div style={{ lineHeight: "40px" }}>
              <Checkbox
                inline
                checked={checkedKeys.length === data.length}
                indeterminate={indeterminate}
                onClick={() => {
                  checkAllHandler();
                }}
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
              fontWeight: "700"
            }}
          >
            المسوّق
          </HeaderCell>
          <ImageCell dataKey="user" />
        </Column>

        <Column minWidth={170} flexGrow={1} align="center">
          <HeaderCell
            style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700"
            }}
          >
            الاكاديمية التعليمية
          </HeaderCell>
          <ImageCell dataKey="user" router={router} link />
        </Column>

        <Column flexGrow={1} minWidth={150}>
          <HeaderCell
            style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700"
            }}
          >
            {" "}
            الاعلان الترويجي
          </HeaderCell>
          <Cell
            style={{
              padding: "10px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            /x/ad
          </Cell>
        </Column>

        <Column flexGrow={1} minWidth={150}>
          <HeaderCell
            style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700"
            }}
          >
            المبلغ
          </HeaderCell>
          <Cell>300.00 ر.س.</Cell>
        </Column>

        <Column flexGrow={1} minWidth={150}>
          <HeaderCell
            style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700"
            }}
          >
            حالة الطلب
          </HeaderCell>
          <Cell>
            {(rowData) =>
              rowData.isActive == "active" ? (
                <div className="yesActive"> تم السحب </div>
              ) : rowData.isActive == "not" ? (
                <div className="Ended"> قيد الانتظار </div>
              ) : (
                <div className="ispending"> قيد التنفيذ </div>
              )
            }
          </Cell>
        </Column>
        <Column flexGrow={1} minWidth={150}>
          <HeaderCell
            style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700"
            }}
          >
            تاريخ الانضمام
          </HeaderCell>
          <Cell>Jan.01.2024</Cell>
        </Column>
        <Column flexGrow={1} minWidth={150}>
          <HeaderCell
            style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700"
            }}
          ></HeaderCell>
          <ActionCell dataKey="id" setShow={setShowModal2} />
        </Column>
      </Table>

      <Modal
        style={{ direction: "rtl" }}
        show={showModal2}
        onHide={() => setShowModal2(false)}
        className="modal-student"
      >
        <Modal.Body>
          <h2 style={{ color: "#2B3674", fontSize: "22px" }}>
            {" "}
            هل تريد حذف هذا النموذج ؟
          </h2>
        </Modal.Body>

        <Modal.Footer style={{ direction: "rtl" }}>
          <Button variant="primary" onClick={successCancel}>
            الغاء
          </Button>
          <Button variant="danger" onClick={successRemove}>
            حذف{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogTable;
