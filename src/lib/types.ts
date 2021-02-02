import { MutableRefObject } from "react";

export type Creature = {
  id: number,
  name: string, init: number, HP: number, isPlayer: boolean
}

export type ContextType = {
	initiative: Creature[];
	turnMarkerData: { index: number; id: number };
	turnMarkerRef: MutableRefObject<any>;
	addToOrder: (addList: Creature[]) => void;
	resetInit: () => void;
	removeFromOrder: (id: number) => void;
	changeName: (id: number, newName: string) => void;
	changeHP: (id: number, newHP: number) => void;
	calculateTrackerPosition: (index: number) => void;
};