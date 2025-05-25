import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const NewLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("academy_token");
  const [profileData, setprofileData] = useState(null);
  const [coursesData, setCoursesData] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (token) {
      // Get profile data
      axios
        .get("https://www.sayan-server.com/academy/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setprofileData(data);
          console.log("profile data: ", profileData);
          setLoader(true);
        })
        .catch((error) => {
          navigate("/login");
        });

      // Get courses data
      axios
        .get("https://www.sayan-server.com/api/v1/academies/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setCoursesData(data);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        });
    }
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <section id="section1" className="mt-20">
          <div className="flex gap-4">
            <div className="flex flex-col flex-wrap justify-center gap-4">
              <div>
                <h1 className="font-bold text-5xl text-blue-500">تعلم</h1>
                <h2 className="font-bold text-5xl flex gap-1">
                  شركتك بأمان<p className="text-blue-500">.</p>{" "}
                </h2>
              </div>
              <p className="flex flex-wrap max-w-96">
                خدمة تأسيس الشركات الخارجية وفي السعودية من مجموعة باشماخ لخدمات
                الأعمال تمكنك من بدء عملك التجاري بكل يسر وسهولة، فإذا كنت ترغب
                في إنشاء شركة في المملكة العربية
              </p>
              <div className="flex gap-4">
                <Link className="bg-blue-600 px-5 py-4 rounded-full text-white">
                  ابدأ الآن
                </Link>
                <Link className="border-2 border-blue-800 px-5 py-2 rounded-full blue-text flex justify-center items-center gap-2">
                  مشاهدة فيديو
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="21"
                      cy="21"
                      r="21"
                      fill="#009AFF"
                      fill-opacity="0.13"
                    ></circle>
                    <g clip-path="url(#clip0_16_121)">
                      <path
                        d="M21 4C11.6111 4 4 11.6111 4 21C4 30.3888 11.6111 37.9999 21 37.9999C30.3888 37.9999 37.9999 30.3888 37.9999 21C37.99 11.6153 30.3847 4.01003 21 4ZM28.1593 21.5416C28.0416 21.7777 27.8503 21.9691 27.6142 22.0868V22.0928L17.8999 26.95C17.3 27.2497 16.5707 27.0065 16.2709 26.4065C16.1856 26.236 16.1417 26.0477 16.1428 25.8571V16.1429C16.1425 15.4722 16.6859 14.9283 17.3565 14.928C17.5452 14.9279 17.7312 14.9718 17.8999 15.0561L27.6142 19.9132C28.2144 20.2123 28.4585 20.9414 28.1593 21.5416Z"
                        fill="#009AFF"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_16_121">
                        <rect
                          width="34"
                          height="34"
                          fill="white"
                          transform="translate(4 4)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
              <div className="h-full w-full flex justify-center items-center">
                <img
                  className="w-96 h-96 object-cover rounded-full"
                  src="https://sayan-ten.vercel.app/assets/Mask-96c3fb66.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section id="section2" className="mt-20">
          <div className="flex gap-4">
            <div className="h-full w-full">
              <img
                className="w-96 h-96 object-cover rounded-full"
                src={profileData?.data?.image}
                alt=""
              />
            </div>
            <div className="flex flex-col flex-wrap justify-center gap-4">
              <div>
                <h1 className="font-bold text-5xl text-blue-500">نبذة</h1>
                <h2 className="font-bold text-5xl flex gap-1">
                  عن المدرب <p className="text-blue-500">.</p>{" "}
                </h2>
              </div>
              <p>
                خدمة تأسيس الشركات الخارجية وفي السعودية من مجموعة باشماخ لخدمات
                الأعمال تمكنك من بدء عملك التجاري بكل يسر وسهولة، فإذا كنت ترغب
                في إنشاء شركة في المملكة العربية
              </p>
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.25 32.5H11.25C9.1825 32.5 7.5 30.8175 7.5 28.75V7.5C7.5 5.4325 9.1825 3.75 11.25 3.75H26.25C28.3175 3.75 30 5.4325 30 7.5V13.825C30 14.515 30.5588 15.075 31.25 15.075C31.9412 15.075 32.5 14.515 32.5 13.825V7.5C32.5 4.05375 29.6963 1.25 26.25 1.25H11.25C7.80375 1.25 5 4.05375 5 7.5V28.75C5 32.1963 7.80375 35 11.25 35H21.25C21.9412 35 22.5 34.44 22.5 33.75C22.5 33.06 21.9412 32.5 21.25 32.5Z"
                      fill="#323232"
                    ></path>
                    <path
                      d="M12.5 11.25H21.25C21.9412 11.25 22.5 10.69 22.5 10C22.5 9.31 21.9412 8.75 21.25 8.75H12.5C11.8088 8.75 11.25 9.31 11.25 10C11.25 10.69 11.8088 11.25 12.5 11.25Z"
                      fill="#323232"
                    ></path>
                    <path
                      d="M24.2 16.25C24.2 15.56 23.6413 15 22.95 15H12.5C11.8088 15 11.25 15.56 11.25 16.25C11.25 16.94 11.8088 17.5 12.5 17.5H22.95C23.6413 17.5 24.2 16.94 24.2 16.25Z"
                      fill="#323232"
                    ></path>
                    <path
                      d="M20.65 21.25C20.65 20.56 20.0913 20 19.4 20H12.5C11.8088 20 11.25 20.56 11.25 21.25C11.25 21.94 11.8088 22.5 12.5 22.5H19.4C20.0913 22.5 20.65 21.94 20.65 21.25Z"
                      fill="#323232"
                    ></path>
                    <path
                      d="M12.5 25C11.8088 25 11.25 25.56 11.25 26.25C11.25 26.94 11.8088 27.5 12.5 27.5H18.825C19.5163 27.5 20.075 26.94 20.075 26.25C20.075 25.56 19.5163 25 18.825 25H12.5Z"
                      fill="#323232"
                    ></path>
                    <path
                      d="M37.5 25C37.5 20.8637 34.1362 17.5 30 17.5C25.8637 17.5 22.5 20.8637 22.5 25C22.5 27.2137 23.47 29.2 25 30.575V36.8713C25 37.5637 25.3813 38.1987 25.9925 38.5262C26.6075 38.8562 27.3425 38.82 27.9225 38.4338L30 37.0387L32.0825 38.4363C32.395 38.645 32.755 38.7488 33.1175 38.7488C33.4212 38.7488 33.7275 38.675 34.0075 38.525C34.6187 38.1975 35 37.5625 35 36.87V30.5737C36.53 29.2 37.5 27.215 37.5 25ZM32.5 35.705L30.6975 34.495C30.275 34.2113 29.7263 34.2113 29.3038 34.495L27.5012 35.705V32.0625C28.285 32.3412 29.1237 32.5 30.0012 32.5C30.8787 32.5 31.7175 32.34 32.5012 32.0625L32.5 35.705ZM30 30C27.2425 30 25 27.7575 25 25C25 22.2425 27.2425 20 30 20C32.7575 20 35 22.2425 35 25C35 27.7575 32.7575 30 30 30Z"
                      fill="#323232"
                    ></path>
                  </svg>
                  <p className="font-bold text-xl">3 سنوات</p>
                </div>

                <div>|</div>

                <div className="flex gap-2">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.6237 28.3825V18.0013L36.92 17.8288C37.5487 17.4638 37.9238 16.8125 37.9238 16.0863C37.9238 15.36 37.5487 14.7075 36.92 14.3425L21.7237 5.51501C20.445 4.77001 18.8538 4.77126 17.575 5.51501L2.3775 14.3438C1.75 14.7088 1.375 15.36 1.375 16.0863C1.375 16.8125 1.75 17.4638 2.3775 17.83L6.985 20.5075V26.7313C6.985 28.1763 7.7625 29.52 9.0125 30.2413L15.355 33.8975C16.6788 34.66 18.1637 35.0425 19.6488 35.0425C21.1337 35.0425 22.6175 34.6613 23.9425 33.8975L30.2837 30.2413C31.535 29.5213 32.3125 28.1763 32.3125 26.7313V20.5063L34.3737 19.3088V28.3825C33.845 28.7425 33.4975 29.3488 33.4975 30.0375C33.4975 31.1425 34.3937 32.0388 35.4987 32.0388C36.6037 32.0388 37.5 31.1425 37.5 30.0375C37.5 29.35 37.1525 28.7438 36.6237 28.3825ZM30.0638 26.73H30.0625C30.0625 27.3725 29.7188 27.97 29.1613 28.29L22.82 31.9463C20.865 33.0725 18.4338 33.0725 16.48 31.9463L10.1375 28.29C9.58125 27.97 9.23625 27.3725 9.23625 26.73V21.8138L17.575 26.6588C18.215 27.03 18.9325 27.2163 19.65 27.2163C20.3675 27.2163 21.085 27.0313 21.725 26.6588L30.0638 21.8138V26.73ZM20.5938 24.7138C20.0112 25.0525 19.2875 25.0525 18.705 24.7138L3.85625 16.0863L18.7038 7.45876C19.2862 7.12001 20.01 7.12001 20.5925 7.45876L35.4412 16.085L20.5938 24.7138Z"
                      fill="#323232"
                    ></path>
                  </svg>
                  <p className="font-bold text-xl">+200</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="section3"
          className="mt-20 flex flex-col justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">المواد التعليمية</h2>
          <div className="grid grid-flow-col gap-4 overflow-x-scroll h-full">
            {/* card */}
            {coursesData?.data?.data?.map((course) => (
              <Link
                to={`/academy/${course.academy_id}/SingleCourse/${course.id}`}
                key={course.id}
                className="bg-white shadow-md w-96 p-3 rounded-lg border hover:scale-105 transition"
              >
                <img
                  className="w-96 rounded-lg mb-3"
                  src={course.image}
                  alt={course.title}
                />
                <div className="flex justify-between">
                  <h1 className="text-xl font-bold">
                    {course.title.length > 10
                      ? course.title.substring(0, 10) + "..."
                      : course.title}{" "}
                  </h1>
                  <p className="bg-blue-600 px-3 py-1 rounded-full text-white">
                    {course.type === "attend"
                      ? "حضوري"
                      : course.type === "live"
                      ? "تفاعلية"
                      : "نوع غير معروف"}
                  </p>
                </div>
                <div className="flex justify-between my-1">
                  <p>تقييمات المادة العلمية</p>
                  <p>⭐ {course.stars}</p>
                </div>

                <p className="mb-2">
                  {course.short_content.length > 20
                    ? course.short_content.substring(0, 40) + "..."
                    : course.short_content}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-20 rounded-full"
                      src={course.trainer.image}
                      alt={course.trainer.name}
                    />
                    <div className="flex flex-col">
                      <p className="text-sm">{profileData.data.academy.name}</p>
                      <h1 className="text-sm font-bold">
                        {course.trainer.name}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col text-end">
                    <p className="font-bold">{course.price} ريال</p>
                    <p className="text-gray-400 line-through">
                      {(course.price * 1.1).toFixed(2)} ريال
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            {/* end card */}
          </div>
        </section>

        <section
          id="section4"
          className="mt-28 flex flex-col justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">آراء الطلاب </h2>
          <div className="grid grid-flow-col overflow-x-scroll gap-2">
            <div className="bg-white shaodw-md border w-96 p-3">
              <div className="flex flex-wrap gap-2">
                <img
                  className="h-12"
                  src="https://sayan-ten.vercel.app/assets/RateProfile-94c7ab01.svg"
                />
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-base font-bold">محمد احمد</h3>
                  <p>⭐⭐⭐⭐</p>
                </div>
                <p>
                  النظام ممتاز عشان كذا احنا مازلنا متمسكين لحد وقتنا هذا بالعمل
                  مع مجموعة أحمد باشماخ من وقت بدأنا التأسيس شركتنا
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="section4" className="mt-20 flex justify-center">
          <h2 className="font-bold flex gap-2 text-4xl">
            الأسئلة الشائعة <p className="text-amber-500">؟</p>
          </h2>
          {/* here add slider */}
        </section>
      </div>
    </>
  );
};

export default NewLayout;
