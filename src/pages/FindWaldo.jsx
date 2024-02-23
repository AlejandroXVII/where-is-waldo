import waldoPic from "../assets/whereswaldo.jpg";
import waldoSRC from "../assets/wally-standing.png";
import wizardSRC from "../assets/wizard.gif";
import odlawSRC from "../assets/odlaw.gif";
import "../styles/find-waldo.css";
import { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";

const FindWaldo = () => {
	const picRef = useRef(null);
	const menuRef = useRef(null);
	const [foundWaldo, setFoundWaldo] = useState(false);
	const [foundWizard, setFoundWizard] = useState(false);
	const [foundOdlaw, setFoundOdlaw] = useState(false);
	const [open, setOpen] = useState(false);
	let x;
	let y;
	function sendRequest(character) {
		console.log({ character, x, y });
		menuRef.current.style.display = "none";
	}
	useEffect(() => {
		if (foundWaldo & foundWizard & foundOdlaw) {
			setOpen(true);
		}
	}, [foundWaldo, foundWizard, foundOdlaw]);
	//CAPTURE COORDINATE NO MATTER THE SIZE OF THE PICTURE
	function capturePosition(e) {
		x = Math.round(
			(100 * (e.pageX - e.currentTarget.offsetLeft)) /
				picRef.current.offsetWidth
		);
		y = Math.round(
			(100 * (e.pageY - e.currentTarget.offsetTop)) /
				picRef.current.offsetHeight
		);
		menuRef.current.style.display = "flex";
		menuRef.current.style.left =
			e.pageX - menuRef.current.offsetWidth / 2 + "px";
		menuRef.current.style.top = e.pageY - 25 + "px";
		console.log({ x: x, y: y });
	}
	function handleMouseLeaveEvent() {
		menuRef.current.style.display = "none";
	}
	return (
		<div className="game-container">
			<div className="header tittle">
				<h1>WHERE IS WALDO?</h1>
				<p>Try to find waldo, wizard and odlaw as soon as possible</p>
			</div>
			<Characters
				foundWaldo={foundWaldo}
				foundWizard={foundWizard}
				foundOdlaw={foundOdlaw}
				setOpen={setOpen}
			/>
			<div className="pic-container">
				<img
					src={waldoPic}
					alt="illustration of many people in a beach"
					onClick={(e) => {
						capturePosition(e);
					}}
					ref={picRef}
				/>
				<div
					className="menu"
					ref={menuRef}
					onMouseLeave={handleMouseLeaveEvent}
				>
					<div className="target"></div>
					<nav>
						<button onClick={() => sendRequest("waldo")}>
							Waldo
						</button>
						<button onClick={() => sendRequest("wizard")}>
							Wizard
						</button>
						<button onClick={() => sendRequest("odlaw")}>
							Odlaw
						</button>
					</nav>
				</div>
			</div>
			<Popup open={open} modal nested>
				<div className="popup">
					<h1>You win!</h1>
					<p>Please insert a nickname</p>
					<form action="POST">
						<label hidden htmlFor="nickname">
							nickname
						</label>
						<input type="text" name="nickname" />
						<button>Send</button>
					</form>
				</div>
			</Popup>
		</div>
	);
};

function Characters(prob) {
	return (
		<div className="characters-container">
			<img
				src={waldoSRC}
				alt=""
				style={{ opacity: prob.foundWaldo ? "0.5" : "1" }}
			/>
			<h2 style={{ color: prob.foundWaldo ? "#39e47a" : null }}>
				Waldo{prob.foundWaldo ? "✓" : null}
			</h2>
			<img
				src={wizardSRC}
				alt=""
				style={{ opacity: prob.foundWizard ? "0.5" : "1" }}
			/>
			<h2 style={{ color: prob.foundWizard ? "#39e47a" : null }}>
				Wizard{prob.foundWizard ? "✓" : null}
			</h2>
			<img
				src={odlawSRC}
				alt=""
				style={{ opacity: prob.foundOdlaw ? "0.5" : "1" }}
			/>
			<h2 style={{ color: prob.foundOdlaw ? "#39e47a" : null }}>
				Odlaw{prob.foundOdlaw ? "✓" : null}
			</h2>
		</div>
	);
}

export default FindWaldo;
