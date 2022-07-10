import { useState, useCallback } from "react";

const TimeClock = ({ time, timerState, handleTimeSet }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [secondsInput, setSecondsInput] = useState("");
	const [minutesInput, setMinutesInput] = useState("");

	const cbRef = useCallback((inputEl) => {
		if (inputEl) {
			inputEl.focus();
			inputEl.select();
		}
	}, []);

	const seconds = time % 60;
	const minutes = Math.floor(time / 60);

	function onClick() {
		if (!isEditing) {
			setMinutesInput(minutes);
			setSecondsInput(seconds);
		}
		setIsEditing((prevState) => !prevState);
	}

	const clockElement = !isEditing ? (
		<span onClick={onClick}>
			{minutes}:{seconds}
		</span>
	) : (
		<span>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onClick();
				}}
				className="timeClockForm"
				onBlur={(e) => {
					if (
						e.relatedTarget === null ||
						e.relatedTarget.nodeName !== "INPUT"
					) {
						handleTimeSet(Number(minutesInput) * 60 + Number(secondsInput));

						setIsEditing((prevSTate) => !prevSTate);
					}
				}}
			>
				<input
					onChange={(e) => {
						setMinutesInput(e.target.value);
					}}
					ref={cbRef}
					type="text"
					value={minutesInput}
				/>
				:
				<input
					onChange={(e) => {
						setSecondsInput(e.target.value);
					}}
					type="text"
					value={secondsInput}
				/>
			</form>
		</span>
	);
	return <> {clockElement}</>;
};

export default TimeClock;
