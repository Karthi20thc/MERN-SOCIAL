import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import SideBar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import { axiosInstance } from "../../config";

import "../../css/profile.css";

const Profile = () => {
	const [user, setUser] = useState({});
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const username = useParams().username;
	console.log(user);

	useEffect(() => {
		const fetchUser = async () => {
			const response = await axiosInstance.get(`/users?username=${username}`);
			setUser(response.data);
		};
		console.log("Fetching user by username");
		fetchUser();
	}, [username]);
	return (
		<div>
			<TopBar />
			<div className='profile'>
				<SideBar />
				<div className='profileright'>
					<div className='profilerighttop'>
						<div className='profilecover'>
							<img
								src={user.coverPicture ? PF + user.coverPicture : PF + "/noCover.png"}
								alt=''
								className='profilecoverimg'
							/>
							<img
								src={user.profilePicture ? PF + user.profilePicture : PF + "/noAvatar.png"}
								alt=''
								className='profileuserimg'
							/>
						</div>
						<div className='profileinfo'>
							<h4 className='profileinfoname'>{user.username}</h4>
							<span className='profiledesc'>{user.description}</span>
						</div>
					</div>
					<div className='profilerightbottom'>
						<Feed username={username} />
						<RightBar user={user} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
