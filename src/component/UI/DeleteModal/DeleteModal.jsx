import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import DeleteConfirmation from "../../../assets/icons/DeleteConfrimation";
import toast from "react-hot-toast";
import { useDeleteProduct } from "../../../framework/accademy/product";

const DeleteModal = ({ show, setShow, onDeleteHandler, id }) => {
  const OnHide = () => {
    setShow(false);
  };
  let idData;
  useEffect(() => {
    if (id) {
      idData = id;
    } else {
      idData = 0;
    }
  }, [id]);
  let { data, deleteDataa } = useDeleteProduct(id);

  return id ? (
    <Modal centered show={show} onHide={OnHide} className="modal-student">
      <Modal.Body style={{ direction: "rtl" }}>
        <div
          className="d-flex gap-1 align-items-center"
          style={{ direction: "rtl" }}
        >
          <DeleteConfirmation />
          <p
            className="m-0"
            style={{ fontSize: "22px", color: "#2B3674", fontWeight: "bold" }}
          >
            ازالة العنصر
          </p>
        </div>
        <div style={{ marginTop: "32px", fontSize: "16px", color: "#7E8799" }}>
          هل أنت متأكد من ازالة العنصر ؟
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
            marginTop: "32px",
          }}
        >
          <button
            className="btn btn-danger"
            onClick={() => {
              OnHide();
              if (onDeleteHandler) {
                onDeleteHandler();
              } else {
                deleteDataa();
                toast.success("   تم حذف العنصر");
              }
            }}
          >
            ازالة
          </button>
          <span
            style={{ color: "#7E8799", fontSize: "600", cursor: "pointer" }}
            onClick={OnHide}
          >
            {" "}
            الرجوع
          </span>
        </div>
      </Modal.Body>
    </Modal>
  ) : (
    ""
  );
};

export default DeleteModal;
