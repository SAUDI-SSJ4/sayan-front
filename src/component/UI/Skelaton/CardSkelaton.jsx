import { Avatar, Skeleton } from "@mui/material";

const CardSkelaton = () => {
    return ( <div className="mt-4">
        <Skeleton variant="rounded" width="100%">
          <div style={{ paddingBottom: '57%' }} />
        </Skeleton>
        <div className="d-flex gap-1 mt-2 align-items-center">
        <Skeleton variant="circular">
        <Avatar />
            </Skeleton>
            <div className="d-flex" style={{flex:'1'}}>
            <Skeleton variant="text" width={"40%"}>
       
            </Skeleton>
            </div>
        </div>
    </div> );
}
 
export default CardSkelaton;