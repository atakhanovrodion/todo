import { useState, useEffect } from "react";

import { getMeta, setMeta } from "../renderer";

import SideMenu from "./SideMenu";
import Header from "./Header";
import TaskList from "./TaskList";

import "../styles/index.css";

const App = () => {
	// [today,global,checker,training]
	const [pageState, setPageState] = useState(null);
	const [currentCollection, setCurrentCollection] = useState(null);
	const [day, setDay] = useState(-1);

	useEffect(() => {
		getMeta().then((data) => {
			setPageState(data[0].page);
			setCurrentCollection(data[0].collection);
			setDay(data[0].day);
		});
	}, []);

	const endDay = () => {};

	const handlePageState = (state) => {
		setMeta("page", state);
		setPageState(state);
		if (state === "today") {
			setCurrentCollection("todayCollection");
		}
	};

	const handleCurrentCollection = (collection) => {
		setMeta("collection", collection);
		setCurrentCollection(collection);
	};

	return (
		<div className="main">
			<Header
				pageState={pageState}
				handlePageState={handlePageState}
				endDay={endDay}
				day={day}
			/>
			<SideMenu
				pageState={pageState}
				currentCollection={currentCollection}
				handleCurrentCollection={handleCurrentCollection}
			/>
			<TaskList
				pageState={pageState}
				currentCollection={currentCollection}
				day={day}
			/>
		</div>
	);
};

export default App;
