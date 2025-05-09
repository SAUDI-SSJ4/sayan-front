import {
  Table,
  Popover,
  Whisper,
  Dropdown,
  IconButton,
  Progress,
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

const SingleVideoTable = () => {
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

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        height={600}
        width={"100%"}
        style={{ direction: "rtl" }}
        headerHeight={60}
        rowHeight={60}
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
            }}
          >
            الطالب
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
              fontWeight: "700",
            }}
          >
            تقييم الطالب
          </HeaderCell>
          <Cell>
            {(rowData) =>
              rowData.isActive == "active" ? (
                <div className="yesActive"> 5/5 </div>
              ) : rowData.isActive == "ended" ? (
                <div className="Ended"> 4/5 </div>
              ) : rowData.isActive == "not" ? (
                <div className="Ended"> 1/5 </div>
              ) : (
                <div className="ispending"> لم يقيّم بعد </div>
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
            تضمين الفيديو
          </HeaderCell>
          <Cell>{(rowData) => `${rowData.role}`}</Cell>
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
            تاريخ المتابعة
          </HeaderCell>
          <Cell>Jan.01.2024</Cell>
        </Column>
      </Table>
    </div>
  );
};

export default SingleVideoTable;
