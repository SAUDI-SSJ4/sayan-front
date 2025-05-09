import React, { useEffect, useState, useMemo } from "react";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import TableAg from "../../../component/table/TableAg";
import { Loader } from "rsuite";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteModal from "../../../component/UI/DeleteModal/DeleteModal";
import AcademyDeleteModal from "../../../component/UI/DeleteModal/AcademyDeleteModal";
import { academy_client } from "../../../utils/apis/client.config";

export default function Trainers() {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchTrainers = async () => {
    try {
      const { data } = await academy_client.get("/trainer");
      const formattedData = data?.data?.map((trainer) => ({
        id: trainer?.id,
        academy_id: trainer?.academy_id,
        academy: trainer?.academy,
        name: trainer?.name,
        email: trainer?.email,
        phone: trainer?.phone,
        image: trainer?.image,
        about: trainer?.about,
        courses_count: trainer?.courses_count,
        created_at: trainer?.created_at,
      }));
      setRowData(formattedData);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDelete = async () => {
    try {
      await academy_client.delete(`/trainer/${deletingId}`);
      toast.success("تم حذف المدرب بنجاح");
      setShowModal(false);
      fetchTrainers();
    } catch (error) {
      toast.error("فشل حذف المدرب");
    }
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "ID",
        field: "id",
        sortable: true,
        flex: 0.5,
      },
      {
        headerName: "المدرب",
        field: "name",
        cellRenderer: ({ data }) => (
          <div className=" d-flex justify-content-start w-100 align-items-center gap-2">
            <img
              src={data.image}
              alt={data.name}
              style={{ width: "50px", height: "50px", borderRadius: "10%" }}
            />
            <span>{data.name}</span>
          </div>
        ),
      },
      {
        headerName: "أكاديمية",
        field: "academy",
        sortable: true,
        flex: 1,
      },
      {
        headerName: "البريد الإلكتروني",
        field: "email",
        sortable: true,
        flex: 1,
      },
      {
        headerName: "الهاتف",
        field: "phone",
        sortable: true,
        flex: 1,
      },
      {
        headerName: "عدد الدورات",
        field: "courses_count",
        sortable: true,
        flex: 0.5,
      },
      {
        headerName: "إجراءات",
        field: "actions",
        cellRenderer: (params) => (
          <div>
            <div
              className="btn"
              onClick={() =>
                navigate(`/academy/TrainersManagment/edit/${params.data.id}`)
              }
            >
              <FaEdit />
            </div>
            <div
              className="btn"
              onClick={() => {
                setDeletingId(params.data.id);
                setShowModal(true);
              }}
              style={{ marginLeft: "5px" }}
            >
              <FaTrash />
            </div>
          </div>
        ),
        flex: 0.5,
      },
    ],
    [navigate]
  );

  return (
    <>
      {loading ? (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <div>
          <HeaderAcademy
            btn={
              <button
                onClick={() => navigate("/academy/TrainersManagment/add")}
                className="btn btn-primary"
              >
                اضافة مدرب
              </button>
            }
            title={"ادارة المدربين"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 28 29"
                fill="none"
              >
                <circle
                  opacity="0.5"
                  cx="16.8"
                  cy="8.65547"
                  r="2.8"
                  fill="#7E8799"
                />
                <ellipse
                  opacity="0.5"
                  cx="17.7331"
                  cy="18.9211"
                  rx="4.66667"
                  ry="2.8"
                  fill="#7E8799"
                />
                <circle cx="11.2021" cy="8.65521" r="3.73333" fill="#7E8799" />
                <ellipse
                  cx="11.2013"
                  cy="18.9208"
                  rx="6.53333"
                  ry="3.73333"
                  fill="#7E8799"
                />
              </svg>
            }
          />
          <TableAg
            columnDefs={columnDefs}
            rowData={rowData}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            onEdit={(data) => console.log("Edit:", data)}
            onDelete={(data) => console.log("Delete:", data)}
          />
          <AcademyDeleteModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </>
  );
}
