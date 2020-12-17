import React from 'react';
import { useInitContext } from '../context';

import '../styles/Tracker.css';

export const CreatureTracker = ({ creature }) => {
	const { init, name, isPlayer, HP, id } = creature;
	const { changeHP, changeName, removeFromOrder } = useInitContext();

	function handleHPChange(e) {
		const newHP = parseInt(e.target.value);

		if (newHP <= 0) {
			return removeFromOrder(id);
		}

		changeHP(id, newHP);
	}

	return (
		<div className={`init-creature ${isPlayer ? 'player' : 'creature'}`}>
			<div className="init-number">{init}</div>
			<input
				type="text"
				name="Creature Name"
				className="pretty-input creature-name-input"
				value={name}
				onChange={(e) => changeName(id, e.target.value)}
			/>
			{!isPlayer && (
				<>
					<label htmlFor="Creature HP" style={{ fontWeight: 'normal' }}>
						HP
					</label>
					<input
						type="number"
						name="Creature HP"
						min="0"
						className="pretty-input creature-hp"
						value={HP}
						onChange={handleHPChange}
					/>
				</>
			)}
		</div>
	);
};
