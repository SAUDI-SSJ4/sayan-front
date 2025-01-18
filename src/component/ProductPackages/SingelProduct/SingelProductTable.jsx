import {
  Table,
  Popover,
  Whisper,
  Dropdown,
  IconButton,
  Progress
} from "rsuite";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { mockUsers } from "./mock";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useNavigate } from "react-router-dom";
import AreaChart from "../../charts/doubleArea";
import AreaChartNormal from "../../charts/AreaChart";

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

const SingelProductTable = ({
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

  return (
    <div style={{ backgroundColor: "white", padding: "20px" }}>
      <div className="row g-3 mb-3 ">
        <div className="row g-3 p-0 w-100">
          <div className="col-lg-4 ">
            <div className="chartCard">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3>معدل رضاء العملاء</h3>
                  <p>93%</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChart />
                </div>
              </div>
              <div className="ChartFooter">
                <div>
                  <FiberManualRecordIcon
                    sx={{
                      color: "       #47FFFF80",
                      width: "20px",
                      height: "20px"
                    }}
                  />
                  90% (راضي)
                </div>
                <div>
                  <FiberManualRecordIcon
                    sx={{
                      color: "rgba(255, 71, 170, 0.8)",
                      width: "20px",
                      height: "20px"
                    }}
                  />
                  10% (غير راضي)
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="chartCard">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3>عدد الطلبات أثناء العروض </h3>
                  <p> 258 طلب</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChartNormal
                    color={"rgba(71, 255, 145, 0.1) "}
                    borderColor={"rgba(71, 255, 145, 1)"}
                  />
                </div>
              </div>
              <div className="ChartFooter">
                <div>عرض التقرير</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="chartCard">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3> المبيعات </h3>
                  <p>5,302 ر.س.</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChartNormal
                    color={"rgba(14, 133, 255, 0.1) "}
                    borderColor={"rgba(14, 133, 255, 1)"}
                  />
                </div>
              </div>
              <div className="ChartFooter">
                <div>عرض التقرير</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ overflowX: "auto" }} className="mt-2">
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
                  checked={checkedKeys?.length === data?.length}
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
              الطالب
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
              وسيلة الدفع
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
              تاريخ الطلب
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
              المنتج
            </HeaderCell>
            <Cell>
              {(rowData) =>
                rowData.isActive == "active" ? (
                  <div className="yesActive"> حزمة (عنوان الحزمة) </div>
                ) : rowData.isActive == "not" ? (
                  <div className="Ended"> مفرد</div>
                ) : (
                  <div className="Ended"> مفرد </div>
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
              المبلغ
            </HeaderCell>
            <Cell>100.00 ر.س.</Cell>
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
            <Cell>
              {(rowData) =>
                rowData.isActive == "active" ? (
                  <div className="yesActive"> نجحت </div>
                ) : (
                  <div className="notActive"> فشلت </div>
                )
              }
            </Cell>
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default SingelProductTable;
