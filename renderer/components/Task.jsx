import { useState, useEffect, useCallback } from "react";
import { updateTask, deleteTask, addToToday } from "../renderer";

import "../styles/task.css";

const Task = ({ id, text, notes, collection, triggerHandler }) => {
	const [isContext, setIsContext] = useState(false);
	const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
	const [isShown, setIsShown] = useState(false);
	const [isChanges, setIsChanges] = useState(false);
	const [taskText, setTaskText] = useState("");
	const [textNotes, setTextNotes] = useState(notes);
	const cbRef = useCallback((inputEl) => {
		if (inputEl) {
			inputEl.focus();
		}
	}, []);

	function addToTodayClick() {
		addToToday(collection, id);
	}

	function handleContextMenu(e) {
		if (e.target.className !== "taskContext") {
			setIsContext(false);
			document.removeEventListener("click", handleContextMenu);
		}
	}

	useEffect(() => {
		if (isContext) document.addEventListener("click", handleContextMenu);
		return () => {
			document.removeEventListener("click", handleContextMenu);
		};
	}, [isContext]);

	useEffect(() => {
		setTaskText(text);
		setTextNotes(notes);
	}, []);
	const textElement = isChanges ? (
		<input
			onBlur={(e) => {
				setIsChanges((prevState) => !prevState);
			}}
			ref={cbRef}
			value={taskText}
			onChange={(e) => {
				setTaskText(e.target.value);
			}}
			onKeyUp={(e) => {
				if (e.code === "Enter") {
					updateTask(collection, { id, text: taskText }).then(() => {
						setIsChanges((prevState) => !prevState);

						triggerHandler();
					});
				}
			}}
		/>
	) : (
		<span
			onClick={() => {
				setIsChanges((prevState) => !prevState);
			}}
		>
			{text}
		</span>
	);

	const noteElement = isShown && (
		<div className="taskNote">
			<textarea
				cols="40"
				rows="6"
				value={textNotes}
				onChange={(e) => {
					setTextNotes(e.target.value);
				}}
			/>
			<button
				type="submit"
				onClick={() => {
					updateTask(collection, { id, notes: textNotes }).then(() => {
						triggerHandler();
					});
				}}
			>
				save
			</button>
		</div>
	);
	const contextMenuElement = isContext && (
		<div
			className="taskContext"
			style={{ top: anchorPoint.y, left: anchorPoint.x }}
		>
			<button type="submit" onClick={addToTodayClick}>
				add to today
			</button>
		</div>
	);

	return (
		<li key={id.toString()}>
			<div
				className="task"
				onContextMenu={(e) => {
					setIsContext(true);
					setAnchorPoint({ x: e.pageX, y: e.pageY });
				}}
			>
				{textElement}
				<button
					className="taskButton"
					type="button"
					onClick={() => {
						setIsShown((prevState) => !prevState);
					}}
				>
					show note
				</button>
				<button
					className="taskButton"
					type="button"
					onClick={() => {
						deleteTask(collection, id).then(() => {
							triggerHandler();
						});
					}}
				>
					delete
				</button>
				{noteElement}
			</div>
			{contextMenuElement}
		</li>
	);
};

export default Task;
