import React, { useContext, useEffect, useState } from "react";
import "../../css/feed.css";
import Post from "../post/Post";
import Share from "../share/Share";
// import { Posts } from "../../dummydata";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

// ---------------------------------------------------------------------------------------//
const Feed = (props) => {
	const { username } = props;
	const { user } = useContext(AuthContext); // this is our current user i.e you logged into the app.

	const [postFetch, setPostFetch] = useState([]);
	// -------------------------------------------- //
	useEffect(() => {
		const fetchPost = async () => {
			if (username) {
				const response = await axiosInstance.get("/post/profile/" + username);
				setPostFetch(response.data);
			} else {
				const response = await axiosInstance.get(`/post/timeline/${user._id}`);

				setPostFetch(
					response.data.sort((post1, post2) => {
						return new Date(post2.createdAt) - new Date(post1.createdAt);
					})
				);
			}
		};
		fetchPost();
	}, [username, user._id]);

	return (
		<div className='feed'>
			<div className='sharewrapper'>
				{(!username || username === user.username) && <Share />}
				{/* <Post /> */}
				{postFetch.map((post) => (
					<Post
						key={post._id}
						postId={post._id}
						desc={post.description}
						photo={post.image}
						createdAt={post.createdAt}
						date={post.date}
						userId={post.userId}
						likes={post.likes}
						comment={post.comment}
					/>
				))}
			</div>
		</div>
	);
};

export default Feed;

// id: 1,
// desc: "Love For All, Hatred For None.",
// photo: "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
// date: "5 mins ago",
// userId: 1,
// like: 32,
// comment: 9,
