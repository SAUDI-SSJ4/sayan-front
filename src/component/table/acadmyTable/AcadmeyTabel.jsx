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
import { Doughnut } from "react-chartjs-2";

import MoreIcon from "@rsuite/icons/legacy/More";
import { mockUsers } from "./mock";
import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ScrollbarSize from "react-scrollbar-size";
import axiosInstance from "../../../../axios";
import moment from "moment/moment";
import { AnimatePresence, motion } from "framer-motion";
import TableRowsLoader from "../../UI/Skelaton/TableRowsLoader";
const { Column, HeaderCell, Cell } = Table;
import { toast } from "react-toastify";
// const data = mockUsers(8);

const NameCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props}>
      <a>{rowData[dataKey]}</a>
    </Cell>
  );
};

const ImageCell = ({ image, name, ...props }) => (
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
      src={image}
      style={{
        width: "40px",
        height: "40px",
        position: "absolute",
        right: "0",
        borderRadius: "50%"
      }}
    />
    <div style={{ width: "40px", height: "40px" }}></div>

    <span style={{ maxWidth: "90px" }}>{name}</span>
  </div>
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
        <BorderColorOutlinedIcon />
        <DeleteOutlineOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setShow(true)}
        />
      </div>
    </Cell>
  );
};

const AcadmyTable = () => {
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  let checked = false;
  let indeterminate = false;
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [academy, setAcademy] = useState([]);
  useEffect(() => {
    axiosInstance.get("admin/academy").then((res) => {
      setLoadingUsers(false);
      setAcademy(res.data.data);
      console.log(res.data.data);
    });
  }, []);
  if (checkedKeys.length === academy.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < academy.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? academy.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };
  useEffect(() => {
    console.log(academy);
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
    <AnimatePresence mode="wait">
      {loadingUsers ? (
        <motion.div
          key="expanded-content"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }} // Exit animation for the first motion.div
          transition={{ duration: 0.2 }}
          style={{ width: "100%", padding: "20px", backgroundColor: "white" }}
        >
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <div key={index} style={{ margin: "20px 0" }}>
                <TableRowsLoader />
              </div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          key="expanded-a"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }} // Exit animation for the first motion.div
          transition={{ duration: 0.2 }}
          style={{
            padding: "20px",
            background: "white",
            border: " 1px solid #edeff2",
            borderRadius: "10px"
          }}
        >
          <Table
            height={600}
            style={{ direction: "rtl" }}
            headerHeight={60}
            rowHeight={60}
            data={academy}
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
              <Cell>
                {(rowData) => {
                  return (
                    <ImageCell image={rowData?.image} name={rowData?.name} />
                  );
                }}
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
                البريد الالكتروني
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
                رقم الهاتف
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
                كلمة المرور
              </HeaderCell>
              <Cell>
                {(rowData) =>
                  Array.from({ length: 4 }).map((_, i) => (
                    <span key={i}>
                      <FiberManualRecordIcon
                        sx={{ width: "14px", height: "14px" }}
                      />
                    </span>
                  ))
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
                حالة الحساب
              </HeaderCell>
              <Cell>
                {(rowData) =>
                  rowData.status ? (
                    <div className="yesActive"> مفعل</div>
                  ) : (
                    <div className="notActive"> معطل</div>
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
              <Cell>
                {(rowData) => moment(rowData.created_at).format("YYYY-MM-DD")}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AcadmyTable;
