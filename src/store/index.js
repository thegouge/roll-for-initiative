import { createStore } from 'vuex';
import { bestiaryModule } from './bestiary';
import { initiativeModule } from './initiative';

export const store = createStore({
	modules: { init: initiativeModule, bestiary: bestiaryModule },
});
