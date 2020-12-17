import { useState } from 'react';

import { Toolbar } from './Toolbar';
import { CreatureTracker } from './CreatureTracker';
import { AddForm } from './AddForm';

import '../styles/App.css';
import { initiativeSort } from '../lib/utility';

function App() {
	const [initiative, setInitiative] = useState([]);

	function addMultipleToOrder(creaturesToAdd) {
		setInitiative([...initiative, ...creaturesToAdd].sort(initiativeSort));
	}

	function addAndSort(creatureToAdd) {
		setInitiative([...initiative, creatureToAdd].sort(initiativeSort));
	}

	function resetInit() {
		setInitiative([]);
	}

	return (
		<div className="App">
			<Toolbar add={addMultipleToOrder} reset={resetInit} />
			<AddForm add={addAndSort} />
			<div className="list-container">
				<h2>Initiative List</h2>
				{initiative.map((creature) => (
					<CreatureTracker
						key={`${creature.init}-${creature.name}`}
						creature={creature}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
