import {
  Table,
  Popover,
  Whisper,
  Dropdown,
  IconButton,
  Progress,
  Avatar,
} from "rsuite";
import { mockUsers } from "../DigitalProductsCard/mock";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useNavigate } from "react-router-dom";
import { useAllFAQ } from "../../../framework/accademy/academysetting-faq";
import { Spinner } from "react-bootstrap";
import { Error } from "@mui/icons-material";
import { useAllOpinions } from "../../../framework/accademy/academysetting-opinions";
import { useSelector } from "react-redux";

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(1);

const NameCell = ({ rowData, dataKey, ...props }) => {
  return <Cell {...props}>{rowData[dataKey]}</Cell>;
};
const StatusCell = ({ rowData, dataKey, ...props }) => {
  return <Cell {...props}>{rowData[dataKey] == 1 ? "مفعل" : "غير مفعل"}</Cell>;
};

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

const ActionCell = ({ rowData, dataKey, setShow, ...props }) => {
  let navigate = useNavigate();
  return (
    <Cell {...props} className="link-group">
      <div style={{ color: "#A3AED0" }}>
        <BorderColorOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={() =>
            navigate(
              `/academy/settings/ratesOfStudents/edit/${rowData[dataKey]}`
            )
          }
        />
      </div>
    </Cell>
  );
};

const StudentRatesTable = ({
  checkAllHandler,
  checkedKeys,
  isRefresh,
  setIsRefresh,
  setData,
  setCheckedKeys,
  setDeleteModal,
}) => {
  let indeterminate = false;

  const handleCheck = (value, checkedKeys) => {
    if (!checkedKeys.some((item) => item === value)) {
      setCheckedKeys((perv) => [...perv, value]);
    } else {
      setCheckedKeys((perv) => perv.filter((item) => item !== value));
    }
  };
  const profileInfo = useSelector((state) => state.academyUser.academy);
  const academyId = profileInfo?.academy?.id;

  let {
    data: opinionsData,
    isLoading,
    errors,
    refresh,
  } = useAllOpinions(academyId);
  useEffect(() => {
    refresh();
    setIsRefresh(false);
  }, [isRefresh]);

  if (errors) return <Error />;

  if (isLoading)
    return (
      <div className="w-full h-50 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  return (
    <div style={{ backgroundColor: "white", padding: "10px" }}>
      <div className="row g-3"></div>
      <div style={{ overflowX: "auto" }} className="mt-2">
        <Table
          height={600}
          style={{ direction: "rtl" }}
          headerHeight={60}
          rowHeight={60}
          data={opinionsData.data}
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
              اسم الطالب
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="student_name"
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
              صورة الطالب
            </HeaderCell>
            <Cell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {(rowData) =>
                rowData.student_avatar ? (
                  <Avatar src={rowData.student_avatar} size="lg" circle />
                ) : (
                  "N/A"
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
              تقييم الطالب
            </HeaderCell>
            <Cell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {(rowData) => (rowData.rate ? rowData.rate + " نجمة" : "N/A")}
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
              تعليق الطالب
            </HeaderCell>
            <NameCell
              style={{
                paddingBlock: "18px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              dataKey="opinion"
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
            ></HeaderCell>
            <ActionCell dataKey="id" setShow={setDeleteModal} />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default StudentRatesTable;
