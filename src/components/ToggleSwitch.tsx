import React from 'react';
import '../styles/Toggle.css';

interface Props {
	name: string;
	checked: boolean;
	onChange: () => void;
}

export const ToggleSwitch = ({ name, checked, onChange }: Props) => {
	return (
		<div className="toggle-switch">
			<input
				type="checkbox"
				className="toggle-switch-checkbox"
				name={name}
				id={name}
				checked={checked}
				onChange={onChange}
				data-testid="addplayer-type"
			/>
			<label className="toggle-switch-label" htmlFor={name}>
				<span className="toggle-switch-inner" />
				<span className="toggle-switch-switch" />
			</label>
		</div>
	);
};
