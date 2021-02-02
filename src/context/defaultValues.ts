import React from "react";
import { ContextType, Creature } from "../lib/types";

export const initDefault: ContextType = {
  initiative: [],
	turnMarkerData: { index: 0, id: 0 },
	turnMarkerRef: React.createRef(),
	addToOrder: (addList: Creature[]) => null,
	resetInit: () => null,
	removeFromOrder: (id: number) => null,
	changeName: (id: number, newName: string) => null,
	changeHP: (id: number, newHP: number) => null,
	calculateTrackerPosition: (index: number) => null,
}