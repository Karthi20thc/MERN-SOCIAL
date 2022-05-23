import React, { useContext, useEffect, useState } from "react";
import "../../css/post.css";
import { MdMoreVert } from "react-icons/md";
import { AiFillLike, AiFillHeart } from "react-icons/ai";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

// import { Users } from "../../dummydata";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

const Post = (props) => {
	const { desc, photo, likes, comment, userId, createdAt, postId } = props;
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	// console.log(userId);
	const [likeCount, setLikeCount] = useState(likes.length);
	const [islike, setIslike] = useState(false);
	const [userFetch, setUserFetch] = useState({});
	const { user: currentUser } = useContext(AuthContext);
	// console.log(userFetch);

	// console.log(props); // 10 objects were recieved at same time individually.
	// const user = Users.filter((item) => item.id === userId);

	// const user = Users.filter((item) => item.id === 1);
	// console.log(user); // we get 10 logs of the same match.

	// Functions
	const likeHandler = () => {
		// setIslike(!islike);
		// console.log(islike); // still false even though on line 22 i toggled the state.
		try {
			axiosInstance.put(`post/${postId}/like`, { userId: currentUser._id });
		} catch (error) {
			console.log(error);
		}

		if (islike === true) {
			setLikeCount(likeCount - 1);
		}
		if (islike === false) {
			setLikeCount(likeCount + 1);
		}
		setIslike(!islike);
	};

	// first i liked my friend post, everything worked fine, but when i refresh the page, i can like the same post again, because the isLiked is set to false initially,
	// so make isLiked to true if , i(peter) liked the post already.
	useEffect(() => {
		setIslike(likes.includes(currentUser._id));
	}, [likes, currentUser._id]);

	//fetching user according to the post
	useEffect(() => {
		const fetchUser = async () => {
			const user = await axiosInstance.get(`/users?userId=${userId}`);
			setUserFetch(user.data);
		};
		fetchUser();
	}, [userId]);
	return (
		<div className='post'>
			<div className='postwrapper'>
				<div className='top'>
					<div className='topleft'>
						<Link to={`profile/${userFetch.username}`}>
							<img
								className='postprofileimg'
								src={
									userFetch.profilePicture ? PF + userFetch.profilePicture : PF + "/noAvatar.png"
								}
								alt=''
							/>
						</Link>
						<span className='postusername'>{userFetch.username}</span>

						<span className='posttime'>{format(createdAt)}</span>
					</div>
					<div className='topright'>
						<MdMoreVert />
					</div>
				</div>
				{/* <hr /> */}
				<div className='center'>
					<span className='posttxt'>{desc}</span>
					<img className='postimg' src={PF + photo} alt='' />
				</div>
				<div className='postbottom'>
					<div className='pbleft'>
						<AiFillLike className='likeicon' onClick={likeHandler} />
						<AiFillHeart className='likeicon' color='tomato' onClick={likeHandler} />
						<span className='pbright'>{likeCount} people like it</span>
					</div>
					<div className='pbright'> {comment} comments</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
