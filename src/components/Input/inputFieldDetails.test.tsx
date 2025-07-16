
import { render, screen} from '@testing-library/react';

import '@testing-library/jest-dom';
import InputField from './InputFieldDetails.tsx';
const test = () => console.log('test');

    describe('Rendering', () => {
        it('should render input with correct placeholder', () => {
            render(
                <InputField
                    placeholder="Enter your name"
                    value=""
                    onChange={test}
                />
            );

            const input: HTMLInputElement = screen.getByPlaceholderText('Enter your name');
            expect(input).toBeInTheDocument();
        });

        it('should render input with correct value', () => {
            render(
                <InputField
                    placeholder="Enter your name"
                    value="John Doe"
                    onChange={test}
                />
            );

            const input: HTMLInputElement = screen.getByDisplayValue('John Doe');
            expect(input).toBeInTheDocument();
        })
    })
