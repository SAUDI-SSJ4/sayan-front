import React, { useEffect, useState, useMemo } from "react";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import TableAg from "../../../component/table/TableAg";
import { Loader } from "rsuite";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import CouponIcon from "../../../assets/icons/CouponIcon";
import { academy_client } from "../../../utils/apis/client.config";

export default function Coupons() {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await academy_client.get("/coupon");
        console.log({ data });
        const formattedData = data?.data?.map((copon) => ({
          id: copon?.id,
          academy_id: copon?.academy_id,
          usage_limit: copon?.usage_limit,
          used: copon?.used,
          code: copon?.code,
          discount_type: copon?.discount_type,
          discount: copon?.discount,
          discount_limit: copon?.discount_limit,
          start_date: copon?.start_date,
          end_date: copon?.end_date,
          status: copon?.status,
          created_at: copon?.created_at,
          updated_at: copon?.updated_at,
        }));
        setRowData(formattedData);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const columnDefs = useMemo(
    () => [
      { headerName: "#", field: "id", flex: 0.5, sortable: true },

      {
        headerName: "الحد الأقصى",
        field: "usage_limit",
        flex: 1,
        sortable: true,
      },
      { headerName: "المستخدم", field: "used", flex: 1, sortable: true },
      { headerName: "الرمز", field: "code", flex: 1, sortable: true },
      {
        headerName: "نوع الخصم",
        field: "discount_type",
        flex: 1,
        sortable: true,
      },
      { headerName: "الخصم", field: "discount", flex: 1, sortable: true },
      {
        headerName: "حد الخصم",
        field: "discount_limit",
        flex: 1,
        sortable: true,
      },
      {
        headerName: "تاريخ البدء",
        field: "start_date",
        flex: 1,
        sortable: true,
        valueFormatter: ({ value }) => moment(value).format("YYYY/MM/DD"),
      },
      {
        headerName: "تاريخ الانتهاء",
        field: "end_date",
        flex: 1,
        sortable: true,
        valueFormatter: ({ value }) => moment(value).format("YYYY/MM/DD"),
      },
    ],
    []
  );

  return (
    <>
      {loading ? (
        <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <div>
          <HeaderAcademy
            btn={
              <button
                onClick={() => {
                  navigate("/academy/Coupons/add");
                }}
                className="btn btn-primary"
              >
                اضافة كوبون
              </button>
            }
            title={"الكوبونات"}
            icon={<CouponIcon />}
          />
          <TableAg
            columnDefs={columnDefs}
            rowData={rowData}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            onEdit={(data) => console.log("Edit:", data)}
            onDelete={(data) => console.log("Delete:", data)}
          />
        </div>
      )}
    </>
  );
}
