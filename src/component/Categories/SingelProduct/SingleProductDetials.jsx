import classes from "./SingleProductDetials.module.scss";
import mainImage from "./../../../assets/images/ProductInfo.png";
import user from "./../../../assets/images/Ellipse.png";
const SingleProductDetials = () => {
  return (
    <div className={classes.Card}>
      <div className=" d-flex align-items-center flex-column">
        <img src={mainImage} />
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
          <h3>عنوان المنتج</h3>
          <h4>عنوان المنتج</h4>
          <p>
            loream ipsum is that loream ipsum is that loream ipsum is that
            loream ipsum is that loream ipsum is that loream.
          </p>
          <div className={classes.Price}>
            <div>80.00 ر.س.</div>
          </div>
        </div>
        <div className={`row ${classes.Numbers}`}>
          <div className="col-lg-4">
            <h1>50</h1>
            <h4>المحتوى</h4>
          </div>
          <div className="col-lg-4">
            <h1>3</h1>
            <h4>المحتوى</h4>
          </div>
          <div className="col-lg-4">
            <h1>7455</h1>
            <h4>المحتوى</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetials;
