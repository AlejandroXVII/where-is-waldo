import waldoPic from "../assets/whereswaldo.jpg";
import "../styles/find-waldo.css";
import { useRef } from "react";

const FindWaldo = () => {
	const picRef = useRef(null);
	const menuRef = useRef(null);
	//CAPTURE COORDINATE NO MATTER THE SIZE OF THE PICTURE
	function capturePosition(e) {
		let x = Math.round(
			(100 * (e.pageX - e.currentTarget.offsetLeft)) /
				picRef.current.offsetWidth
		);
		let y = Math.round(
			(100 * (e.pageY - e.currentTarget.offsetTop)) /
				picRef.current.offsetHeight
		);
		console.log("x:" + x + " y:" + y);
		console.log(menuRef.current.offsetWidth / 2);
		//CALCULATE THE POSITION OF THE CURSOR AND THE WITH OF THE ELEMENT TO PUT  THE ELEMENT IN THE CENTER

		menuRef.current.style.display = "flex";
		menuRef.current.style.left =
			e.pageX - menuRef.current.offsetWidth / 2 + "px";
		menuRef.current.style.top = e.pageY - 25 + "px";
	}
	function handleMouseLeaveEvent() {
		menuRef.current.style.display = "none";
	}
	return (
		<div>
			<div className="header">
				<h1>Find waldo</h1>
				<p>It could be anywhere!</p>
			</div>

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
						<button>Waldo</button>
						<button>Wizard</button>
						<button>Wilma</button>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default FindWaldo;
