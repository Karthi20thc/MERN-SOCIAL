import axios from "axios";
import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { axiosInstance } from "../../config";

import "../../css/login.css";

const Register = () => {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const history = useHistory();

	const handleClick = async (event) => {
		event.preventDefault();
		if (password.current.value !== passwordAgain.current.value) {
			password.current.setCustomValidity("Password mismatch");
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};

			try {
				const response = await axiosInstance.post("/auth/register", user);
				history.push("/login");
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div className='login'>
			<div className='loginwrapper'>
				<div className='loginleft'>
					<h3 className='loginlogo'>Now Cast</h3>
					<span className='logindesc'>Come and see the world with us. Join Now</span>
				</div>
				<div className='loginright'>
					<form className='logincon' onSubmit={handleClick}>
						<input
							type='text'
							placeholder='User Name'
							ref={username}
							required
							className='logininput'
						/>
						<input
							type='email'
							placeholder='Enter your email'
							ref={email}
							required
							className='logininput'
						/>
						<input
							type='password'
							ref={password}
							required
							placeholder='enter your password'
							className='logininput'
						/>
						<input
							type='password'
							ref={passwordAgain}
							required
							placeholder='Re enter your password'
							className='logininput'
						/>
						<button className='loginbutton' type='submit'>
							Sign Up
						</button>
						<span className='forgetpass'>Already have an Account? Login Below</span>
					</form>
					<Link to='/login' className='link-register'>
						<button className='registerbutton'>Log In</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
