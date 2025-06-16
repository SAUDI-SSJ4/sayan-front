import { Table, Popover, Dropdown } from "rsuite";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { mockUsers } from "./mock";
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

const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        minWidth: "170px",
        gap: "10px",
        alignItems: "center",
        position: "relative",
        display: "flex",
      }}
    >
      <img
        src={rowData.user.image}
        style={{
          width: "40px",
          height: "40px",
          position: "absolute",
          right: "0",
          borderRadius: "50%",
        }}
      />
      <div style={{ width: "40px", height: "40px" }}></div>

      <span style={{ maxWidth: "90px" }}>{rowData.user.name}</span>
    </div>
  </Cell>
);

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, style, ...props }) => (
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
  const handleClick = (e) => {
    e.stopPropagation();
    setShow(true);
  };
  return (
    <Cell {...props} className="link-group">
      <div style={{ display: "flex", gap: "30px", color: "#A3AED0" }}>
        <BorderColorOutlinedIcon />
        <DeleteOutlineOutlinedIcon sx={{ cursor: "pointer" }} onClick={handleClick} />
      </div>
    </Cell>
  );
};

const StudentBagExamsTable = ({ acadmey }) => {
  const router = useNavigate();
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
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter((item) => item !== value);
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
      {data && data.length > 0 ? (
      <Table
        height={600}
        style={{ direction: "rtl" }}
        headerHeight={60}
        rowHeight={60}
        onClick={() =>
          acadmey ? router("/academy/SingleExam/exam") : router("/admin/SingleExam/exam")
        }
        data={data}
        id="table"
        rowClassName={"rowContainer"}
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
              fontWeight: "700",
            }}
          >
            الطالب
          </HeaderCell>
          <ImageCell dataKey="user" />
        </Column>

        <Column flexGrow={1} minWidth={150} align="center">
          <HeaderCell
            style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700",
            }}
          >
            عنوان الاختبار
          </HeaderCell>
          <Cell>اختبار اول</Cell>
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
            {" "}
            الاجابات الصحيحة
          </HeaderCell>
          <Cell
            style={{
              padding: "10px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            10
          </Cell>
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
            {" "}
            الاجابات الخاطئة
          </HeaderCell>
          <Cell
            style={{
              padding: "10px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            2
          </Cell>
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
            نسبة الاجتياز
          </HeaderCell>
          <Cell>
            {" "}
            {(rowData) =>
              rowData.isActive == "active" ? (
                <div className="yesActive"> تم السحب </div>
              ) : (
                <div className="notActive"> قيد الانتظار </div>
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
              fontWeight: "700",
            }}
          >
            تاريخ الاختبار
          </HeaderCell>
          <Cell>Jan.01.2024</Cell>
        </Column>
      </Table>
      ) : (
        <div className="text-center p-5" style={{ 
          backgroundColor: '#f8f9fa', 
          borderRadius: '12px', 
          border: '2px dashed #dee2e6',
          margin: '20px 0'
        }}>
          <div style={{ fontSize: '48px', color: '#6c757d', marginBottom: '16px' }}>📝</div>
          <h4 style={{ color: '#495057', marginBottom: '8px' }}>لا توجد اختبارات حالياً</h4>
          <p style={{ color: '#6c757d', marginBottom: '0' }}>لم يقم أي طالب بحل اختبار بعد. سيظهر هنا سجل الاختبارات عند توفرها.</p>
        </div>
      )}

      <Modal
        style={{ direction: "rtl" }}
        show={showModal2}
        onHide={() => setShowModal2(false)}
        className="modal-student"
      >
        <Modal.Body>
          <h2 style={{ color: "#2B3674", fontSize: "22px" }}> هل تريد حذف هذا النموذج ؟</h2>
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

export default StudentBagExamsTable;
