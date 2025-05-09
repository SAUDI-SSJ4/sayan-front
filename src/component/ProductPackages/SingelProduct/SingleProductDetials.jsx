import classes from "./SingleProductDetials.module.scss";
import mainImage from "./../../../assets/images/packge.png";
import user from "./../../../assets/images/Ellipse.png";
const SingleProductDetials = () => {
  return (
    <div className={`${classes.Card} p-0`}>
      <div className=" d-flex align-items-center flex-column">
        <div className="d-flex align-items-center flex-wrap gap-4">
          <div>
            <img className="w-100 h-100 object-fit-cover" src={mainImage} />
          </div>
          <div>
            <div className={classes.ProductInfo}>
              <h3 className="title-text--1">عنوان المنتج</h3>
              <h4 className="title-text--1">عنوان المنتج</h4>
              <p className="text-content--1">
                loream ipsum is that loream ipsum is that loream ipsum is that
                loream ipsum is that loream ipsum is that loream.
              </p>
              <div className={`${classes.Price} price-num`}>
                <div>80.00 ر.س.</div>
              </div>
            </div>
          </div>
        </div>
        <div className={`row g-3 all-content-bottom ${classes.Numbers}`}>
          <div className="col-lg-4">
            <h1 className="price-num--1">50</h1>
            <h4 className="text-content--1">منتج رقمي</h4>
          </div>
          <div className="col-lg-4">
            <h1 className="price-num--1">3</h1>
            <h4 className="text-content--1">دورة تدريبية</h4>
          </div>
        </div>
        <div className="row g-3 w-100">
          <div className="col-lg-4">
            <div className={`card ${classes.SmallCard}`}>
              <img
                className="card-img-top w-100 h-100 object-fit-cover"
                style={{ maxHeight: "190px" }}
                src={mainImage}
                alt="Card image cap"
              />
              <div className="card-body">
                <span>الدورة التدريبية</span>
                <h5 className="card-title title-text--1"> عنوان الدورة</h5>
                <div className="d-flex gap-2">
                  <div className="notActive">غير تفاعلية</div>
                  <div className="Ended">مجانية</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={`card ${classes.SmallCard}`}>
              <img
                className="card-img-top w-100 h-100 object-fit-cover"
                style={{ maxHeight: "190px" }}
                src={mainImage}
                alt="Card image cap"
              />
              <div className="card-body">
                <span>الدورة التدريبية</span>
                <h5 className="card-title"> عنوان الدورة</h5>
                <div className="d-flex gap-2">
                  <div className="notActive">غير تفاعلية</div>
                  <div className="Ended">مجانية</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={`card ${classes.SmallCard}`}>
              <img
                className="card-img-top w-100 h-100 object-fit-cover"
                style={{ maxHeight: "190px" }}
                src={mainImage}
                alt="Card image cap"
              />
              <div className="card-body">
                <span>الدورة التدريبية</span>
                <h5 className="card-title"> عنوان الدورة</h5>
                <div className="d-flex gap-2">
                  <div className="notActive">غير تفاعلية</div>
                  <div className="Ended">مجانية</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetials;
