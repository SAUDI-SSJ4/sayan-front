import { useEffect } from "react";
import CertficatesCard from "./CertficatesCard";
import { mockUsers } from "./mock";
import cer from "../../../assets/images/c.png";
const data = mockUsers(8);

const CertficatesCardContainer = ({
  setCheckedKeys,
  checkedKeys,
  setData,
  notAdmin
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
    <div className="info-details--1">
      <div className="row g-3">
        {data.map((item, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 col-xl-4" key={index}>
              <CertficatesCard
                image={cer}
                notAdmin={notAdmin}
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

export default CertficatesCardContainer;
