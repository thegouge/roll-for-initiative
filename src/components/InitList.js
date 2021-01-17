import React from 'react';

import { CreatureTracker } from './CreatureTracker';
import { useInitContext } from '../context';

import '../styles/List.css';

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
			{initiative.map((creature) => (
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
