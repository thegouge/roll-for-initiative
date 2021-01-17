import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { InitList } from '../components/InitList';
import { AddForm } from '../components/AddForm';
import { InitProvider } from '../context';

afterEach(cleanup);

const testInit = [
	{ name: 'test NPC', init: '15', HP: '1', isPlayer: false, id: 1 },
	{ name: 'test PC', init: '20', HP: '17', isPlayer: true, id: 2 },
];
const customRender = (ui, options) =>
	render(<InitProvider defaultInit={testInit}>{ui}</InitProvider>, {
		...options,
	});

describe('Initiative list', () => {
	it('renders without crashing', () => {
		const { getByText } = customRender(<InitList />);
		expect(getByText(/Initiative List/i)).toBeInTheDocument();
	});

	it("hides the turn marker if there's no initiative", () => {
		const { getByTestId } = render(
			<InitProvider>
				<InitList />
			</InitProvider>
		);

		expect(getByTestId('turn-marker').classList.contains('hidden')).toBe(true);
	});

	it('shows the turn marker when there is an initiative', () => {
		const { getByTestId } = customRender(<InitList />);

		expect(getByTestId('turn-marker').classList.contains('hidden')).toBe(false);
	});

	it('updates turn marker when new creatures are added', () => {
		const { getByTestId, getByLabelText } = render(
			<InitProvider
				defaultInit={[
					{ name: 'test NPC', init: '15', HP: '1', isPlayer: false, id: 0 },
				]}>
				<AddForm />
				<InitList />
			</InitProvider>
		);
		const turnMarker = getByTestId('turn-marker');

		expect(turnMarker.style._values).toEqual({});

		fireEvent.change(getByLabelText('Initiative:'), { target: { value: 20 } });
		fireEvent.submit(getByTestId('addForm-form'));

		expect(turnMarker.style._values).toEqual({
			transform: 'translateY(99.5px)',
		});

		fireEvent.submit(getByTestId('addForm-form'));

		expect(turnMarker.style._values).toEqual({
			transform: 'translateY(99.5px)',
		});
	});
});
