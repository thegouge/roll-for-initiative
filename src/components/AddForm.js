import React, { useState } from 'react';

import { ToggleSwitch } from './ToggleSwitch';

import '../styles/Form.css';
import { useInitContext } from '../context';

export const AddForm = () => {
	const { addToOrder } = useInitContext();

	const [isPlayer, togglePlayer] = useState(false);
	const [creatureName, setCreatureName] = useState('');
	const [creatureInit, setCreatureInit] = useState(1);
	const [creatureHP, setCreatureHP] = useState(1);

	function addToInit(e) {
		e.preventDefault();

		addToOrder([
			{ name: creatureName, init: creatureInit, HP: creatureHP, isPlayer },
		]);

		setCreatureName('');
		setCreatureInit(1);
		setCreatureHP(1);
	}

	return (
		<div className="form-container" data-testid="addForm-container">
			<h2>
				Add To Initiative
				<ToggleSwitch
					name="Creature Type"
					checked={isPlayer}
					onChange={() => togglePlayer(!isPlayer)}
				/>
			</h2>
			<form
				className="add-form"
				onSubmit={addToInit}
				data-testid="addForm-form">
				<div className="form-input">
					<label htmlFor="new-name">Name of Creature:</label>
					<input
						className="input add-input"
						type="text"
						id="new-name"
						value={creatureName}
						onChange={(e) => setCreatureName(e.target.value)}
						onFocus={(e) => e.target.select()}
					/>
				</div>

				<div className="form-input number-input">
					<label htmlFor="init-roll">Initiative:</label>
					<input
						className="input add-input"
						type="number"
						id="init-roll"
						value={creatureInit}
						onChange={(e) => setCreatureInit(parseInt(e.target.value))}
						onFocus={(e) => e.target.select()}
					/>
				</div>

				{!isPlayer && (
					<div className="form-input number-input">
						<label htmlFor="health">HP:</label>
						<input
							className="input add-input"
							type="number"
							id="health"
							value={creatureHP}
							onChange={(e) => setCreatureHP(parseInt(e.target.value))}
							onFocus={(e) => e.target.select()}
						/>
					</div>
				)}

				<input className="add-input" type="submit" value="Submit" />
			</form>
		</div>
	);
};
