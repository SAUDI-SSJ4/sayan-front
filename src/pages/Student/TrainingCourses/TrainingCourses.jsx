// import { useState } from "react";
// import { Link } from "react-router-dom";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { useQuery } from "@tanstack/react-query";
// import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
// import TrainingCoursesCardContainer from "../../../component/TrainingCourses/TrainingCoursesCard/TrainingCoursesCardContainer";
// import { getStudentCourses } from "../../../utils/apis/client";
// import { CourseTabs } from "./CourseTabs";
// import CoursesContainer from "./features/CoursesContainer";
// import CoursesContainerNew from "./features/CourseContainerNew";

// const TrainingCourses = () => {

//   const [checkedKeys, setCheckedKeys] = useState([]);
//   const [data, setData] = useState([]);

//   // const { data: studentCourses = [], isLoading, isFetched } = useQuery({
//   //   queryKey: ["studentCourses"],
//   //   queryFn: getStudentCourses,
//   //   retry: 2,
//   //   refetchOnWindowFocus: false,
//   //   refetchOnMount: false,
//   //   cacheTime: 1000,
//   // });
//   const isLoading = false;
//   const isFetched = true;

// const studentCourses = [
//   {
//     id: 1,
//     title: "تحسين محركات البحث",
//     image: "https://s3-alpha-sig.figma.com/img/8aac/a3e2/de93b86425d6da606a9465a4464a6f4a?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y8B5qp4u~fPNY9nHF38dwcizmiwXjaJxw7y66tmoIJnVqUGYKuiPo24isRkrrg4xwVBfRP9IDQiHmAo1P059RM9kpYWR0Gs~fM4qZ~daeLmjqZ-IuhmAfafPWdrxOJjv7QennpfOwmQVstPFo3-vjCPjJeMMxXTsBTHRwf2t6t9mmIiWd2PhLSC6zkfRurFmFd3~I16DB1JEcyJm~Q5kdjhEwRFy6XbEvLVVqJClpDm6hWb3NAcEYMNhmGVgBJad9sFSeTxAmcob9~7YfVETn5SyS34~BO80AiB14KwS5lcB~YxurDPVI-L5d9b5E-jaH4djtcCcUuLnbdInaT1ofA__",
//     instructor: "أحمد محمد",
//     started: false,
//     startDate: "jan.01",
//     startTime: "1:00م",
//     type: "تفاعلية",
//     duration: "8 أسابيع",
//     level: "مبتدئ",
//     rating: 4.5,
//     enrolled: 120,
//     academy: "أكاديمية برق",
//     logo: "https://s3-alpha-sig.figma.com/img/07f7/4ec2/c33d109e6888da38aa093c250b718e99?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ayygY-xoQGl-bU9TO7eSDZsm54JHEJ~SpDzeRnqaH~N1J2f9nOXV~A74aWwBfsahaDEr4VlxQS0Le1o2BjYlobY844H972iBMZiIPLFPQjk53GtMBMYtGy9NLPdHYTzUoYeSu1QH0~TRslBZ~Yg7Q~-W7vtkAmp9LIfY9yBoZX2Q2z~reqcDofFt8qpPLAvwmnwELH-BNLt9rhF97Stz6FXUkvExphBATQws1e~kQWggSUT6RL4EPPx1HRv8c5uUSOEh8Kfp4KKdkccIdOi9OYQCoI6s4BLFb8e6MhE7JPcWSsZyeXLCNGNc1cpo~k3qMaYfI-W4jBHFIurSZrgYSg__",
//     price: "free",
//     favorite: false,
//   },
//   {
//     id: 2,
//     title: "تصميم شعار",
//     image: "https://s3-alpha-sig.figma.com/img/e96d/115d/350a08be8664d4587cfff45893c06853?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UvEw-8FJ3yWwLb7CoZuEZRC7pF3sG3gPgesi9~VcfLlmEP0uKQcInHN54qBQxUEUW1vDTF9C8DcFUxZ9s6OVJ6wLBYOLQ-wmUtSs-qgS1We3Bo2nDkWTlBpo0engirxAESnDy8rg0Qx9-sgOVHSIBvlnBx6Uvsn6coW2GXDPPYoGCJ-U5dSnsD0J5rmnjrNdJS3fRGz6m61qxYYL2rrIyWXJmyG-rr0aGuX~22UtjYc1qyXX0NxDxAdlf8ZIIYKwKGpwLSseoaPt5S8La7zzzkxE9hWvMQpd0B-NHECMr790UowEJJRxJ4Fuuqi-Y3i5~TqykN6zDINcMC4RiVrVEg__",
//     instructor: "كمال علي",
//     started: true,
//     startDate: "jan.01",
//     startTime: "1:00م",
//     type: "تفاعلية",
//     duration: "12 أسابيع",
//     level: "متوسط",
//     rating: 4.8,
//     enrolled: 85,
//     academy: "أكاديمية برق",
//     logo: "https://s3-alpha-sig.figma.com/img/07f7/4ec2/c33d109e6888da38aa093c250b718e99?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ayygY-xoQGl-bU9TO7eSDZsm54JHEJ~SpDzeRnqaH~N1J2f9nOXV~A74aWwBfsahaDEr4VlxQS0Le1o2BjYlobY844H972iBMZiIPLFPQjk53GtMBMYtGy9NLPdHYTzUoYeSu1QH0~TRslBZ~Yg7Q~-W7vtkAmp9LIfY9yBoZX2Q2z~reqcDofFt8qpPLAvwmnwELH-BNLt9rhF97Stz6FXUkvExphBATQws1e~kQWggSUT6RL4EPPx1HRv8c5uUSOEh8Kfp4KKdkccIdOi9OYQCoI6s4BLFb8e6MhE7JPcWSsZyeXLCNGNc1cpo~k3qMaYfI-W4jBHFIurSZrgYSg__",
//     price: 299.99,
//     favorite: false,
//   },
//   {
//     id: 3,
//     title: "المنتجات الرقمية",
//     image: "https://s3-alpha-sig.figma.com/img/1f2a/e5bd/7a8959476f89c275615e14256d7e34da?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LZQmmxi~GLoHr5uiTatlMFWGmI7Z00TV8e5V9nIdKNj3iUWdLEoGjgQFmXU-BSKYgZ9f5A7jqloxSeL8LtoIO1IEy~Hl0Hg8RjmzBTi6AU10JJYH-PX-dm2tKx2JAvC1fy0b94yWuKvKGL-wYdn0gnPlvqjn7WT4AQuz~Zn7uc9C7bVvhC9HuXNp1iNDRBkpRKjrHUuEbVzgL9LwlnaxJ4BZWwPEAOpMWLUR-a7ldrb9RzTwND8CTeFC0WN1RruLGX2xiBXaD2BMxJ-jSQMPrcYhg6iWdkp8HwIsQpezC7BJiRxIJM82VYueK8bKuRTZpe6YQGJcZwPyMQx4q61aMQ__",
//     instructor: "محمود حسن",
//     started: false,
//     startDate: "jan.01",
//     startTime: "1:00م",
//     type: "تفاعلية",
//     duration: "10 أسابيع",
//     level: "متقدم",
//     rating: 4.7,
//     enrolled: 60,
//     academy: "أكاديمية برق",
//     logo: "https://s3-alpha-sig.figma.com/img/07f7/4ec2/c33d109e6888da38aa093c250b718e99?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ayygY-xoQGl-bU9TO7eSDZsm54JHEJ~SpDzeRnqaH~N1J2f9nOXV~A74aWwBfsahaDEr4VlxQS0Le1o2BjYlobY844H972iBMZiIPLFPQjk53GtMBMYtGy9NLPdHYTzUoYeSu1QH0~TRslBZ~Yg7Q~-W7vtkAmp9LIfY9yBoZX2Q2z~reqcDofFt8qpPLAvwmnwELH-BNLt9rhF97Stz6FXUkvExphBATQws1e~kQWggSUT6RL4EPPx1HRv8c5uUSOEh8Kfp4KKdkccIdOi9OYQCoI6s4BLFb8e6MhE7JPcWSsZyeXLCNGNc1cpo~k3qMaYfI-W4jBHFIurSZrgYSg__",
//     price: 349.99,
//     favorite: false,
//   },
// ];

