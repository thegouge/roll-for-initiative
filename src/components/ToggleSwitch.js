import React from 'react';

import '../styles/Toggle.css';

export const ToggleSwitch = ({ name, checked, onChange }) => {
	return (
		<div className="toggle-switch">
			<input
				type="checkbox"
				className="toggle-switch-checkbox"
				name={name}
				id={name}
				checked={checked}
				onChange={onChange}
			/>
			<label className="toggle-switch-label" htmlFor={name}>
				<span className="toggle-switch-inner" />
				<span className="toggle-switch-switch" />
			</label>
		</div>
	);
};
