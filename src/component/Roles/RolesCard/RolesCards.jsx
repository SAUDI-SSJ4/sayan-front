import {mockUsers} from './mock'
import RolesCard from './RolesCard';

const RolesCards = ({data}) => {
    return ( <div className='row justify-content-center CustomCard' > 
{
    data.map((item,index)=>(<div className='col-lg-5 col-md-10 d-flex justify-content-center '> <RolesCard name={item.name} permissio={item.permissions}/></div>))
}

    </div> );
}
 
export default RolesCards;