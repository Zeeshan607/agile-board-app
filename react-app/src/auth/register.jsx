import React,  {useState, } from 'react';
import {useNavigate, Link,  } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import  {SelectErrors, SelectMessages, resetResp} from '../features/ResponseSlice.js';
import CustomRequest from '../utils/customRequest.jsx';
import { toast}  from 'react-toastify';
function Register(){

const [form, setForm]=useState({name:'',email:'',password:''});
// const [email, setEmail]=useState('');
// const [password, setPassword]=useState('');
const dispatch= useDispatch();
const navigate= useNavigate();
const [isSubmitting, setIsSubmitting]=useState(false)

const formReset=()=>{
	setForm({name:'',email:'',password:''})
}
const onRegister= async (e)=>{
		e.preventDefault();
		setIsSubmitting(true)
		let data= {
			username:form.name,
			email:form.email,
			password: form.password
		}
		try{
			const resp= await CustomRequest.post('/auth/register',data);
			const user= await resp.data.user;
			setIsSubmitting(false);
			formReset();
			toast.success("Success: " +resp.data?.msg);
			setTimeout(function(){
				navigate('/');
			},2000)
		
			// console.log(user)
		}catch(err){
			// console.log(err);
			setIsSubmitting(false);
		formReset();
			toast.error("Error: "+err?.response?.data?.msg)
		
			
		}
}




// const errors= useSelector(SelectErrors);
// const messages= useSelector(SelectMessages);
// console.log(errors);
return(
    <main className="d-flex w-100">
		<div className="container d-flex flex-column">
			<div className="row vh-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Register</h1>
							<p className="lead">
								Create your acccount to manage all of your projects and tasks.
							</p>
						
						{/* {	
						errors.length?(
							errors.map((err,i)=>(
								<div className="alert alert-danger alert-dismissible fade show" role="alert" key={i}>
								<strong>Error: </strong>{err}.
								<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{dispatch(resetResp())}}></button>
							  </div>
									)
								)
							):('')
							
							}
	{	
						messages.length?(
							messages.map((msg,i)=>(
								<div className="alert alert-success alert-dismissible fade show" role="alert" key={i}>
								<strong>Success: </strong>{msg}.
								<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{dispatch(resetResp())}}></button>
							  </div>
									)
								)
							):('')
							
							} */}
							
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-4">
									<form>
										<div className="mb-3">
											<label className="form-label">Name</label>
											<input className="form-control form-control-lg" type="text" value={form.name}  onChange={(e)=> setForm({...form, name:e.target.value})} name="username" placeholder="Enter your name" />
										</div>
										<div className="mb-3">
											<label className="form-label">Email</label>
											<input className="form-control form-control-lg" type="email" name="email" value={form.email} onChange={(e)=> setForm({...form, email:e.target.value})} placeholder="Enter your email" />
										</div>
										<div className="mb-3">
											<label className="form-label">Password</label>
											<input className="form-control form-control-lg" type="password" name="password" value={form.password} onChange={(e)=> setForm({...form, password:e.target.value})} placeholder="Enter password" />
										</div>
										<div className="text-center mt-3">
											 <button type="submit" onClick={onRegister} className="btn btn-lg btn-primary" disabled={isSubmitting}>{isSubmitting?"Submitting...":"submit"}</button>
											 <Link to={"/"} className='ms-3'> Login</Link>
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</main>
)
}
export default Register;