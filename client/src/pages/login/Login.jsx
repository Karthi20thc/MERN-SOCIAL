import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { LoginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "../../css/login.css";

const Login = () => {
	const email = useRef();
	const password = useRef();
	const { user, isFetching, error, dispatch } = useContext(AuthContext);

	const clickHandler = (event) => {
		event.preventDefault();
		// console.log(email.current.value);
		LoginCall(
			{ email: email.current.value, password: password.current.value },
			dispatch
		);
		console.log(error);
		console.log(user);
		console.log(isFetching);
	};
	return (
		<div className='login'>
			<div className='loginwrapper'>
				<div className='loginleft'>
					<h3 className='loginlogo'>NowCast</h3>
					<span className='logindesc'>Come and see the world with us. Join Now</span>
				</div>
				<div className='loginright'>
					<form className='logincon' onSubmit={clickHandler}>
						<input
							type='email'
							placeholder='Enter your email'
							required
							ref={email}
							className='logininput'
						/>
						<input
							ref={password}
							required
							type='password'
							// minLength={6}
							placeholder='enter your password'
							className='logininput'
						/>
						<button className='loginbutton' type='submit' disabled={isFetching}>
							{isFetching ? "Fetching" : "Login"}
						</button>
						<span className='forgetpass'>Forget Password ?</span>
					</form>
					<Link to='/register' className='link-register'>
						<button className='registerbutton'>Create New Account</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
