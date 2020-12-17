import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { rollInit } from '../lib/utility';

import '../styles/Toolbar.css';

export const Toolbar = ({ reset, add }) => {
	const [isPrerolling, togglePrerolling] = useState(false);
	const [numPrerolledMonsters, setNumPrerolledMonsters] = useState(1);
	const [preRollInitMod, setPreRollInitMod] = useState(0);
	const [preRollHP, setPreRollHP] = useState(1);

	const prerollInputRef = useRef(null);

	useEffect(() => {
		if (isPrerolling) {
			prerollInputRef.current.focus();
		}
	}, [isPrerolling]);

	function handlePrerollClick() {
		togglePrerolling(!isPrerolling);
	}

	function prerollMonsters(e) {
		e.preventDefault();
		const listToAdd = [];
		for (let i = 0; i < numPrerolledMonsters; i++) {
			listToAdd.push({
				name: `monster ${i + 1}`,
				init: rollInit(preRollInitMod),
				HP: preRollHP,
				isPlayer: false,
			});
		}
		add(listToAdd);
		setNumPrerolledMonsters(1);
		setPreRollInitMod(0);
		togglePrerolling(false);
	}

	return (
		<header className="init-header">
			<h1>Roll For Initiative!</h1>
			<nav className="toolbar">
				<div className="toolbar-btn-container">
					<button className="reset-btn" onClick={reset}>
						Reset Initiative
					</button>
				</div>

				<div className="toolbar-btn-container">
					<button className="preroll-btn" onClick={handlePrerollClick}>
						Batch-add Monsters
					</button>
				</div>
				<form
					className={`preroll-form ${isPrerolling ? '' : 'hidden'}`}
					onSubmit={prerollMonsters}>
					<button
						className="close-preroll"
						onClick={() => togglePrerolling(false)}>
						<FaTimes />
					</button>
					<label htmlFor="numMonsters">How Many Monsters?</label>
					<input
						type="number"
						name="numMonsters"
						id="numMonsters"
						ref={prerollInputRef}
						value={numPrerolledMonsters}
						onChange={(e) => setNumPrerolledMonsters(parseInt(e.target.value))}
						onFocus={(e) => e.target.select()}
					/>
					<label htmlFor="initMod">Initiative Modifier</label>
					<input
						type="number"
						name="initMod"
						id="initMod"
						value={preRollInitMod}
						min="-5"
						max="10"
						onChange={(e) => setPreRollInitMod(parseInt(e.target.value))}
						onFocus={(e) => e.target.select()}
					/>
					<label htmlFor="preRollHP">Max HP</label>
					<input
						type="number"
						name="preRollHP"
						id="preRollHP"
						value={preRollHP}
						onChange={(e) => setPreRollHP(parseInt(e.target.value))}
						onFocus={(e) => e.target.select()}
					/>
					<input type="submit" value="Roll those monsters!" />
				</form>
			</nav>
		</header>
	);
};
