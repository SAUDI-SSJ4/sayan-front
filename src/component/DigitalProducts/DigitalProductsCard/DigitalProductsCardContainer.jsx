import { useEffect } from "react";
import DigitalProductsCard from "./DigitalProductsCard";
import { mockUsers } from "./mock";
import AreaChart from "../../charts/doubleArea";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AreaChartNormal from "../../charts/AreaChart";

const data = mockUsers(8);
const DigitalProductsCardContainer = ({
  setCheckedKeys,
  checkedKeys,
  setData
}) => {
  const handleCheck = (item) => {
    if (checkedKeys.some((i) => i === item)) {
      setCheckedKeys(checkedKeys.filter((i) => i !== item));
    } else {
      setCheckedKeys([...checkedKeys, item]);
    }
  };
  useEffect(() => {
    setData(data);
  }, []);

  return (
    <div
      className="digital-info"
      style={{
        backgroundColor: "white",
        padding: "25px",
        border: "1px #EDEFF2 solid",
        borderRadius: "10px"
      }}
    >
      <div className="row g-3 mt-3">
        <div className="row g-3 p-0 justify-content-center m-auto">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="chartCard h-100">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3 className="fs-6 fw-medium title-text--1">
                    معدل رضاء العملاء
                  </h3>
                  <p className="fs-6 fw-medium title-text--1">93%</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChart />
                </div>
              </div>
              <div className="ChartFooter">
                <div>
                  <FiberManualRecordIcon
                    sx={{
                      color: "       #47FFFF80",
                      width: "20px",
                      height: "20px"
                    }}
                    className="fs-6 fw-medium title-text--1"
                  />
                  90% (راضي)
                </div>
                <div>
                  <FiberManualRecordIcon
                    sx={{
                      color: "rgba(255, 71, 170, 0.8)",
                      width: "20px",
                      height: "20px"
                    }}
                    className="fs-6 fw-medium title-text--1"
                  />
                  10% (غير راضي)
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="chartCard h-100">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3 className="fs-6 fw-medium title-text--1">
                    عدد الطلبات أثناء العروض{" "}
                  </h3>
                  <p className="fs-6 fw-medium title-text--1"> 258 طلب</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChartNormal
                    color={"rgba(71, 255, 145, 0.1) "}
                    borderColor={"rgba(71, 255, 145, 1)"}
                  />
                </div>
              </div>
              <div className="ChartFooter">
                <div className="fs-6 fw-medium title-text--1">عرض التقرير</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="chartCard h-100">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3 className="fs-6 fw-medium title-text--1"> المبيعات </h3>
                  <p className="fs-6 fw-medium title-text--1">5,302 ر.س.</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChartNormal
                    color={"rgba(14, 133, 255, 0.1) "}
                    borderColor={"rgba(14, 133, 255, 1)"}
                  />
                </div>
              </div>
              <div className="ChartFooter">
                <div className="fs-6 fw-medium title-text--1">عرض التقرير</div>
              </div>
            </div>
          </div>
        </div>
        {data.map((item, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 col-xl-4" key={index}>
              <DigitalProductsCard
                image={item.user.image}
                onCheck={() => handleCheck(item)}
                checked={checkedKeys.some((i) => i === item)}
                user={item.user}
                active={item.isActive == "active"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DigitalProductsCardContainer;
