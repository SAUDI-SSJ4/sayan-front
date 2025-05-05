import PlayBtn from "../../../component/Icons/PlayBtn";
import CertificationIcon from "../../../component/Icons/CertificationIcon";
import GraduateIcon from "../../../component/Icons/GraduateIcon";
import SubjectSlider from "../../../component/AcadmyLayouts/SubjectCard/subjectSlider";
import StudentRateSection from "../../../component/AcadmyLayouts/studentRate/StudentRate";
import AcademyFooter from "../../../component/AcadmyLayouts/Footer/Footer";
import MouseAnimation from "../../../assets/images/Animation.gif";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AcademyLayoutNavbar from "../../../component/AcadmyLayouts/AcademyLayoutNavbar/AcademyLayoutNavbar";
import FAQ from "../../../component/AcadmyLayouts/Faq/FAQ";
import {
  getAbout,
  getAcademyCourses,
  getAcademyFaqs,
  getAcademyOpinions,
  getAcademyProfile,
  getAcademySettings,
  getFooter,
  getSlider,
} from "../../../utils/apis/client/academy";

const Layout1 = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [academyData, setAcademyData] = useState(null);

  useEffect(() => {
    const getAcademyData = async () => {
      try {
        setIsLoading(true);
        const [
          sliderData,
          settingsData,
          profile,
          aboutData,
          coursesData,
          opinions,
          faqs,
        ] = await Promise.all([
          getSlider(id),
          getAcademySettings(id),
          getAcademyProfile(id),
          getAbout(id),
          getAcademyCourses(id),
          getAcademyOpinions(id),
          getAcademyFaqs(id),
        ]);
        setAcademyData({
          slider: sliderData?.slider,
          settings: settingsData?.template,
          profile,
          about: aboutData?.about,
          courses: coursesData?.data,
          opinions: opinions?.data,
          faqs: faqs.data,
        });
      } catch (error) {
        console.error("Error fetching academy slider:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAcademyData();
  }, [id]);

  if (isLoading)
    return (
      <div className="w-full h-50 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  return (
    !isLoading &&
    academyData && (
      <>
        <AcademyLayoutNavbar profile={academyData.profile} />

        <div className="container mb-4">
          <div className="row aboutAcademyLayout g-3 mt-3">
            <div className="col-lg-6">
              <div data-aos="fade-up" className="SectionText">
                <h2>
                  <span>{academyData.slider.title}</span> <br />
                  {academyData.slider.sub_title} <span>.</span>
                </h2>
                <p className="fs-6 fw-medium text-content--1">
                  {academyData.slider.content}
                </p>
                <div className="Btn buttons-header">
                  <a
                    href={academyData.settings.first_button_link}
                    className="Primary button-one-1 button-head"
                  >
                    {academyData.settings.first_button_title}
                  </a>
                  <a
                    className="Secondry button-one-1 text-decoration-none"
                    href={academyData.settings.second_button_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {academyData.settings.second_button_title}
                    <PlayBtn
                      color={academyData.settings.primary_color}
                      iconColor={academyData.settings.primary_color}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div data-aos="fade-right" className="SectionImage">
                <img src={academyData.slider.image} alt="Slider" />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center cursor-pointer mt-sm-5">
            <img
              style={{ width: "54px", cursor: "pointer" }}
              src={MouseAnimation}
              alt="Mouse Animation"
            />
          </div>
        </div>

        {/* نبذة عن المعلم */}
        <div>
          <div className="container mt-5">
            <div className="row g-3 aboutAcademyLayout">
              <div className="col-lg-6">
                <div data-aos="fade-up" className="SectionImage">
                  <img src={academyData.about.image} alt="About Image" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="SectionText">
                  <h2 data-aos="fade-up" data-aos-duration="1000">
                    <span>{academyData.about.title}</span> <br />
                    {academyData.about.sub_title} <span>.</span>
                  </h2>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="100"
                    className="fs-6 fw-medium text-content--1"
                  >
                    {academyData.about.content}
                  </p>
                  <div
                    className="d-flex"
                    style={{
                      alignItems: "center",
                      gap: "40px",
                      marginTop: "30px",
                    }}
                  >
                    <div
                      data-aos="fade-right"
                      data-aos-duration="1000"
                      data-aos-delay="200"
                      style={{
                        fontWeight: "600",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        fontSize: "20px",
                      }}
                      className="title-text--1"
                    >
                      <CertificationIcon />
                      {academyData.about.feature_one}
                    </div>
                    <div
                      data-aos="fade-right"
                      data-aos-duration="1000"
                      data-aos-delay="300"
                      style={{
                        width: "2px",
                        backgroundColor: "rgba(50, 50, 50, 0.50)",
                        height: "30px",
                      }}
                    ></div>
                    <div
                      data-aos="fade-right"
                      data-aos-duration="1000"
                      data-aos-delay="400"
                      style={{
                        fontWeight: "600",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        fontSize: "20px",
                      }}
                      className="title-text--1"
                    >
                      <GraduateIcon />
                      {academyData.about.feature_two}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SubjectSlider courses={academyData.courses} />
        {academyData.opinions.length > 0 && (
          <StudentRateSection opinions={academyData.opinions} />
        )}
        {academyData.faqs.length > 0 && <FAQ faqs={academyData.faqs} />}
        <AcademyFooter
          footerData={{
            footer: {
              image: academyData.profile.image,
            },
          }}
        />
      </>
    )
  );
};

export default Layout1;
