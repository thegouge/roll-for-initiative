export function initiativeSort(a, b) {
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

export function rollDice(d) {
	return 1 + Math.floor(Math.random() * d);
}

export function rollInit(mod) {
	return mod + rollDice(20);
}
