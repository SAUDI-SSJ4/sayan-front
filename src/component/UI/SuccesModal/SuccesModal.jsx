import Modal from 'react-bootstrap/Modal';
import SuccesGif from "../../../assets/images/succes.gif"
import { useEffect } from 'react';
const SuccesModal = ({show,setShow}) => {
    useEffect(() => {

        setTimeout(() => {
            setShow(false)
        }, 7000);
    },show);
    return ( <Modal show={show}   className='SuccesModalConainer'>

<img  src={SuccesGif}/>

    </Modal>  );
}
 
export default SuccesModal;