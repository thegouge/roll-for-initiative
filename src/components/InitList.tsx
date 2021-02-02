import React from 'react';
import { useInitContext } from '../context/initContext';
import { Creature } from '../lib/types';
import '../styles/List.css';
import { CreatureTracker } from './CreatureTracker';

export const InitList = () => {
	const {
		initiative,
		turnMarkerRef,
		changeHP,
		changeName,
		removeFromOrder,
	} = useInitContext();

	return (
		<div className="list-container" data-testid="initList-container">
			<h2>Initiative List</h2>
			<div
				className={`turn-marker ${initiative.length > 0 ? '' : 'hidden'}`}
				ref={turnMarkerRef}
				data-testid="turn-marker"></div>
			{initiative.map((creature: Creature) => (
				<CreatureTracker
					key={`${creature.isPlayer ? 'player' : 'monster'}-${creature.id}`}
					creature={creature}
					changeHP={changeHP}
					changeName={changeName}
					removeFromOrder={removeFromOrder}
				/>
			))}
		</div>
	);
};
