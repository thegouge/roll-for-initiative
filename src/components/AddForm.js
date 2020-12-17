import React, { useState } from 'react';

import { ToggleSwitch } from './ToggleSwitch';

import '../styles/Form.css';

export const AddForm = ({ add }) => {
	const [isPlayer, togglePlayer] = useState(false);
	const [creatureName, setCreatureName] = useState('');
	const [creatureInit, setCreatureInit] = useState(1);
	const [creatureHP, setCreatureHP] = useState(1);

	function addToInit(e) {
		e.preventDefault();

		add({ name: creatureName, init: creatureInit, HP: creatureHP, isPlayer });

		setCreatureName('');
		setCreatureInit(1);
		setCreatureHP(1);
	}

	return (
		<div className="form-container">
			<h2>Add To Initiative</h2>
			<form className="add-form" onSubmit={addToInit}>
				<div className="form-input">
					<ToggleSwitch
						name="Creature Type"
						checked={isPlayer}
						onChange={() => togglePlayer(!isPlayer)}
					/>
				</div>

				<div className="form-input">
					<label htmlFor="">Name of Creature</label>
					<input
						type="text"
						value={creatureName}
						onChange={(e) => setCreatureName(e.target.value)}
						onFocus={(e) => e.target.select()}
					/>
				</div>

				<div className="form-input">
					<label htmlFor="">Initiative Roll</label>
					<input
						type="number"
						value={creatureInit}
						onChange={(e) => setCreatureInit(parseInt(e.target.value))}
						onFocus={(e) => e.target.select()}
					/>
				</div>

				{!isPlayer && (
					<div className="form-input">
						<label htmlFor="">HP</label>
						<input
							type="number"
							value={creatureHP}
							onChange={(e) => setCreatureHP(parseInt(e.target.value))}
							onFocus={(e) => e.target.select()}
						/>
					</div>
				)}

				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};
