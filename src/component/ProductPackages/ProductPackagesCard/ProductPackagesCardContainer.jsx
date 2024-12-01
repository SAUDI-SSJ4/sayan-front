import { useEffect } from "react";
import ProductPackagesCard from "./ProductPackagesCard";
import { mockUsers } from "./mock";
import AreaChart from "../../charts/doubleArea";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AreaChartNormal from "../../charts/AreaChart";

const data = mockUsers(8);
const ProductPackagesCardContainer = ({
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
    <div style={{ backgroundColor: "white", padding: "25px 10px" }}>
      <div className="row g-3">
        {/* <div className="row p-0 mb-4 w-100">
          <div className="col-lg-4 ">
            <div className="chartCard">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3>معدل رضاء العملاء</h3>
                  <p>93%</p>
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
                      height: "20px",
                    }}
                  />
                  90% (راضي)
                </div>
                <div>
                  <FiberManualRecordIcon
                    sx={{
                      color: "rgba(255, 71, 170, 0.8)",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                  10% (غير راضي)
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="chartCard">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3>عدد الطلبات أثناء العروض  </h3>
                  <p> 258 طلب</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChartNormal color={'rgba(71, 255, 145, 0.1) '} borderColor={'rgba(71, 255, 145, 1)'}/>
                </div>
              </div>
              <div className="ChartFooter">
                <div>
                عرض التقرير
                </div>
                
              </div>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="chartCard">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3> المبيعات </h3>
                  <p>5,302 ر.س.</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChartNormal color={'rgba(14, 133, 255, 0.1) '} borderColor={'rgba(14, 133, 255, 1)'}/>
                </div>
              </div>
              <div className="ChartFooter">
                <div>
                عرض التقرير
                </div>
                
              </div>
            </div>
          </div>
        </div> */}
        {data.map((item, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 col-xl-4" key={index}>
              <ProductPackagesCard
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

export default ProductPackagesCardContainer;
