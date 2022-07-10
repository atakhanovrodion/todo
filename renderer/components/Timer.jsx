import { useEffect, useState, useRef } from "react";
import Sound from "react-sound";

import { setMeta, getMeta } from "../renderer";

import TimeClock from "./TimeClock";

import "../styles/timer.css";

const Timer = () => {
	let timerId;
	const [time, setTime] = useState(5);
	const [timerState, setTimerState] = useState("inactive");
	const timeRef = useRef(time);
	timeRef.current = time;

	useEffect(() => {
		getMeta().then((value) => setTime(value[0].timer));
	}, []);

	function startTimer() {
		setTimerState("active");

		timerId = setInterval(() => {
			setTime((prevState) => prevState - 1);

			if (timeRef.current <= 0) {
				clearInterval(timerId);
				setTimerState("waitOnAction");
			}
		}, 1000);
	}
	function stopTimer() {
		console.log(timerId);
		clearInterval(timerId);
		setTime(5);
		setTimerState("inactive");
	}
	const soundElement = timerState === "waitOnAction" && (
		<Sound url="alarm.mp3" playStatus={Sound.status.PLAYING} loop />
	);

	function handleTimeSet(value) {
		setTime(value);
		setMeta("timer", value);
	}

	return (
		<div className="timer">
			<TimeClock
				time={time}
				timerState={timerState}
				handleTimeSet={handleTimeSet}
			/>
			<button
				onClick={() => {
					startTimer();
				}}
				type="button"
			>
				start
			</button>
			<button
				onClick={() => {
					stopTimer();
				}}
				type="button"
			>
				stop
			</button>
			{soundElement}
		</div>
	);
};

export default Timer;
