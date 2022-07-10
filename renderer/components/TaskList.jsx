import { useState, useEffect } from "react";

import { getCollection, addTask } from "../renderer";

import Task from "./Task";

import "../styles/tasklist.css";

const TaskList = ({ pageState, currentCollection, day }) => {
	const [tasks, setTasks] = useState([null]);
	const [text, setText] = useState("");
	const [trigger, setTrigger] = useState(0);

	const updateTasks = () => {
		if (pageState === "today") {
			getCollection("tasks").then((data) => {
				let currentData;
				if (currentCollection === "todayCollection") {
					currentData = data.filter((el) => el.day === day);
				} else if (currentCollection === "oldCollection") {
					currentData = data.filter((el) => el.day < day);
				} else {
					currentData = data.filter((el) => el.day > day);
				}
				setTasks(currentData);
			});
		} else {
			getCollection(currentCollection).then((data) => {
				setTasks(data);
			});
		}
	};

	useEffect(() => {
		updateTasks();
	}, [currentCollection, trigger]);

	const triggerHandler = () => {
		setTrigger((prevState) => prevState + 1);
	};

	function onSubmit() {
		console.log("add-task");
		triggerHandler();
		addTask(currentCollection, text).then(() => {});
		setText("");
	}

	const listElement =
		tasks &&
		tasks.map(
			(el) =>
				el && (
					<Task
						id={el.taskid}
						key={el.taskid}
						text={el.text}
						notes={el.notes}
						collection={currentCollection}
						triggerHandler={triggerHandler}
					/>
				)
		);

	return (
		<div className="taskList">
			<ul key="add-button">
				{listElement}
				<li>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							onSubmit();
						}}
					>
						<input
							type="text"
							value={text}
							onChange={(e) => {
								setText(e.target.value);
							}}
						/>
						<button onClick={onSubmit} type="submit">
							add
						</button>
					</form>
				</li>
			</ul>
		</div>
	);
};

export default TaskList;
