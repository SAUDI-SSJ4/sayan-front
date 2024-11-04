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

import MoreIcon from "@rsuite/icons/legacy/More";
import { mockUsers } from "./mock";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { toast } from "react-toastify";
import ScrollbarSize from "react-scrollbar-size";

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(8);

const NameCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props}>
      <a>{rowData[dataKey]}</a>
    </Cell>
  );
};

const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        minWidth: "170px",
        gap: "10px",
        alignItems: "center",
        position: "relative",
        display: "flex"
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
  onChange,
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
        onChange={onChange}
        checked={checkedKeys.some((item) => item === rowData[dataKey])}
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
        <DeleteOutlineOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setShow(true)}
        />
      </div>
    </Cell>
  );
};

const SubscriptionTable = () => {
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };
  useEffect(() => {
    console.log(data);
  }, []);
  const [showModal2, setShowModal2] = React.useState(false);

  const handleScrollbarSizeChange = (width) => {
    setScrollWidth(width);
  };

  const handleScroll = (event) => {
    setScrollLeft(event.target.scrollLeft);
  };

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
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
              />
            </div>
          </HeaderCell>
          <CheckCell
            style={{ display: "flex", alignItems: "center" }}
            dataKey="id"
            checkedKeys={checkedKeys}
            onChange={handleCheck}
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
            المستخدم
          </HeaderCell>
          <ImageCell dataKey="user" />
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
            باقة الاشتراك
          </HeaderCell>
          <NameCell dataKey="email" />
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
            وسيلة الدفع
          </HeaderCell>
          <Cell
            style={{
              padding: "10px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {(RowData) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                {RowData.phone}
              </div>
            )}
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
            الاجمالي
          </HeaderCell>
          <Cell>
            <span>250 ر.س</span>
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
            الحالة
          </HeaderCell>
          <Cell>
            {(rowData) =>
              rowData.isActive == "active" ? (
                <div className="yesActive"> مفعل </div>
              ) : rowData.isActive == "not" ? (
                <div className="notActive"> ملغي </div>
              ) : (
                <div className="Ended"> منتهي </div>
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
            تاريخ الاشتراك
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

export default SubscriptionTable;
