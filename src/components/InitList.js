import React from 'react';

import { CreatureTracker } from './CreatureTracker';
import { useInitContext } from '../context';

export const InitList = () => {
	const { initiative } = useInitContext();

	function advanceTurn() {}
	return (
		<div className="list-container">
			<h2>
				Initiative List <button onClick={advanceTurn}>Finish Turn</button>
			</h2>
			{initiative.map((creature) => (
				<CreatureTracker
					key={`${creature.init}-${creature.name}`}
					creature={creature}
				/>
			))}
		</div>
	);
};
