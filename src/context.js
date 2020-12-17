import React, { useState, useContext } from 'react';

import { initiativeSort } from './lib/utility';

const InitContext = React.createContext();

export const InitProvider = ({ children }) => {
	const [initiative, setInitiative] = useState([]);

	function addToOrder(creaturesToAdd) {
		setInitiative([...initiative, ...creaturesToAdd].sort(initiativeSort));
	}

	function resetInit() {
		setInitiative([]);
	}

	return (
		<InitContext.Provider value={{ initiative, addToOrder, resetInit }}>
			{children}
		</InitContext.Provider>
	);
};

export function useInitContext() {
	return useContext(InitContext);
}
