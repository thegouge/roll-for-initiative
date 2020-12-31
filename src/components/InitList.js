import React, { useEffect, useRef, useState } from 'react';

import { CreatureTracker } from './CreatureTracker';
import { useInitContext } from '../context';

import '../styles/List.css';

export const InitList = () => {
	const { initiative, turnMarkerRef } = useInitContext();

	return (
		<div className="list-container">
			<h2>Initiative List</h2>
			<div
				className={`turn-marker ${initiative.length > 0 ? '' : 'hidden'}`}
				ref={turnMarkerRef}>
				this is intentional, pls laugh
			</div>
			{initiative.map((creature) => (
				<CreatureTracker key={`${creature.id}`} creature={creature} />
			))}
		</div>
	);
};
