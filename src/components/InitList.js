import React, { useEffect, useRef, useState } from 'react';

import { CreatureTracker } from './CreatureTracker';
import { useInitContext } from '../context';

import '../styles/List.css';

export const InitList = () => {
	const { initiative } = useInitContext();

	const turnMarkerRef = useRef(null);

	const [turnMarkerData, setTurnMarkerData] = useState({
		index: 0,
		id: initiative[0],
	});

	useEffect(() => {
		const newIndex = initiative.findIndex(
			(creature) => creature.id === turnMarkerData.id
		);
		if (newIndex === turnMarkerData.index || newIndex <= 0) return;
		setTurnMarkerData({ ...turnMarkerData, index: newIndex });
		turnMarkerRef.current.style.transform = `translateY(${
			66 + 50 * newIndex
		}px)`;
	}, [initiative, turnMarkerData]);

	function advanceTurn() {
		const { index } = turnMarkerData;
		let newIndex = index + 1;

		if (newIndex >= initiative.length) {
			newIndex = 0;
		}
		setTurnMarkerData({ index: newIndex, id: initiative[newIndex].id });
		turnMarkerRef.current.style.transform = `translateY(${
			66 + 50 * newIndex
		}px)`;
	}

	return (
		<div className="list-container">
			<h2>
				Initiative List <button onClick={advanceTurn}>Finish Turn</button>
			</h2>
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
