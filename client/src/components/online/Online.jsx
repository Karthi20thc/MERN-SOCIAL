import React from "react";

const Online = (props) => {
	const { profilePicture, username } = props;
	return (
		<div>
			<ul className='friendslistrb'>
				<li className='friendrb'>
					<div className='profileconrb'>
						<img src={profilePicture} alt='' className='profileimgrb' />
						<span className='onlinedot'></span>
					</div>
					<span className='friendnamerb'>{username}</span>
				</li>
			</ul>
		</div>
	);
};

export default Online;
