import React, { useContext } from "react";
import "../../css/topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MdSearch, MdMessage, MdNotifications } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

// ------------------------------------------------------------------//
const TopBar = () => {
	// useEffect(() => {
	// 	const tb = document.querySelector(".topbar");
	// 	console.log(tb.offsetHeight);
	// }, []);
	const { user, dispatch } = useContext(AuthContext);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const logoutHandler = () => {
		// localStorage.removeItem("user");
		dispatch({ type: "LOG_OUT" });
		window.location.replace("/");
	};
	return (
		<div className='topbar'>
			{/* ---------------------------------------- */}
			<div className='tb-leftbar'>
				<Link to='/' style={{ textDecoration: "none" }}>
					<span className='logo'>NowCast</span>
				</Link>
			</div>
			{/* ---------------------------------------- */}
			<div className='tb-centerbar'>
				<div className='searchbar'>
					<IconContext.Provider value={{ className: "search-icon" }}>
						<MdSearch />
					</IconContext.Provider>

					<input type='text' placeholder='Search for a Friend or post' />
				</div>
			</div>
			{/* ---------------------------------------- */}
			<div className='tb-rightbar'>
				<div className='links'>
					<span className='link'>Welcome {user.username}</span>
					<span className='link' onClick={logoutHandler}>
						Log Out
					</span>
				</div>
				<div className='icons'>
					<div className='icon'>
						<IconContext.Provider value={{ className: "i" }}>
							<FaUserAlt />
						</IconContext.Provider>
						<span className='icon-badge'>1</span>
					</div>

					<div className='icon'>
						<IconContext.Provider value={{ className: "i" }}>
							<MdMessage />
						</IconContext.Provider>

						<span className='icon-badge'>1</span>
					</div>

					<div className='icon'>
						<IconContext.Provider value={{ className: "i" }}>
							<MdNotifications />
						</IconContext.Provider>

						<span className='icon-badge'>1</span>
					</div>
					<Link to={`/profile/${user.username}`}>
						<img
							src={user.profilePicture ? PF + user.profilePicture : PF + "/noAvatar.png"}
							alt=''
							className='Img'
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default TopBar;
