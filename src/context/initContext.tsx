import React, {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { ContextType, Creature } from '../lib/types';
import { initiativeSort } from '../lib/utility';
import { initDefault } from './defaultValues';

export const InitContext = React.createContext<ContextType>(initDefault);

interface Props {
	children: ReactNode;
	defaultInit?: Creature[];
	defaultTurnMarker?: { index: number; id: number };
}

export function InitProvider({
	children,
	defaultInit = [],
	defaultTurnMarker = {
		index: 0,
		id: 0,
	},
}: Props) {
	const [initiative, setInitiative] = useState(defaultInit);
	const [turnMarkerData, setTurnMarkerData] = useState(defaultTurnMarker);
	const turnMarkerRef = useRef<HTMLDivElement>(null);

	const calculateTrackerPosition = useCallback(
		(index: number) => {
			if (initiative.length === 0) {
				setTurnMarkerData({ index: 0, id: 0 });
				return;
			}
			setTurnMarkerData({ index: index, id: initiative[index].id });
			if (null !== turnMarkerRef.current) {
				return (turnMarkerRef.current.style.transform = `translateY(${
					49.5 + 50 * index
				}px)`);
			}
		},
		[initiative]
	);

	function addToOrder(creaturesToAdd: Creature[]) {
		setInitiative(
			[
				...initiative,
				...creaturesToAdd.map((creature) => ({ ...creature })),
			].sort(initiativeSort)
		);
	}

	function removeFromOrder(id: number) {
		setInitiative(
			initiative.filter((creature: Creature) => creature.id !== id)
		);
	}

	function changeName(id: number, newName: string) {
		setInitiative(
			initiative.map((item: Creature) => {
				if (item.id === id) {
					return { ...item, name: newName };
				}
				return item;
			})
		);
	}

	function changeHP(id: number, newHP: number) {
		setInitiative(
			initiative.map((item: Creature) => {
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
			(creature: Creature) => creature.id === turnMarkerData.id
		);
		if (newIndex === turnMarkerData.index || newIndex < 0) return;
		calculateTrackerPosition(newIndex);
	}, [initiative, calculateTrackerPosition]);

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
}

export const useInitContext = () => {
	if (InitContext === undefined) {
		throw new Error(`you can't use this context outside of the provider!`);
	}
	return useContext(InitContext);
};
