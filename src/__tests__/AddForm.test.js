import { cleanup, render, fireEvent } from '@testing-library/react';

import { AddForm } from '../components/AddForm';
import { InitList } from '../components/InitList';
import { InitProvider } from '../context';

afterEach(cleanup);

describe('add form (NPC)', () => {
	it('renders without crashing', () => {
		const { getByTestId } = render(
			<InitProvider>
				<AddForm />
			</InitProvider>
		);

		expect(getByTestId('addForm-container')).toBeInTheDocument();
	});

	it('initializes HP, Initiative and name properly', () => {
		const { getByLabelText } = render(
			<InitProvider>
				<AddForm />
			</InitProvider>
		);

		expect(getByLabelText('Name of Creature:').value).toBe('');
		expect(getByLabelText('Initiative:').value).toBe('1');
		expect(getByLabelText('HP:').value).toBe('1');
	});

	it('adds an NPC to the initiative', () => {
		const { queryByTestId, getByLabelText } = render(
			<InitProvider>
				<AddForm />
				<InitList />
			</InitProvider>
		);

		expect(queryByTestId('creature-npc')).toBeNull();

		fireEvent.change(getByLabelText('Name of Creature:'), {
			target: { value: 'test name' },
		});
		fireEvent.change(getByLabelText('Initiative:'), {
			target: { value: '10' },
		});
		fireEvent.change(getByLabelText('HP:'), { target: { value: '5' } });
		fireEvent.submit(queryByTestId('addForm-form'));

		expect(queryByTestId('creature-npc')).toBeInTheDocument();
		expect(queryByTestId('creature-init').textContent).toBe('10');
		expect(queryByTestId('creature-name').value).toBe('test name');
		expect(getByLabelText('HP').value).toBe('5');
	});
});

describe('add form (PC)', () => {
	it('toggles to PC properly', () => {
		const { queryByLabelText, getByTestId } = render(
			<InitProvider>
				<AddForm />
			</InitProvider>
		);

		fireEvent.click(getByTestId('addplayer-type'));

		expect(queryByLabelText('HP:')).toBeNull();
	});

	it('adds a PC to the initiative', () => {
		const { queryByTestId, getByLabelText } = render(
			<InitProvider>
				<AddForm />
				<InitList />
			</InitProvider>
		);

		expect(queryByTestId('creature-pc')).toBeNull();

		fireEvent.click(queryByTestId('addplayer-type'));
		fireEvent.change(getByLabelText('Name of Creature:'), {
			target: { value: 'test name' },
		});
		fireEvent.change(getByLabelText('Initiative:'), {
			target: { value: '10' },
		});
		fireEvent.submit(queryByTestId('addForm-form'));

		expect(queryByTestId('creature-pc')).toBeInTheDocument();
		expect(queryByTestId('creature-init').textContent).toBe('10');
		expect(queryByTestId('creature-name').value).toBe('test name');
	});
});
