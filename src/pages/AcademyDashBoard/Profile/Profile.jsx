import { useEffect } from "react";
import useImage from "./../../../assets/icons/Acadmy.png";
import header from "./../../../assets/images/academy/header.png"
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebook, FaSnapchatGhost } from "react-icons/fa";
import Insta from "../../../assets/icons/Insta.svg";
import { useProfile } from "../../../framework/accademy/profile";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { data: profileData, isLoading, errors } = []; //useProfile();

  const navigate = useNavigate();

  const profileInfo = useSelector((state) => state.academyUser.academy);

  const { name, email, phone, image } = profileInfo.user ?? {};

  const {
    name: academyName,
    email: academyEmail,
    facebook,
    twitter,
    instagram,
    snapchat,
    image: academyImage,
    cover,
    address,
    about,
    phone: academyPhone,
  } = profileInfo.academy ?? {};

  return (
    <div className="all-info-top-header main-info-top">
      <div className="mt-3">
        <div className="ProfileHeader">
          <div className="">
            <img
              height={200}

              src={cover ? cover : header}  

              alt="Cover"
              className="w-100 object-fit-cover rounded"
            />
          </div>
          <div className="ProfileInfo">
            <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
              <div className="d-flex flex-wrap">
                <div className="ProfileImage overflow-hidden">
                  <img src={image ?? useImage} className="object-fit-cover" alt="Profile" />
                </div>
                <div>
                  <h2 className="fs-6 fw-medium title-text--1">{academyName ?? "Academy Name"}</h2>
                  <p className="fs-6 fw-medium text-content--1">
                    {academyEmail ?? "Email not available"}
                  </p>
                </div>
              </div>
              <div onClick={() => navigate("/academy/Profile/edit")} className="updateBtn">
                تحديث المعلومات
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 g-3 row">
          <div className="col-lg-6 col-md-12">
            <div className="personalCard">
              <div className="personalCardHeader">
                <h2 className="fs-6 fw-medium title-text--1">المعلومات الشخصية</h2>
              </div>
              <div className="row PersonalInfo">
                <div className="col-12 col-sm-6">
                  <h3 className="fs-6 fw-medium title-text--1">الاسم</h3>
                  <span className="fs-6 fw-medium title-text--1">
                    {name ?? "Name not available"}
                  </span>
                </div>
                <div className="col-12 col-sm-6">
                  <h3 className="fs-6 fw-medium title-text--1">الدور</h3>
                  <span className="fs-6 fw-medium title-text--1">مدير النظام</span>
                </div>
                {phone && (
                  <div className="col-12 col-sm-6">
                    <h3 className="fs-6 fw-medium title-text--1">رقم الهاتف</h3>
                    <span className="fs-6 fw-medium title-text--1">
                      {phone ?? "Phone not available"}
                    </span>
                  </div>
                )}
                <div className="col-12 col-sm-6">
                  <h3 className="fs-6 fw-medium title-text--1">البريد الالكتروني</h3>
                  <span className="fs-6 fw-medium title-text--1">
                    {email ?? "Email not available"}
                  </span>
                </div>
                {/* {academyPhone && (
                  <div className="col-6 col-sm-6">
                    <h3 className="fs-6 fw-medium title-text--1">هاتف الأكاديمية</h3>
                    <span className="fs-6 fw-medium title-text--1">
                      {academyPhone ?? "Academy phone not available"}
                    </span>
                  </div>
                )} */}
                {address && (
                  <div className="col-6">
                    <h3 className="fs-6 fw-medium title-text--1">العنوان</h3>
                    <span className="fs-6 fw-medium title-text--1">
                      {address ?? "Address not available"}
                    </span>
                  </div>
                )}
                {about && (
                  <div className="col-6">
                    <h3 className="fs-6 fw-medium title-text--1">حول الأكاديمية</h3>
                    <span className="fs-6 fw-medium title-text--1">
                      {about ?? "About not available"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="personalCard">
              <div className="personalCardHeader">
                <h2 className="fs-6 fw-medium title-text--1">وسائل التواصل الاجتماعي</h2>
              </div>
              <div className="socialLinks">
                {twitter && (
                  <div className="socialRow">
                    <div className="socialInfo">
                      <div className="socialIcon">
                        <RiTwitterXFill style={{ fontSize: "32px" }} />
                      </div>
                      <div>
                        <h3 className="fs-6 fw-medium title-text--1">Twitter</h3>
                        <span className="fs-6 fw-medium title-text--1">
                          @{twitter.split("/").pop()}
                        </span>
                      </div>
                    </div>
                    <div></div>
                  </div>
                )}
                {facebook && (
                  <div className="socialRow">
                    <div className="socialInfo">
                      <div className="socialIcon">
                        <FaFacebook style={{ fontSize: "32px", color: "#0E85FF" }} />
                      </div>
                      <div>
                        <h3 className="fs-6 fw-medium title-text--1">Facebook</h3>
                        <span className="fs-6 fw-medium title-text--1">
                          @{facebook.split("/").pop()}
                        </span>
                      </div>
                    </div>
                    <div></div>
                  </div>
                )}
                {snapchat && (
                  <div className="socialRow">
                    <div className="socialInfo">
                      <div className="socialIcon">
                        <FaSnapchatGhost style={{ fontSize: "32px", color: "#F7CF00" }} />
                      </div>
                      <div>
                        <h3 className="fs-6 fw-medium title-text--1">Snapchat</h3>
                        <span className="fs-6 fw-medium title-text--1">
                          @{snapchat.split("/").pop()}
                        </span>
                      </div>
                    </div>
                    <div></div>
                  </div>
                )}
                {instagram && (
                  <div className="socialRow">
                    <div className="socialInfo">
                      <div className="socialIcon">
                        <img src={Insta} width={32} alt="Instagram" />
                      </div>
                      <div>
                        <h3 className="fs-6 fw-medium title-text--1">Instagram</h3>
                        <span className="fs-6 fw-medium title-text--1">
                          @{instagram.split("/").pop()}
                        </span>
                      </div>
                    </div>
                    <div></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
