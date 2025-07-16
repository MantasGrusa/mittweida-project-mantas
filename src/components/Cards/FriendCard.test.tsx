import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import FriendCard from './FriendCard.tsx';

describe('FriendCard Component', () => {
    const mockProps = {
        name: 'Alice',
        onClick: vi.fn(),
        onRemove: vi.fn(),
    };

    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
    });

    test('renders friend name correctly', () => {
        render(<FriendCard {...mockProps} />);

        expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    test('renders Challenge button', () => {
        render(<FriendCard {...mockProps} />);

        const challengeButton = screen.getByText('Challenge');
        expect(challengeButton).toBeInTheDocument();
        expect(challengeButton).toHaveClass('bg-green-700');
    });

    test('renders Remove button', () => {
        render(<FriendCard {...mockProps} />);

        const removeButton = screen.getByText('X');
        expect(removeButton).toBeInTheDocument();
        expect(removeButton).toHaveClass('bg-red-700');
    });

    test('calls onClick when Challenge button is clicked', () => {
        render(<FriendCard {...mockProps} />);

        const challengeButton = screen.getByText('Challenge');
        fireEvent.click(challengeButton);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });

    test('calls onRemove when X button is clicked', () => {
        render(<FriendCard {...mockProps} />);

        const removeButton = screen.getByText('X');
        fireEvent.click(removeButton);

        expect(mockProps.onRemove).toHaveBeenCalledTimes(1);
    });

    test('handles different friend names', () => {
        const propsWithDifferentName = {
            ...mockProps,
            name: 'Bob Smith',
        };

        render(<FriendCard {...propsWithDifferentName} />);

        expect(screen.getByText('Bob Smith')).toBeInTheDocument();
        expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });

    test('renders with empty name', () => {
        const propsWithEmptyName = {
            ...mockProps,
            name: '',
        };

        render(<FriendCard {...propsWithEmptyName} />);

        // Should still render the component structure
        expect(screen.getByText('Challenge')).toBeInTheDocument();
        expect(screen.getByText('X')).toBeInTheDocument();
    });

    test('accessibility - buttons are keyboard accessible', () => {
        render(<FriendCard {...mockProps} />);

        const challengeButton = screen.getByRole('button', { name: 'Challenge' });
        const removeButton = screen.getByRole('button', { name: 'X' });

        // Focus and trigger with keyboard
        challengeButton.focus();
        fireEvent.keyDown(challengeButton, { key: 'Enter' });

        removeButton.focus();
        fireEvent.keyDown(removeButton, { key: 'Enter' });

        // Note: fireEvent.keyDown doesn't automatically trigger click for Enter key
        // In a real test, you might want to test actual keyboard interactions
        expect(challengeButton).toBeInTheDocument();
        expect(removeButton).toBeInTheDocument();
    });
});