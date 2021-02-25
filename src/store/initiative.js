import { initiativeSort } from '../lib/utility';
export const initiativeModule = {
	state() {
		return {
			initiative: [],
			turnMarker: { index: 0, id: 0 },
		};
	},
	getters: {
		turnMarkerPosition(state) {
			const { initiative, turnMarker } = state;
			if (initiative.length === 0) {
				return 49.5;
			}
			return 49.5 + 50 * turnMarker.index;
		},
	},
	mutations: {
		addToOrder(state, payload) {
			state.initiative = [...state.initiative, ...payload.creaturesToAdd].sort(
				initiativeSort
			);
		},
		removeFromOrder(state, id) {
			state.initiative = state.initiative.filter(
				(creature) => creature.id !== id
			);
		},
		changeAspect(state, payload) {
			state.initiative = state.initiative.map((creature) => {
				if (creature.id === payload.id) {
					return { ...creature, ...payload };
				}
				return creature;
			});
		},
		resetInit(state) {
			state.initiative = [];
			state.turnMarker = { index: 0, id: 0 };
		},
		setTurnMarkerData(state, index) {
			state.turnMarker = { index, id: state.initiative[index].id };
		},
	},
};
