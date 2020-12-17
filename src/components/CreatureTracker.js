import React from 'react';

import '../styles/Tracker.css';

export const CreatureTracker = ({ creature }) => {
	const { init, name, isPlayer, HP } = creature;

	return (
		<div className={`init-creature ${isPlayer ? 'player' : 'creature'}`}>
			<div className="init-number">{init}</div>
			<input
				type="text"
				name="Creature Name"
				className="pretty-input creature-name-input"
				value={name}
				onChange={(e) => {}}
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
						onChange={(e) => {}}
					/>
					/
					<input
						type="number"
						name="Creature HP"
						id="max-hp"
						className="pretty-input max-hp"
						value={HP}
						onChange={(e) => {}}
					/>
				</>
			)}
		</div>
	);
};
