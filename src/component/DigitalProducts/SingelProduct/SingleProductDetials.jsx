import classes from "./SingleProductDetials.module.scss";
import mainImage from "./../../../assets/images/ProductInfo.png";
import user from "./../../../assets/images/Ellipse.png";
const SingleProductDetials = () => {
  return (
    <div className={`${classes.Card} card-single`}>
      <div className=" d-flex align-items-center flex-column">
        <img src={mainImage} className="img-card--1" />
        <div style={{ width: "100%" }}>
          <div
            style={{
              gap: "10px",
              alignItems: "center",
              position: "relative",
              display: "flex",
              marginTop: "30px",
            }}
          >
            <img
              src={user}
              style={{
                width: "40px",
                height: "40px",
                position: "absolute",
                right: "0",
                borderRadius: "50%",
              }}
              
            />
            <div style={{ width: "40px", height: "40px" }}></div>

            <span>اكاديمية ضوء </span>
          </div>
        </div>
        <div className={classes.ProductInfo}>
          <h3 className="title-text--1">عنوان المنتج</h3>
          <h4 className="title-text--1">عنوان المنتج</h4>
          <p  className="text-content--1">
            loream ipsum is that loream ipsum is that loream ipsum is that
            loream ipsum is that loream ipsum is that loream.
          </p>
          <div className={`${classes.Price} card-price-button`}>
            <div className="price-num">80.00 ر.س.</div>
          </div>
        </div>
        <div className={`row all-content-bottom g-3 ${classes.Numbers}`}>
          <div className="col-lg-4">
            <h1 className="price-num--1">50</h1>
            <h4 className="text-content--1">المحتوى</h4>
          </div>
          <div className="col-lg-4">
            <h1 className="price-num--1">3</h1>
            <h4 className="content-text--1">المحتوى</h4>
          </div>
          <div className="col-lg-4">
            <h1 className="price-num--1">7455</h1>
            <h4 className="content-text--1">المحتوى</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetials;
