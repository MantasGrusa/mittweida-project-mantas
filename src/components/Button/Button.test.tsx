
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button'; // Adjust the import path as needed



describe('Button Component', () => {
    it('renders without crashing', () => {
        render(<Button children={undefined}></Button>);
            expect(screen.getByRole('button')).toBeInTheDocument();
        });
    it('renders with text children', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });




});