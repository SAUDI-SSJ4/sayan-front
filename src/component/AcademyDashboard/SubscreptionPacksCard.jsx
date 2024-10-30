import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Spinner } from "react-bootstrap";
import { useFinance } from "../../framework/website/finance";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import axios from "axios";

const AcademySubscreptionPacksCard = () => {
  const router = useNavigate();
  const token = localStorage.getItem("tokenC");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  let { data: profileData, isLoading, errors } = useFinance();

  if (errors) return <Error />;
  if (isLoading)
    return (
      <>
        <div className="w-full h-50 d-flex justify-content-center align-items-center">
          <Spinner className="" />
        </div>
      </>
    );

  console.log(profileData);

  const sweetFunctiontoAddFav = (e) => {
    Swal.fire({
      title: "الاشتراك في الباقة",
      text: "هل تريد الاشتراك في هذة الباقة",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "اشترك",
      cancelButtonText: "لا",
    }).then((result) => {
      if (result.isConfirmed) {
        if (token) {
          setIsAuthenticated(true);

          // Open new window early
          const newWindow = window.open();

          axios
            .post(
              "https://sayan.nour-projects.com/academy/subscripe",
              { package_id: e },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => res.data)
            .then((data) => {
              // Log the response to check what it contains
              console.log("API Response HTML:", data);

              // Safeguard: if no data, close the window
              if (!data) {
                console.error("No data received");
                if (newWindow) newWindow.close();
                return;
              }

              // Write to the new window
              if (newWindow) {
                newWindow.document.open();
                newWindow.document.write(data); // Write the HTML content
                newWindow.document.close(); // Close document for rendering

                // Log to confirm content was written
                console.log("HTML content written to new window");
              }

              setIsDataFetched(true);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              if (newWindow) newWindow.close(); // Close window if error
            });
        } else {
          setIsAuthenticated(false);
          console.log("Token is missing.");
        }
        Swal.fire({
          title: "تمت",
          text: "تم توجيهك لنافذة خارجية لمتابعة الاشتراك في الباقة",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="CustomCard main-custom-card">
      <div className="row g-3 m-auto  justify-content-center">
        {profileData?.data?.map((e, i) => {
          return (
            <div className="col-lg-6 col-md-12 mt-3" key={i}>
              <div
                style={{
                  border: " 1px solid #EDEFF2",
                  borderRadius: "16px",
                  padding: "36px 30px",
                }}
                className="card-one---1"
              >
                <div>
                  <h2
                    style={{
                      fontSize: "24px",
                      color: "#2B3674",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                    className="fs-6 fw-medium text-content--1"
                  >
                    {e.title}
                  </h2>
                  <h2
                    style={{
                      fontSize: "30px",
                      color: "#2B3674",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                    className="fs-5 fw-bold title-text--1"
                  >
                    {e.price} ر.س.
                  </h2>
                </div>
                <div style={{ marginTop: "70px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                      marginTop: "24px",
                    }}
                  >
                    <FiberManualRecordIcon
                      sx={{ color: "#0E85FF", width: "18px", height: "18px" }}
                    />
                    <span style={{ color: "#2B3674", fontSize: "20px" }}>
                      عدد الدورات : {e.courses}{" "}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                      marginTop: "24px",
                    }}
                  >
                    <FiberManualRecordIcon
                      sx={{ color: "#0E85FF", width: "18px", height: "18px" }}
                    />
                    <span style={{ color: "#2B3674", fontSize: "20px" }}>
                      عدد المستخدمين : {e.users}{" "}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                      marginTop: "24px",
                    }}
                  >
                    <FiberManualRecordIcon
                      sx={{ color: "#0E85FF", width: "18px", height: "18px" }}
                    />
                    <span style={{ color: "#2B3674", fontSize: "20px" }}>
                      المدة : {e.duration}{" "}
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "70px" }}>
                  <button
                    onClick={() => sweetFunctiontoAddFav(e?.id)}
                    className="updateBtn"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      padding: "16px",
                      backgroundColor: "transparent",
                      textAlign: "center",
                    }}
                  >
                    اشترك
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AcademySubscreptionPacksCard;
