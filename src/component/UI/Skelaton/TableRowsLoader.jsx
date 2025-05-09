import { Skeleton } from "@mui/material";

const TableRowsLoader = () => {
  return ( 
    <div className="row">
<div className="col-3">
  <Skeleton variant="text" sx={{width:'100%',height:'30px'}} />
</div>
<div className="col-3">
  <Skeleton variant="text" sx={{width:'100%',height:'30px'}} />
</div>
<div className="col-3">
  <Skeleton variant="text" sx={{width:'100%',height:'30px'}} />
</div>
<div className="col-3">
  <Skeleton variant="text" sx={{width:'100%',height:'30px'}} />
</div>
    </div>
   );
}
 
export default TableRowsLoader ;