import { Table, Popover, Dropdown } from "rsuite";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useNavigate } from "react-router-dom";
import { useSlider } from "../../../framework/accademy/academysetting-slider";
import { Error } from "@mui/icons-material";
import { Spinner } from "react-bootstrap";
import { academyAPI } from "../../../utils/apis/client/academy";

const { Column, HeaderCell, Cell } = Table;

const NameCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props}>
      <div style={{ textWrap: "balance", textAlign: "start" }}>{rowData[dataKey]}</div>
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
          onClick={() => navigate("/academy/settings/slider/edit")}
        />
      </div>
    </Cell>
  );
};

const SliderTable = ({ checkAllHandler, checkedKeys, setData, setCheckedKeys, setDeleteModal }) => {

  const router = useNavigate();

  let { data: sliderData, isLoading, errors } = useSlider();

  useEffect(() => {
    // academyAPI
    //   .get("/slider")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [sliderData]);

  if (errors) return <Error />;
  if (isLoading)
    return (
      <>
        <div className="w-full h-50 d-flex justify-content-center align-items-center">
          <Spinner className="" />
        </div>
      </>
    );

  return (
    <div style={{ backgroundColor: "white", padding: "10px" }}>
      <div className="row g-3"></div>
      <div style={{ overflowX: "auto" }} className="mt-2">
        <Table
          height={1200}
          style={{ direction: "rtl" }}
          headerHeight={60}
          rowHeight={200}
          data={[sliderData.slider]}
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
              {"الصوره"}
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
              {" العنوان"}
            </HeaderCell>
            <Cell
              style={{
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sliderData.slider.title}
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
              العنوان الفرعى
            </HeaderCell>
            <Cell
              style={{
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sliderData.slider.sub_title}
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
          {/* COMMENT: add btns in table  */}
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
              الزر الرئيسي
            </HeaderCell>
            <Cell
              style={{
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sliderData?.slider?.first_button_title}
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
              رابط الزر الرئيسي
            </HeaderCell>
            <Cell
              style={{
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sliderData?.slider?.first_button_link}
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
              الزر الثانوي
            </HeaderCell>
            <Cell
              style={{
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sliderData?.slider?.second_button_title}
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
              رابط الزر الثانوي
            </HeaderCell>
            <Cell
              style={{
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sliderData?.slider?.second_button_link}
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

export default SliderTable;
