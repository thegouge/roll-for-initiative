import { screen, cleanup, render, fireEvent } from '@testing-library/react';

import { Toolbar } from '../components/Toolbar';
import { InitList } from '../components/InitList';
import { InitProvider } from '../context';

const initInitiative = [
	{ name: 'test NPC', init: '15', HP: '1', isPlayer: false, id: 1 },
	{ name: 'test PC', init: '20', HP: '17', isPlayer: true, id: 2 },
];

afterEach(cleanup);

describe('Toolbar', () => {
	it('renders without crashing', () => {
		const { getByTestId } = render(
			<InitProvider>
				<Toolbar />
			</InitProvider>
		);

		expect(getByTestId('toolbar-container')).toBeInTheDocument();
	});

	it('can reset the initiative', () => {
		const { getByText, queryByDisplayValue } = render(
			<InitProvider defaultInit={initInitiative}>
				<Toolbar />
				<InitList />
			</InitProvider>
		);
		const resetButton = getByText(/Reset/i);

		expect(queryByDisplayValue(/test NPC/i)).toBeInTheDocument();

		fireEvent.click(resetButton);

		expect(queryByDisplayValue(/test NPC/i)).toBeNull();
		expect(queryByDisplayValue(/test PC/i)).toBeNull();
	});

	it('properly moves the turn order forward', () => {
		const { getByText, queryByTestId } = render(
			<InitProvider defaultInit={initInitiative}>
				<Toolbar />
				<InitList />
			</InitProvider>
		);
		const turnMarker = queryByTestId('turn-marker');

		expect(turnMarker.style._values).toEqual({});

		fireEvent.click(getByText(/Turn/i));

		expect(turnMarker.style._values).toEqual({
			transform: 'translateY(99.5px)',
		});
	});

	it('properly moves turn marker back to start', () => {
		const { getByText, queryByTestId } = render(
			<InitProvider defaultInit={initInitiative}>
				<Toolbar />
				<InitList />
			</InitProvider>
		);
		const turnMarker = queryByTestId('turn-marker');

		fireEvent.click(getByText(/Turn/i));
		fireEvent.click(getByText(/Turn/i));

		expect(turnMarker.style._values).toEqual({
			transform: 'translateY(49.5px)',
		});
	});

	describe('batch adding', () => {
		it('should render batch-add form', () => {
			const { getByTestId, getByText } = render(
				<InitProvider>
					<Toolbar />
				</InitProvider>
			);
			const modal = getByTestId('toolbar-modal');

			expect(modal.classList.contains('hidden')).toBe(true);

			fireEvent.click(getByText(/Batch-add Monsters/i));

			expect(modal.classList.contains('hidden')).toBe(false);
		});

		it('should be able to close', () => {
			const { getByText } = render(
				<InitProvider>
					<Toolbar />
				</InitProvider>
			);
			fireEvent.click(getByText(/Batch-add Monsters/i));

			fireEvent.click(screen.getByTestId('toolbar-close'));
			expect(
				screen.getByTestId('toolbar-modal').classList.contains('hidden')
			).toBe(true);
		});

		it('should initialize values properly', () => {
			const { getByText, getByLabelText, getByDisplayValue } = render(
				<InitProvider>
					<Toolbar />
					<InitList />
				</InitProvider>
			);
			fireEvent.click(getByText(/Batch-add Monsters/i));

			expect(getByLabelText(/How Many Monsters\?/i).value).toBe('1');
			expect(getByLabelText(/What you calling them\?/i).value).toBe('');
			expect(getByLabelText(/Dex modifier/i).value).toBe('0');
			expect(getByLabelText(/Max HP/i).value).toBe('1');

			fireEvent.click(getByText(/Roll monsters!/i));

			expect(getByDisplayValue(/Monster 1/i)).toBeInTheDocument();
		});

		it('should have proper bounds for the number inputs', () => {
			const { getByText, getByLabelText } = render(
				<InitProvider>
					<Toolbar />
				</InitProvider>
			);
			fireEvent.click(getByText(/Batch-add Monsters/i));

			const quantity = getByLabelText(/How Many/i);
			const dex = getByLabelText(/Modifier/i);
			const HP = getByLabelText(/HP/i);

			quantity.stepDown();
			quantity.stepDown();

			dex.stepDown();
			dex.stepDown();

			HP.stepDown();
			HP.stepDown();
			HP.stepDown();
			HP.stepDown();

			expect(quantity.value).toBe('1');
			expect(dex.value).toBe('-2');
			expect(HP.value).toBe('1');
		});

		it('should be able to add multiple monsters', () => {
			const {
				getByText,
				getByLabelText,
				getByTestId,
				getByDisplayValue,
				getAllByLabelText,
			} = render(
				<InitProvider>
					<Toolbar />
					<InitList />
				</InitProvider>
			);
			fireEvent.click(getByText(/Batch-add Monsters/i));

			fireEvent.change(getByLabelText(/How Many Monsters\?/i), {
				target: { value: '2' },
			});
			fireEvent.change(getByLabelText(/What you calling them\?/i), {
				target: { value: 'Test' },
			});
			fireEvent.change(getByLabelText(/Dex Modifier/i), {
				target: { value: '2' },
			});
			fireEvent.change(getByLabelText(/Max HP/i), { target: { value: '10' } });
			fireEvent.submit(getByTestId('toolbar-form'));

			expect(getByDisplayValue(/Test 1/i)).toBeInTheDocument();
			expect(getByDisplayValue(/Test 2/i)).toBeInTheDocument();
			const hps = getAllByLabelText('HP');
			expect(hps.length).toBe(2);
			expect(hps[0].value).toBe('10');
		});
	});
});
