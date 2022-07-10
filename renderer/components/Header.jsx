import { useState } from "react";

import Timer from "./Timer";

import "../styles/header.css";

const Header = ({ pageState, handlePageState, endDay, day }) => {
	const menuButtons = ["global", "training", "checker"].map((el) => (
		<button
			className={
				pageState === el ? "headerMenuButtonActive" : "headerMenuButton"
			}
			type="button"
			onClick={() => {
				handlePageState(el);
			}}
		>
			{el}
		</button>
	));

	return (
		<header className="header">
			{menuButtons}

			<span className="headerDayCount">
				{`Today is ${day} day`}
				<button
					type="button"
					onClick={() => {
						endDay();
					}}
				>
					End Day
				</button>
			</span>

			<Timer />

			<button
				className="syncButton"
				type="button"
				onClick={() => {
					handlePageState("sync");
				}}
			>
				Sync
			</button>
		</header>
	);
};

export default Header;
