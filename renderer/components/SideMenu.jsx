import { useEffect, useState } from "react";

import { addCollection, getCollections } from "../renderer";
import { cutCollectionFromName } from "../helpers";

import Collection from "./Collection";

import "../styles/sidemenu.css";

const SideMenu = ({
	pageState,
	currentCollection,
	handleCurrentCollection,
}) => {
	const [collections, setCollections] = useState([]);

	const [text, setText] = useState("");

	useEffect(() => {
		getCollections().then((data) => {
			console.log(data);
			setCollections(data);
		});
	}, [pageState]);
	const collectionsElement =
		pageState === "global" &&
		collections.map((el) => (
			<Collection
				key={el.name}
				active={el.name === currentCollection}
				name={cutCollectionFromName(el.name)}
				handleCurrentCollection={handleCurrentCollection}
			/>
		));
	/*	if (pageState === "today")
		collectionsElement = (
			<>
				<Collection
					key="today"
					name="today"
					handleCurrentCollection={handleCurrentCollection}
				/>
				<Collection
					key="planned"
					name="planned"
					handleCurrentCollection={handleCurrentCollection}
				/>
				<Collection
					key="old"
					name="old"
					handleCurrentCollection={handleCurrentCollection}
				/>
			</>
		); */

	return (
		<div className="sideMenu">
			<ul>
				{collectionsElement}
				<li>
					<button type="button"> add new</button>
				</li>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addCollection(text).then((res) => console.log(res));
						setText("");
					}}
				>
					<input
						value={text}
						type="text"
						onChange={(e) => {
							setText(e.target.value);
						}}
					/>
				</form>
			</ul>
		</div>
	);
};

export default SideMenu;
