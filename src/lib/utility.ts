import { Creature } from "./types";

export function initiativeSort(a: Creature, b: Creature) {
	const diff = b.init - a.init;
	if (diff === 0) {
		if (a.isPlayer) {
			return -1;
		}
		if (b.isPlayer) {
			return 1;
		}
		return 0;
	}
	return b.init - a.init;
}

export function rollDice(d: number) {
	return 1 + Math.floor(Math.random() * d);
}

export function rollInit(mod: number) {
	return mod + rollDice(20);
}
