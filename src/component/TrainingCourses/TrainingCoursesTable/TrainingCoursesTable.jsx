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

import Lottie, { useLottie } from "lottie-react";

import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useNavigate } from "react-router-dom";
import Delete from "../../../assets/icons/delete.json";
import { toast } from "react-toastify";

const { Column, HeaderCell, Cell } = Table;

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
        display: "flex",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        direction: "rtl",
      }}
      onClick={() => {
        router("/admin/AcadmicMarketing");
      }}
    >
      <img
        src={rowData.image}
        style={{
          width: "40px",
          height: "40px",
          position: "absolute",
          right: "0",
          borderRadius: "50%",
        }}
      />
      <div style={{ width: "40px", height: "40px" }}></div>

      <span
        style={{
          maxWidth: "100px",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {rowData.title}
      </span>
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

const TrainingCoursesTable = ({
  checkAllHandler,
  checkedKeys,
  setData,
  setCheckedKeys,
  data,
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
  const options = {
    animationData: Delete,
    loop: true,
  };
  const { View } = useLottie(options);
  // REMOVE AND CALCEL MODAL
  const successCancel = () => {
    setShowModal2(false);

    toast.success("تم الالغاء بنجاح");
  };

  const successRemove = () => {
    setShowModal2(false);

    toast.success("تم الحذف بنجاح");
  };

  return <div className="">teffst</div>;
};

export default TrainingCoursesTable;
