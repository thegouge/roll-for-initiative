import React from 'react';
import { useInitContext } from '../context';

import '../styles/Tracker.css';

export const CreatureTracker = ({
	creature,
	changeHP,
	changeName,
	removeFromOrder,
}) => {
	const { init, name, isPlayer, HP, id } = creature;

	function handleHPChange(e) {
		const newHP = parseInt(e.target.value);

		if (newHP <= 0) {
			return removeFromOrder(id);
		}

		changeHP(id, newHP);
	}

	return (
		<div
			className={`init-creature ${isPlayer ? 'player' : 'creature'}`}
			data-testid={`creature-${isPlayer ? 'pc' : 'npc'}`}>
			<div className="init-number" data-testid="creature-init">
				{init}
			</div>
			<input
				type="text"
				name="Creature Name"
				className="pretty-input creature-name-input"
				value={name}
				onChange={(e) => changeName(id, e.target.value)}
				data-testid="creature-name"
			/>
			{!isPlayer && (
				<>
					<label htmlFor={`Creature-HP-${id}`} style={{ fontWeight: 'normal' }}>
						HP
					</label>
					<input
						type="number"
						name="Creature-HP"
						id={`Creature-HP-${id}`}
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
