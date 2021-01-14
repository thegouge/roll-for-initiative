import { render, screen } from '@testing-library/react';
import { AddForm } from '../components/AddForm';

test('renders without crashing', () => {
	render(<AddForm />);
});
