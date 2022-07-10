import { useState } from "react";

import Popup from "./Popup";

import "../styles/collection.css";

const Collection = ({ id, name, handleCurrentCollection, active }) => {
	const [isVisible, setIsVisible] = useState(false);
	const popupElement = isVisible && <Popup name={name} id={id} />;
	return (
		<li key={id}>
			<button
				className={active ? "sideMenuButtonActive" : "sideMenuButton"}
				onContextMenu={() => {
					setIsVisible((prevState) => !prevState);
				}}
				onClick={() => {
					handleCurrentCollection(`${name}Collection`);
				}}
				type="button"
			>
				{name}
			</button>
			{popupElement}
		</li>
	);
};

export default Collection;
