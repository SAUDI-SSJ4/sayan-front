import classes from "./SingleProductRate.module.scss";
import StarIcon from "@mui/icons-material/Star";
const SingleProductRate = () => {
  return (
    <div className={classes.Card}>
      <div className="container">
        <div className={classes.mainrate}>
          <div>
            <h3>تقييم المنتج</h3>
            <p>تم تقييم هذا المنتج من قِبل 593 طالب</p>
          </div>
          <div>
            4.75
            <StarIcon style={{ color: "#FABF35" }} />
          </div>
        </div>
        <div className={classes.manyReviews}>
          <div className={classes.oneReview}>
            <div className={classes.profile}>
              <img />
              <div>
                Loream
                <div className="d-flex gap-1">
                  <StarIcon style={{ color: "#FABF35" }} />
                  <StarIcon style={{ color: "#FABF35" }} />
                  <StarIcon style={{ color: "#FABF35" }} />
                  <StarIcon style={{ color: "#FABF35" }} />
                </div>
              </div>
            </div>
            <p>Loream Ipsum is the client that Loream Ipsum</p>
          </div>
          <div className={classes.oneReview}>
            <div className={classes.profile}>
              <img />
              <div>
                Loream
                <div className="d-flex gap-1">
                  <StarIcon style={{ color: "#FABF35" }} />
                  <StarIcon style={{ color: "#FABF35" }} />
                  <StarIcon style={{ color: "#FABF35" }} />
                  <StarIcon style={{ color: "#FABF35" }} />
                </div>
              </div>
            </div>
            <p>Loream Ipsum is the client that Loream Ipsum</p>
          </div>
          <div className={classes.oneReview}>
            <div className={classes.profile}>
              <img />
              <div>
                Loream
                <div className="d-flex gap-1">
                  <StarIcon style={{ color: "#FABF35" }} />
                  <StarIcon style={{ color: "#FABF35" }} />
                  <StarIcon style={{ color: "#FABF35" }} />
                  <StarIcon style={{ color: "#FABF35" }} />
                </div>
              </div>
            </div>
            <p>Loream Ipsum is the client that Loream Ipsum</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductRate;
