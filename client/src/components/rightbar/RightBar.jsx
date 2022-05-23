import React, { useContext, useEffect, useState } from "react";
import "../../css/rightbar.css";
import { FaBirthdayCake } from "react-icons/fa";
import Online from "../online/Online";
import { Users } from "../../dummydata";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

const HomeRightBar = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div>
			<div className='birthdaycontainer'>
				<FaBirthdayCake className='birthdayicon' color='tomato' />
				<span className='birthdaytxt'>
					<b>Tom Hardy</b> and <b>5 others</b> have birthday Today
				</span>
			</div>
			<img className='adimg' src={PF + "/noCover.png"} alt='' />
			<h4 className='h4rb'>online Friends</h4>
			{Users.map((item) => (
				<Online
					key={item.id}
					profilePicture={
						item.profilePicture ? PF + item.profilePicture : PF + "/noAvatar.png"
					}
					username={item.username}
				/>
			))}
		</div>
	);
};

// ------------------------------------------------------------ //

const ProfileRightBar = ({ user }) => {
	const { user: currentUser, dispatch } = useContext(AuthContext);
	const [friends, setFriends] = useState([]);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	let value = currentUser.followings.includes(user._id);
	console.log(value);

	// const value = currentUser.followings.includes(user._id);
	const [followed, setFollowed] = useState(value);
	console.log(user, currentUser);
	console.log(currentUser.followings.includes(user._id), followed);

	// currentUser.followings.includes(user.id)
	// console.log(user);

	// useEffect(() => {
	// 	setFollowed(currentUser.followings.includes(user.id));
	// }, [user, currentUser]);

	useEffect(() => {
		const getFriends = async () => {
			// if (user === true) {
			try {
				if (user._id) {
					const response = await axiosInstance.get(`/users/friends/${user._id}`);
					setFriends(response.data);
				}
			} catch (error) {
				console.log(error);
			}
			// }
		};
		getFriends();
	}, [user._id]);

	const clickHandler = async () => {
		try {
			if (value) {
				const res = await axiosInstance.put(`/users/${user._id}/unfollow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "UNFOLLOW", payload: user._id });
				console.log(res);
			} else {
				const res = await axiosInstance.put(`/users/${user._id}/follow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "FOLLOW", payload: user._id });
				console.log(res);
			}
		} catch (error) {
			console.log(error);
		}
		value = !value;
	};
	return (
		<div className='profilerightbar'>
			{currentUser.username !== user.username && (
				<button className='rightbarfollowbtn' onClick={clickHandler}>
					{value ? "unfollow" : "follow +"}
				</button>
			)}
			<h4 className='rightbartitle'>User Information</h4>
			<div className='rightbarinfoitem'>
				<span className='rbinfokey'>city:</span>
				<span className='rbinfovalue'>{user.city}</span>
			</div>
			<div className='rightbarinfoitem'>
				<span className='rbinfokey'>From:</span>
				<span className='rbinfovalue'>{user.from}</span>
			</div>
			<div className='rightbarinfoitem'>
				<span className='rbinfokey'>Relation-Ship:</span>
				<span className='rbinfovalue'>{user.relationShip}</span>
			</div>
			<h4 className='rightbartitle'>Your Friends</h4>
			<div className='rightbarfollowings'>
				{friends.map((friend) => (
					<Link to={`/profile/${friend.username}`} style={{ textDecoration: "none" }}>
						<div className='rbfollowing'>
							<img
								className='rbfollowingimg'
								src={friend.profilePicture ? PF + friend.profilePicture : PF + "/noAvatar.png"}
								alt=''
							/>
							<span className='rbfollwoingname'>{friend.username}</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

const RightBar = ({ user }) => {
	return (
		<div className='rightbar'>
			{user ? <ProfileRightBar user={user} /> : <HomeRightBar />}
		</div>
	);
};
export default RightBar;
