import { useNavigate } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import StudentOpinionForm from "./components/StudentOpinionForm";

const AddStudentOpinion = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-5 all-info-top-header main-info-top">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name ">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}>اضافة</div>
            </div>
            <div
              className="updateBtn"
              onClick={() =>
                navigate(location.pathname.replace(/\/(edit\/.*|add)/, ""))
              }
            >
              الرجوع <KeyboardBackspaceIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="CustomCard formCard all-add-notific pb-4 pt-4">
        <StudentOpinionForm />
      </div>
    </div>
  );
};

export default AddStudentOpinion;
