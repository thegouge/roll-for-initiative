import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useInitContext } from '../context';
import { rollInit } from '../lib/utility';

import '../styles/Toolbar.css';

export const Toolbar = () => {
	const {
		addToOrder,
		resetInit,
		initiative,
		turnMarkerData,
		calculateTrackerPosition,
	} = useInitContext();

	const [isPrerolling, togglePrerolling] = useState(false);
	const [numPrerolledMonsters, setNumPrerolledMonsters] = useState(1);
	const [preRollInitMod, setPreRollInitMod] = useState(0);
	const [preRollHP, setPreRollHP] = useState(1);
	const [preRollName, setPreRollName] = useState('');

	const prerollInputRef = useRef(null);

	function advanceTurn() {
		if (initiative.length === 0) {
			return;
		}
		const { index } = turnMarkerData;
		let newIndex = index + 1;

		if (newIndex >= initiative.length) {
			newIndex = 0;
		}

		calculateTrackerPosition(newIndex);
	}

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
				name: `${preRollName === '' ? 'Monster' : preRollName} ${i + 1}`,
				init: rollInit(preRollInitMod),
				HP: preRollHP,
				isPlayer: false,
			});
		}
		addToOrder(listToAdd);
		setNumPrerolledMonsters(1);
		setPreRollInitMod(0);
		setPreRollName('');
		togglePrerolling(false);
	}

	return (
		<header className="init-header">
			<h1>Roll For Initiative!</h1>
			<nav className="toolbar">
				<div className="toolbar-btn-container">
					<button className="toolbar-btn reset-btn" onClick={resetInit}>
						Reset Initiative
					</button>
				</div>

				<div className="toolbar-btn-container">
					<button className="toolbar-btn advance-btn" onClick={advanceTurn}>
						Finish Turn
					</button>
				</div>

				<div className="toolbar-btn-container">
					<button
						className="toolbar-btn preroll-btn"
						onClick={handlePrerollClick}>
						Batch-add Monsters
					</button>
				</div>
				<div className={`modal ${isPrerolling ? '' : 'hidden'}`}>
					<form className="preroll-form" onSubmit={prerollMonsters}>
						<h3>Monster pre-roller</h3>
						<button
							className="close-preroll"
							onClick={() => togglePrerolling(false)}>
							<FaTimes />
						</button>

						<div className="input-container">
							<label htmlFor="numMonsters">How Many Monsters?</label>
							<input
								className="input preroll-input"
								type="number"
								name="numMonsters"
								id="numMonsters"
								ref={prerollInputRef}
								value={numPrerolledMonsters}
								onChange={(e) =>
									setNumPrerolledMonsters(parseInt(e.target.value))
								}
								onFocus={(e) => e.target.select()}
							/>
						</div>
						<div className="input-container">
							<label htmlFor="nameMonster">What you calling them?</label>
							<input
								className="input preroll-input preroll-name"
								type="text"
								name="monsterName"
								id="monsterName"
								value={preRollName}
								onChange={(e) => setPreRollName(e.target.value)}
								onFocus={(e) => e.target.select()}
							/>
						</div>
						<div className="input-container">
							<label htmlFor="initMod">Dex Modifier</label>
							<input
								className="input preroll-input"
								type="number"
								name="initMod"
								id="initMod"
								value={preRollInitMod}
								onChange={(e) => setPreRollInitMod(parseInt(e.target.value))}
								onFocus={(e) => e.target.select()}
							/>
						</div>
						<div className="input-container">
							<label htmlFor="preRollHP">Max HP</label>
							<input
								className="input preroll-input"
								type="number"
								name="preRollHP"
								id="preRollHP"
								value={preRollHP}
								onChange={(e) => setPreRollHP(parseInt(e.target.value))}
								onFocus={(e) => e.target.select()}
							/>
						</div>
						<input
							className="preroll-submit"
							type="submit"
							value="Roll monsters!"
						/>
					</form>
				</div>
			</nav>
		</header>
	);
};
