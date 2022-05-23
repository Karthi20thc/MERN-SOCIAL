import React, { useContext, useRef, useState } from "react";
import "../../css/share.css";
import { MdPermMedia, MdLocationOn, MdEmojiEmotions } from "react-icons/md";
import { AiFillTag, AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { axiosInstance } from "../../config";

const Share = () => {
	const { user } = useContext(AuthContext);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const postDesc = useRef();
	const [file, setFile] = useState(null);

	const submitHandler = async (event) => {
		event.preventDefault();
		const newPost = {
			userId: user._id,
			description: postDesc.current.value,
		};
		if (file) {
			const data = new FormData(); // The FormData() constructor creates a new FormData object.
			const filename = Date.now() + file.name;
			data.append("name", filename); // here name is the exact word in index.js  req.body.name(api)
			data.append("file", file); // You could add a key/value pair to this using FormData.append:
			newPost.image = filename; // image is the field name in our post model.
			console.log(data);
			console.log(newPost);

			try {
				await axiosInstance.post("/upload", data);
			} catch (error) {
				console.log(error);
			}
		}
		try {
			await axiosInstance.post("/post", newPost);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='share'>
			<div className='sharewrapper'>
				<div className='shtop'>
					<img
						src={user.profilePicture ? PF + user.profilePicture : PF + "/noAvatar.png"}
						alt=''
						className='img'
					/>
					<input
						type='text'
						className='input'
						placeholder={`what on your Mind? ${user.username}`}
						ref={postDesc}
					/>
				</div>
				<hr />
				{file && (
					<div className='shareimgconainer'>
						<img className='shareimg' alt='' src={URL.createObjectURL(file)}></img>
						<AiOutlineClose className='imgclose' onClick={() => setFile(null)} />
					</div>
				)}
				<form className='shbottom' onSubmit={submitHandler}>
					<div className='options'>
						<label htmlFor='file' className='option'>
							<MdPermMedia className='icon' color='tomato' />
							<span className='txt'> Photo or Video</span>
							{/* responsible for opening folder for uploading*/}
							<input
								style={{ display: "none" }}
								type='file'
								id='file'
								accept='.png,.jpeg,.jpg'
								onChange={(event) => setFile(event.target.files[0])}
							/>
						</label>
						<div className='option'>
							<AiFillTag className='icon' color='green' />
							<span className='txt'> Tag</span>
						</div>
						<div className='option'>
							<MdLocationOn className='icon' color='blue' />
							<span className='txt'>Location</span>
						</div>
						<div className='option'>
							<MdEmojiEmotions className='icon' color='yellowgreen' />
							<span className='txt'>Feelings</span>
						</div>
						<button className='sharebtn' type='submit'>
							Share
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Share;
