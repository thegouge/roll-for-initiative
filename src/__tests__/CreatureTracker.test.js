import { cleanup, render, fireEvent } from '@testing-library/react';

import { CreatureTracker } from '../components/CreatureTracker';

afterEach(cleanup);

const testCreature = {
	name: 'test creature',
	init: 1,
	HP: 1,
	isPlayer: false,
	id: 0,
};

describe('Creature Tracker', () => {
	it('should render without crashing', () => {
		const { getByTestId } = render(<CreatureTracker creature={testCreature} />);

		expect(getByTestId('creature-npc')).toBeInTheDocument();
	});

	it('should be able to change values', () => {
		const nameMock = jest.fn();
		const HPMock = jest.fn();
		const { getByTestId, getByLabelText } = render(
			<CreatureTracker
				creature={testCreature}
				changeName={nameMock}
				changeHP={HPMock}
			/>
		);

		fireEvent.change(getByTestId('creature-name'), {
			target: { value: 'Herp' },
		});

		expect(nameMock).toHaveBeenCalledTimes(1);

		fireEvent.change(getByLabelText('HP'), { target: { value: '10' } });

		expect(HPMock).toHaveBeenCalledTimes(1);
	});

	it('should remove itself when hp drops to 0', () => {
		const removeMock = jest.fn();
		const HPMock = jest.fn();

		const { getByLabelText } = render(
			<CreatureTracker
				creature={testCreature}
				removeFromOrder={removeMock}
				changeHP={HPMock}
			/>
		);

		fireEvent.change(getByLabelText('HP'), { target: { value: '0' } });

		expect(removeMock).toHaveBeenCalledTimes(1);
		expect(HPMock).toHaveBeenCalledTimes(0);
	});
});
