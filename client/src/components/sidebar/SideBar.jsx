import React from "react";
import "../../css/sidebar.css";
import { Users } from "../../dummydata";
import {
	MdRssFeed,
	MdDateRange,
	MdChatBubble,
	MdVideoLibrary,
	MdBookmark,
} from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaUserAlt, FaQuestion, FaGraduationCap } from "react-icons/fa";
import { IconContext } from "react-icons";

const SideBarFriends = (props) => {
	const { profilePicture, username } = props;

	return (
		<ul className='friendslist'>
			<li className='friend'>
				<img className='image' src={profilePicture} alt='' />
				<span className='name'>{username}</span>
			</li>
		</ul>
	);
};

const SideBar = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div className='sidebar'>
			{/* -------------------------------------------------------------- */}
			<div className='sb-wrapper'>
				<ul className='list-items'>
					<li className='item'>
						<IconContext.Provider value={{ className: "sidebar-icon" }}>
							<MdRssFeed />
						</IconContext.Provider>
						<span>Feed</span>
					</li>
					<li className='item'>
						<IconContext.Provider value={{ className: "sidebar-icon" }}>
							<MdChatBubble />
						</IconContext.Provider>
						<span>chats</span>
					</li>
					<li className='item'>
						<IconContext.Provider value={{ className: "sidebar-icon" }}>
							<MdVideoLibrary />
						</IconContext.Provider>
						<span>videos</span>
					</li>
					<li className='item'>
						<IconContext.Provider value={{ className: "sidebar-icon" }}>
							<FaUserAlt />
						</IconContext.Provider>
						<span>group</span>
					</li>
					<li className='item'>
						<IconContext.Provider value={{ className: "sidebar-icon" }}>
							<MdBookmark />
						</IconContext.Provider>

						<span>BookMarks</span>
					</li>
					<li className='item'>
						<IconContext.Provider value={{ className: "sidebar-icon" }}>
							<FaQuestion />
						</IconContext.Provider>
						<span>Questions</span>
					</li>
					<li className='item'>
						<IconContext.Provider value={{ className: "sidebar-icon" }}>
							<BsFillBriefcaseFill />
						</IconContext.Provider>
						<span>Jobs</span>
					</li>
					<li className='item'>
						<IconContext.Provider value={{ className: "sidebar-icon" }}>
							<MdDateRange />
						</IconContext.Provider>
						<span>Events</span>
					</li>
					<li className='item'>
						<IconContext.Provider value={{ className: "sidebar-icon" }}>
							<FaGraduationCap />
						</IconContext.Provider>
						<span>courses</span>
					</li>
				</ul>

				{/* -------------------------------------------------------------- */}
				<button className='btn-showMore'>Show More</button>
				{/* -------------------------------------------------------------- */}

				{Users.map((item) => (
					<SideBarFriends
						key={item.id}
						profilePicture={
							item.profilePicture ? PF + item.profilePicture : PF + "/noAvatar.png"
						}
						username={item.username}
					/>
				))}
			</div>
		</div>
	);
};

export default SideBar;
