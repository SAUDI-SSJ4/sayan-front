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
      {data && data.length > 0 ? (
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
      ) : (
        <div className="text-center p-5" style={{ 
          backgroundColor: '#f8f9fa', 
          borderRadius: '12px', 
          border: '2px dashed #dee2e6',
          margin: '20px 0'
        }}>
          <div style={{ fontSize: '64px', color: '#6c757d', marginBottom: '16px' }}>🎓</div>
          <h4 style={{ color: '#495057', marginBottom: '8px' }}>لا توجد شهادات حالياً</h4>
          <p style={{ color: '#6c757d', marginBottom: '0' }}>لم يتم إصدار أي شهادة بعد. ستظهر الشهادات هنا بعد إكمال الطلاب للدورات.</p>
        </div>
      )}
    </div>
  );
};

export default CertficatesCardContainer;
