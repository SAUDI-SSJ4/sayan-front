import { Dropdown } from 'rsuite';
import classes from './firstCard.module.scss'
import imagee from '../../../assets/images/Ellipse.png'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const FirstCard = ({image}) => {
    return ( 
        <div className={classes.firstCard}>
            <div className={classes.CardImage}>
                <div className={classes.Dropdown}>
                <Dropdown title="هذا الشهر"  style={{color:'#1E02AA'}}>
    <Dropdown.Item> قبراير</Dropdown.Item>
    <Dropdown.Item>يناير</Dropdown.Item>
  
  </Dropdown>
                </div>
<img src={image} />
            </div>
            <div className={classes.CardInfo}>
                <div className='d-flex justify-content-end'>
                    <img src={imagee} />
                </div>
                <div>
                    <h2>المنتج الاكثر مبيعًا</h2>
                    <p>
                        <ShoppingBasketIcon />
                        عنوان المنتج الرقمي
                    </p>
                </div>
            </div>
        </div>
     );
}
 
export default FirstCard;