import { RiTwitterXFill } from "react-icons/ri";


import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FaFacebook } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import Insta from "../../assets/icons/Insta.svg";
import { useState, useEffect } from "react";
import StudentBanner from "../../assets/images/StudentBanner.jpg";
import UpdateProfile from "./UpdateProfile";
import styless from "./UpdateProfile.module.css";
import defaultUser from "../../assets/images/default-user.jpg";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";


const Profile = () => {
  const [showUpdate, setShowUpdate] = useState(false);

  const [user, setUser] = useState(null);
const token = Cookies.get("student_token");
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get('https://www.sayan-server.com/academy/students/5', {
        headers: {
          Authorization: `Bearer ${token}`,
      },
      });
      setUser(response.data);
      console.log("response: ", response);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  fetchUser();
}, []);

  const { name, email, phone, image } = user ?? {};
  
  console.log("User Info: " + user);


  return (
    <div className="all-porfile mt-3">
      <div className="ProfileHeader">
        <div className="ProfileBg">
          <img src={user ? user.image : StudentBanner} height={200} className="w-100 object-fit-cover rounded"   alt="" />
        </div>
        <div className="ProfileInfo">
          <div className="d-flex flex-wrap">
            <div className="ProfileImage overflow-hidden">
              <img src={user ? user.image : defaultUser} />
            </div>
            <div>
              <h2>{user?.name}</h2>
              <span>تاريخ الإنشاء : {user?.created_at?.split('T')[0]}</span>
            </div>
          </div>
          <div className="updateBtn" onClick={() => setShowUpdate(true)}>
            تحديث المعلومات
          </div>
        </div>
      </div>
      <div className="mt-3 mb-5 row g-3">
        <div className="col-lg-6 col-md-12">
          <div className="personalCard">
            <div className="personalCardHeader">
              <h2>المعلومات الشخصية</h2>
            </div>
            <div className="row PersonalInfo">
              <div className=" col-12 col-sm-6 ">
                <h3>الاسم</h3>
                <span>{user?.name}</span>
              </div>
              {/* <div className=" col-12 col-sm-6 ">
                <h3>الدور</h3>
                <span>مدير النظام </span>
              </div> */}
              <div className=" col-12 col-sm-6 ">
                <h3>النوع</h3>
                <span>ذكر </span>
              </div>
              <div className=" col-12 col-sm-6 ">
                <h3>كلمة المرور</h3>
                <span> * * * * * </span>
              </div>
              <div className=" col-12 col-sm-6 ">
                <h3>رقم الهاتف</h3>
                <span>{user?.phone}</span>
              </div>
              <div className=" col-12 col-sm-6 ">
                <h3>البريد الالكتروني</h3>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
        {/* so */}
        <div className="col-lg-6 col-md-12">
          <div className="personalCard">
            <div className="personalCardHeader">
              <h2>وسائل التواصل الاجتماعي </h2>
            </div>
            <div className="socialLinks">
              <div className="socialRow">
                <div className="socialInfo">
                  <div className="socialIcon">
                    <RiTwitterXFill style={{ fontSize: "32px" }} />
                  </div>
                  <div>
                    <h3>Twitter</h3>
                    <span>@Mohammed</span>
                  </div>
                </div>
                <div>
                  <MoreVertIcon />
                </div>
              </div>
              <div className="socialRow">
                <div className="socialInfo">
                  <div className="socialIcon">
                    <FaFacebook style={{ fontSize: "32px", color: "#0E85FF" }} />
                  </div>
                  <div>
                    <h3>Facebook</h3>
                    <span>@Mohammed</span>
                  </div>
                </div>
                <div>
                  <MoreVertIcon />
                </div>
              </div>
              <div className="socialRow">
                <div className="socialInfo">
                  <div className="socialIcon">
                    <FaSnapchatGhost style={{ fontSize: "32px", color: "#F7CF00" }} />
                  </div>
                  <div>
                    <h3>Snapchat</h3>
                    <span>@Mohammed</span>
                  </div>
                </div>
                <div>
                  <MoreVertIcon />
                </div>
              </div>
              <div className="socialRow">
                <div className="socialInfo">
                  <div className="socialIcon">
                    <img src={Insta} width={32} />
                  </div>
                  <div>
                    <h3>Instagram</h3>
                    <span>@Mohammed</span>
                  </div>
                </div>
                <div>
                  <MoreVertIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showUpdate && (
        <>
          <UpdateProfile setShowUpdate={setShowUpdate} profileData={user} />
          <button className={`${styless.close} btn-close`} onClick={() => setShowUpdate(false)}></button>
        </>
      )}
    </div>
  );
};

export default Profile;
