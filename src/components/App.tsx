import React from 'react';
import { InitProvider } from '../context/initContext';
import '../styles/App.css';
import { AddForm } from './AddForm';
import { InitList } from './InitList';
import { Toolbar } from './Toolbar';

function App() {
	return (
		<div className="App">
			<InitProvider
				defaultInit={[
					{ name: 'test NPC', init: 15, HP: 1, isPlayer: false, id: 1 },
					{ name: 'test PC', init: 20, HP: 17, isPlayer: true, id: 2 },
				]}>
				<Toolbar />
				<div className="initiave-tracker">
					<AddForm />
					<InitList />
				</div>
			</InitProvider>
		</div>
	);
}

export default App;
