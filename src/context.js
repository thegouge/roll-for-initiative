import React, { useState, useEffect, useRef, useContext } from 'react';

import { initiativeSort } from './lib/utility';

export const InitContext = React.createContext();

export const InitConsumer = InitContext.Consumer;

let currId = 0;

export const InitProvider = ({
	children,
	defaultInit = [],
	defaultTurnMarker = {
		index: 0,
		id: 0,
	},
}) => {
	const [initiative, setInitiative] = useState(defaultInit);
	const [turnMarkerData, setTurnMarkerData] = useState(defaultTurnMarker);
	const turnMarkerRef = useRef(null);

	function calculateTrackerPosition(index) {
		if (initiative.length === 0) {
			setTurnMarkerData({ index: 0, id: 0 });
			return;
		}
		setTurnMarkerData({ index: index, id: initiative[index].id });
		return (turnMarkerRef.current.style.transform = `translateY(${
			49.5 + 50 * index
		}px)`);
	}

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
		setTurnMarkerData({ index: 0, id: 0 });
		calculateTrackerPosition(0);
	}

	useEffect(() => {
		const newIndex = initiative.findIndex(
			(creature) => creature.id === turnMarkerData.id
		);
		if (newIndex === turnMarkerData.index || newIndex < 0) return;
		calculateTrackerPosition(newIndex);
	}, [initiative, turnMarkerData]);

	return (
		<InitContext.Provider
			value={{
				initiative,
				turnMarkerData,
				turnMarkerRef,
				addToOrder,
				resetInit,
				removeFromOrder,
				changeName,
				changeHP,
				calculateTrackerPosition,
			}}>
			{children}
		</InitContext.Provider>
	);
};

export function useInitContext() {
	return useContext(InitContext);
}