//   const handleCheckAll = () => {
//     setCheckedKeys((prevCheckedKeys) => {
//       return prevCheckedKeys.length === data.length
//         ? []
//         : [...data];
//     });
//   };

//   return (
//     <div className="all-info-top-header">
//       <div className="TablePageHeader">
//         <div className="HeaderContainer">
//           <div className="info-content-header d-flex align-items-center gap-3 flex-wrap w-full">
//             <div className="d-flex justify-start name">
//               <div className="icon">
//                 <PeopleAltIcon sx={{ color: "#A3AED0" }} />
//               </div>
//               <div className="text-muted">الدورات التدريبية</div>
//             </div>
//             <div className="justify-items-center place-content-center place-items-center place-self-center">
//             <CourseTabs />
//             </div>
//             {/* <Link to="/student/AffiliateMarketingSetting" className="addBtn">
//               <AddCircleIcon />
//               إضافة دورة جديدة
//             </Link> */}
//           </div>
//         </div>
//       </div>
//       {/* <SearchAndShowBar
//         checkedKeys={checkedKeys}
//         data={data}
//         setCheckedKeys={setCheckedKeys}
//         setTableOrNot={setIsTableView}
//         checkAllHandler={handleCheckAll}
//         TableOrNot={isTableView}
//         notAdmin
//       /> */}
//       {/* <TrainingCoursesCardContainer
//         setData={setData}
//         rowData={studentCourses}
//         checkedKeys={checkedKeys}
//         isLoading={isLoading}
//         isFetched={isFetched}
//         notAdmin
//         setCheckedKeys={setCheckedKeys}
//       /> */}
//       {/* <CoursesContainer
//         isLoading={isLoading}
//         courses={studentCourses}
//       /> */}
//       <CoursesContainerNew
//         isLoading={isLoading}
//         courses={studentCourses}
//       />
//     </div>
//   );
// };

