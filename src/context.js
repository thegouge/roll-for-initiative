import React, { useState, useContext } from 'react';

import { initiativeSort } from './lib/utility';

const InitContext = React.createContext();

let currId = 0;

export const InitProvider = ({ children }) => {
	const [initiative, setInitiative] = useState([]);

	function addToOrder(creaturesToAdd) {
		setInitiative(
			[
				...initiative,
				...creaturesToAdd.map((creature) => ({ ...creature, id: ++currId })),
			].sort(initiativeSort)
		);
	}

	function removeFromOrder(id) {
		setInitiative(initiative.filter((creature) => creature.id !== id));
	}

	function changeName(id, newName) {
		setInitiative(
			initiative.map((item) => {
				if (item.id === id) {
					return { ...item, name: newName };
				}
				return item;
			})
		);
	}

	function changeHP(id, newHP) {
		setInitiative(
			initiative.map((item) => {
				if (item.id === id) {
					return { ...item, HP: newHP };
				}
				return item;
			})
		);
	}

	function resetInit() {
		setInitiative([]);
	}

	return (
		<InitContext.Provider
			value={{
				initiative,
				addToOrder,
				resetInit,
				removeFromOrder,
				changeName,
				changeHP,
			}}>
			{children}
		</InitContext.Provider>
	);
};

export function useInitContext() {
	return useContext(InitContext);
}
