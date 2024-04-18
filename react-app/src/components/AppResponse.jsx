import { SelectMessages,SelectErrors } from "../features/ResponseSlice";
import {useSelector} from 'react-redux';
import React from 'react';
const AppResponse=()=>{

const errors=useSelector(SelectErrors);
const messages=useSelector(SelectMessages)




return (
    <React.Fragment>
						{	
						errors.length?(
							errors.map((err,i)=>(
								<div className="bg-white p-3">
								<div className="alert alert-danger alert-dismissible fade show" role="alert" key={i}>
									<strong>Error: </strong>{err}.
									<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{dispatch(resetResp())}}></button>
							  	</div>
								  </div>
									)
								)
							):('')
							
							}
	
    
                            {	
						messages.length?(
							messages.map((msg,i)=>(
								<div className="bg-white p-3">
								<div className="alert alert-success alert-dismissible fade show" role="alert" key={i}>
								<strong>Success: </strong>{msg}.
								<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{dispatch(resetResp())}}></button>
							  </div>
							  </div>
									)
								)
							):('')
							
							} 
                            </React.Fragment>
)
}
export default AppResponse;