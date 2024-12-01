import { Table, Popover, Whisper, Dropdown, IconButton, Progress } from "rsuite";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { mockUsers } from "../DigitalProductsCard/mock";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useNavigate } from "react-router-dom";
import AreaChart from "../../charts/doubleArea";

import AreaChartNormal from "../../charts/AreaChart";
import { useSlider } from "../../../framework/accademy/academysetting-slider";
import { Error } from "@mui/icons-material";
import { Spinner } from "react-bootstrap";
import { useAbout } from "../../../framework/accademy/academysetting-about";
import { MainSpinner } from "../../UI/MainSpinner";

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(1);

const NameCell = ({ rowData, dataKey, ...props }) => {
  console.log(props);

  return (
    <Cell {...props}>
      <div style={{ textWrap: "balance" }}>{rowData[dataKey]}</div>
    </Cell>
  );
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

const ActionCell = ({ rowData, dataKey, setShow, ...props }) => {
  let navigate = useNavigate();
  return (
    <Cell {...props} className="link-group">
      <div style={{ color: "#A3AED0" }}>
        <BorderColorOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/academy/settings/about/edit")}
        />
      </div>
    </Cell>
  );
};

const AboutTable = ({ checkAllHandler, checkedKeys, setData, setCheckedKeys, setDeleteModal }) => {
  const router = useNavigate();

  let { data: sliderData, isLoading, errors } = useAbout();

  useEffect(() => {
    console.log(sliderData);
  }, [sliderData]);

  if (errors) return <Error />;

  if (isLoading) return <MainSpinner />;

  return (
    <div style={{ backgroundColor: "white", padding: "10px" }}>
      <div className="row g-3"></div>
      <div style={{ overflowX: "auto" }} className="mt-2">
        <Table
          height={1200}
          style={{ direction: "rtl" }}
          headerHeight={60}
          rowHeight={200}
          data={[sliderData]}
          affixHorizontalScrollbar
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
              العنوان الفرعى
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="sub_title"
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
             السمة الاولى
            </HeaderCell>
            <Cell
              style={{
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sliderData.feature_one}
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
              السمة الثانية
            </HeaderCell>
            <Cell
              style={{
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sliderData.feature_two}
            </Cell>
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

export default AboutTable;
