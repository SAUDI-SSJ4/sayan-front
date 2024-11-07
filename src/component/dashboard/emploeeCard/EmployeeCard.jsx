import classes from "./EmployeeCard.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const EmployeeCard = ({ name, title, img }) => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardInfo}>
        <img src={img} />
        <div>
          <h3>{name}</h3>
          <p>{title}</p>
        </div>
      </div>
      <div>
        <MoreVertIcon />
      </div>
    </div>
  );
};

export default EmployeeCard;
