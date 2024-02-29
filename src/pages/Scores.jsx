import "../styles/index.css";
import { useEffect, useState } from "react";

const Score = () => {
	const [scores, setScores] = useState([]);
	async function fetchScores() {
		// Default options are marked with *
		const response = await fetch("http://localhost:3000/users/", {
			method: "GET",
		});
		const scoresArray = await response.json();

		console.log(scoresArray);
		setScores(scoresArray);
	}
	useEffect(() => {
		fetchScores();
	}, []);
	return (
		<div className="scores">
			<div>
				<div className="tittle">
					<p>SCORES</p>
				</div>

				<div>
					{scores.map((score) => (
						<li key={score._id}>
							{score.name !== "" ? (
								<span>{score.name}</span>
							) : null}
							{score.duration_in_seconds !== "" ? (
								<span>{score.duration_in_seconds}s</span>
							) : null}
						</li>
					))}
				</div>
			</div>
		</div>
	);
};

export default Score;
