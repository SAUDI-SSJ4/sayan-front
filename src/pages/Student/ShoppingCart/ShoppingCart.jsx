import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import classes from "./ShoppingCart.module.scss";
import { useState } from "react";
import PDf from "../../../assets/icons/PDFicon.svg";
const ShoppingCart = () => {
  const [TableOrNot, setTableOrNot] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);
  const checkAllHandler = () => {
    setCheckedKeys((perv) => {
      if (
        perv?.length === data?.length &&
        (perv?.length !== 0 || data?.length !== 0)
      ) {
        return [];
      } else {
        return [...data];
      }
    });
  };
  return (
    <div>
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}> عربة التسوق </div>
          </div>
        </div>
      </div>
      <div className="info-details--1 pt-0">
        <div className="row gx-3 gy-4">
          <div className="col-lg-8">
            <div className={`${classes.Card} all-cards-info`}>
              <div
                className="p-2 pb-4 pt-3 card-one"
                style={{ borderBottom: "1px solid #EDEFF2" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="card-details-info w-100">
                    <div className="card-info mb-3 d-flex justify-content-between align-items-center gap-3 flex-wrap">
                      <div className="d-flex align-items-center gap-3">
                        <img src={PDf} />
                        <div>
                          <h3>عنوان المنتج</h3>
                          <p>
                            حجم الملف: 250 غيغا
                            <br />
                            اكاديمية ضوء
                          </p>
                        </div>
                        
                      </div>
                      <div style={{ color: "#2B3674", fontWeight: "600" }}>
                      90.00 ر.س.
                    </div>
                    </div>
                    <div className="main-buttons d-flex gap-2 mt-2">
                      <div
                        className="btn-new"
                        style={{
                          border: "1px solid #EDEFF2",
                          padding: "5px",
                          borderRadius: "4px",
                          color: "#0D6EFD",
                          fontWeight: "600"
                        }}
                      >
                        اضافة الى قائمة المفضلة
                      </div>
                      <div
                        className="btn-new btn-remove"
                        style={{
                          border: "1px solid #EDEFF2",
                          padding: "5px",
                          borderRadius: "4px",
                          color: "#FA3434",
                          fontWeight: "600"
                        }}
                      >
                        ازالة
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
              <div
              className="p-2 pb-4 pt-3 card-one"
              style={{ borderBottom: "1px solid #EDEFF2" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="card-details-info w-100">
                  <div className="card-info mb-3 d-flex justify-content-between align-items-center gap-3 flex-wrap">
                    <div className="d-flex align-items-center gap-3">
                      <img src={PDf} />
                      <div>
                        <h3>عنوان المنتج</h3>
                        <p>
                          حجم الملف: 250 غيغا
                          <br />
                          اكاديمية ضوء
                        </p>
                      </div>
                      
                    </div>
                    <div style={{ color: "#2B3674", fontWeight: "600" }}>
                    90.00 ر.س.
                  </div>
                  </div>
                  <div className="main-buttons d-flex gap-2 mt-2">
                    <div
                      className="btn-new"
                      style={{
                        border: "1px solid #EDEFF2",
                        padding: "5px",
                        borderRadius: "4px",
                        color: "#0D6EFD",
                        fontWeight: "600"
                      }}
                    >
                      اضافة الى قائمة المفضلة
                    </div>
                    <div
                      className="btn-new btn-remove"
                      style={{
                        border: "1px solid #EDEFF2",
                        padding: "5px",
                        borderRadius: "4px",
                        color: "#FA3434",
                        fontWeight: "600"
                      }}
                    >
                      ازالة
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
             
              <div className="main-buttons d-flex">
                <div
                  className="btn-new btn-remove"
                  style={{
                    border: "1px solid #FA3434",
                    padding: "5px",
                    borderRadius: "4px",
                    color: "#FA3434",
                    fontWeight: "600"
                  }}
                >
                  ازالة الكل
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={classes.Card}>
              <h3 className="mb-3"> لديك كوبون خصم؟</h3>
              <div className={classes.Input}>
                <input type="text" placeholder="ادخل كود الخصم" />
                <div>تطبيق</div>
              </div>
            </div>
            <div className={classes.Card} style={{ marginTop: "30px" }}>
              <div className="d-flex align-items-center justify-content-between">
                <p>المجموع</p>
                <p>180.00 ر.س.</p>
              </div>
              <div
                className="d-flex align-items-center justify-content-between pb-3"
                style={{ borderBottom: "1px solid #EDEFF2" }}
              >
                <p>الخصم</p>
                <p style={{ color: "#FA3434" }}>180.00 ر.س.</p>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <h3>المجموع</h3>
                <h3>180.00 ر.س.</h3>
              </div>
              <div className="addBtn mt-3">متابعة وشراء</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
