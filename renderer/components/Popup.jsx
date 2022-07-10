import { useState } from "react";
import { renameCollection, deleteCollection } from "../renderer";

const Popup = ({ name, id }) => {
	const [isShow, setIsShow] = useState(false);
	const [text, setText] = useState(name);

	const renameElement = isShow && (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					renameCollection(name, text);
					setText("");
					setIsShow(false);
				}}
			>
				<input
					type="text"
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
			</form>
		</div>
	);
	return (
		<div>
			<button
				type="button"
				onClick={() => {
					setIsShow((prevState) => !prevState);
				}}
			>
				rename
			</button>
			{renameElement}
			<button
				type="button"
				onClick={() => {
					deleteCollection(name);
				}}
			>
				delete
			</button>
		</div>
	);
};

export default Popup;
