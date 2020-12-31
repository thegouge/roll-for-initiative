import React from 'react';

import { Toolbar } from './Toolbar';
import { AddForm } from './AddForm';
import { InitList } from './InitList';

import '../styles/App.css';
import { InitProvider } from '../context';

function App() {
	return (
		<div className="App">
			<InitProvider>
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
