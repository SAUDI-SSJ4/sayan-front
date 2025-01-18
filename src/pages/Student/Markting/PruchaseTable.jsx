import {
  Table,
  Popover,
  Whisper,
  Dropdown,
  IconButton,
  Progress
} from "rsuite";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { mockUsers } from "./mock";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useNavigate } from "react-router-dom";
import AreaChartNormal from "../../../component/charts/AreaChart";
import AreaChart from "../../../component/charts/doubleArea";
import { toast } from "react-toastify";
import classes from "./dasahboard.module.scss";

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

const PruchaseTable = ({
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
    <div style={{ backgroundColor: "white", padding: "10px" }}>
      <div className="row mb-3 g-3">
        <div className="row p-0 w-100 g-3">
          <div className="col-lg-12">
            <div style={{ overflowX: "auto" }} className="mt-2">
              <Table
                height={600}
                style={{ direction: "rtl" }}
                headerHeight={60}
                rowHeight={60}
                data={data}
                id="table"
              >
                <Column minWidth={80} flexGrow={1} align="center">
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
                  <ImageCell />
                </Column>

                <Column minWidth={8} flexGrow={1} align="center">
                  <HeaderCell
                    style={{
                      paddingBlock: "18px",
                      textAlign: "center",
                      fontSize: "14px",
                      color: "#2B3674",
                      fontWeight: "700"
                    }}
                  >
                    وسيلة سحب الارباح
                  </HeaderCell>
                  <Cell>منتج</Cell>
                </Column>

                <Column flexGrow={1} minWidth={100}>
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
                    المبلغ
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

                <Column flexGrow={1} minWidth={100}>
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

                <Column flexGrow={1} minWidth={100}>
                  <HeaderCell
                    style={{
                      paddingBlock: "18px",
                      textAlign: "center",
                      fontSize: "14px",
                      color: "#2B3674",
                      fontWeight: "700"
                    }}
                  >
                    حالة الشراء
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
                <Column flexGrow={1} minWidth={100}>
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
                <Column flexGrow={1} minWidth={100}>
                  <HeaderCell
                    style={{
                      paddingBlock: "18px",
                      textAlign: "center",
                      fontSize: "14px",
                      color: "#2B3674",
                      fontWeight: "700"
                    }}
                  >
                    تاريخ الشراء
                  </HeaderCell>
                  <Cell>Jan.01.2024</Cell>
                </Column>
              </Table>
            </div>
          </div>
        </div>
      </div>

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

export default PruchaseTable;