// export default TrainingCourses;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import TrainingCoursesCardContainer from "../../../component/TrainingCourses/TrainingCoursesCard/TrainingCoursesCardContainer";
import { getStudentCourses } from "../../../utils/apis/client"; // The updated API function
import SkeletonCard from "../../../components/SkeletonCard";

const TrainingCourses = () => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const {
    data: studentCourses = [],
    isLoading,
    isFetched,
    error,
  } = useQuery({
    queryKey: ["studentCourses"],
    queryFn: getStudentCourses,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 1000,
  });

  const handleCheckAll = () => {
    setCheckedKeys((prevCheckedKeys) =>
      prevCheckedKeys.length === studentCourses.length
        ? []
        : [...studentCourses]
    );
  };

  return (
    <div className="all-info-top-header">
      {/* Loading and error handling */}
      {isLoading && (
        <>
          <div
            className="d-flex justify-content-between flex-wrap gap-3 SearchAndShowbar all-search-bar animate-pulse"
            style={{
              border: "1px solid #EDEFF2",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div className="w-24 h-6 bg-gray-300 rounded" />
            <div className="flex gap-3 items-center flex-wrap">
              <div className="w-40 h-10 bg-gray-200 rounded" />
              <div className="w-40 h-10 bg-gray-200 rounded" />
              <div className="w-20 h-10 bg-gray-200 rounded" />
            </div>
            <div className="w-24 h-10 bg-gray-200 rounded" />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-0 m-0 mt-2">
            {[...Array(6)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </ul>
        </>
      )}
      {error && <p>Something went wrong: {error.message}</p>}

      {/* Display data after fetching */}
      {isFetched && (
        <>
          <SearchAndShowBar
            onCheckAll={handleCheckAll}
            checkedKeys={checkedKeys}
          />
          <TrainingCoursesCardContainer
            courses={studentCourses}
            checkedKeys={checkedKeys}
            setCheckedKeys={setCheckedKeys}
          />
        </>
      )}
    </div>
  );
};

export default TrainingCourses;
