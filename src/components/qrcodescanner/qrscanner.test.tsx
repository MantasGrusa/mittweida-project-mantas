
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import QRScanner from './qrscanner.tsx';

// Mock the external dependencies
vi.mock('react-qr-barcode-scanner', () => {
    return {
        default: function MockBarcodeScanner({ onUpdate, width, height }: any) {
            // Store the onUpdate function globally so we can trigger it in tests
            (global as any).mockOnUpdate = onUpdate;
            return (
                <div
                    data-testid="barcode-scanner"
                    data-width={width}
                    data-height={height}
                >
                    Mock Barcode Scanner
                </div>
            );
        }
    };
});

vi.mock('wouter', () => ({
    useLocation: vi.fn(() => ['/current-path', vi.fn()])
}));

// Mock fetch for API calls
global.fetch = vi.fn();

import { useLocation } from 'wouter';

describe('QRScanner Component', () => {
    const mockSetLocation = vi.fn();
    const mockUser = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useLocation as any).mockReturnValue(['/current-path', mockSetLocation]);
        (global as any).mockOnUpdate = undefined;

        // Mock localStorage
        const localStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
        };
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
        });

        // Mock window.location.href
        delete (window as any).location;
        window.location = { href: '' } as any;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('User Authentication', () => {
        test('should show login prompt when user is not logged in', () => {
            // Mock no user in localStorage
            (window.localStorage.getItem as any).mockReturnValue(null);

            render(<QRScanner />);

            expect(screen.getByText('Please Log In')).toBeInTheDocument();
            expect(screen.getByText('You need to be logged in to scan QR codes')).toBeInTheDocument();
            expect(screen.getByText('Go to Login')).toBeInTheDocument();
        });

        test('should show scanner when user is logged in', () => {
            // Mock user in localStorage
            (window.localStorage.getItem as any)
                .mockReturnValueOnce(JSON.stringify(mockUser)) // for user
                .mockReturnValueOnce('SPORTS_001_QR') // for expectedQRCode
                .mockReturnValueOnce(JSON.stringify({ name: 'Test Location' })); // for currentLocation

            render(<QRScanner />);

            expect(screen.getByText('Scan QR Code')).toBeInTheDocument();
            expect(screen.getByTestId('barcode-scanner')).toBeInTheDocument();
        });
    });

    describe('QR Code Validation', () => {
        beforeEach(() => {
            // Setup logged in user
            (window.localStorage.getItem as any)
                .mockReturnValueOnce(JSON.stringify(mockUser))
                .mockReturnValueOnce('SPORTS_001_QR')
                .mockReturnValueOnce(JSON.stringify({ name: 'Test Location' }));
        });

        test('should reject wrong QR code', async () => {
            render(<QRScanner />);

            // Simulate scanning wrong QR code
            const mockResult = { text: 'WRONG_QR_CODE' };
            (global as any).mockOnUpdate(null, mockResult);

            await waitFor(() => {
                expect(screen.getByText(/Wrong QR code!/)).toBeInTheDocument();
            });

            expect(fetch).not.toHaveBeenCalled();
        });

        test('should accept correct QR code and make API call', async () => {
            // Mock successful API response
            (fetch as any).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    success: true,
                    message: 'Location completed!',
                    progress: 33
                })
            });

            render(<QRScanner />);

            // Simulate scanning correct QR code
            const mockResult = { text: 'SPORTS_001_QR' };
            (global as any).mockOnUpdate(null, mockResult);

            await waitFor(() => {
                expect(fetch).toHaveBeenCalledWith(
                    'http://localhost:3000/users/scan-qr/123',
                    expect.objectContaining({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ qrCode: 'SPORTS_001_QR' })
                    })
                );
            });
        });
    });

    describe('Navigation after successful scan', () => {
        beforeEach(() => {
            // Setup logged in user
            (window.localStorage.getItem as any)
                .mockReturnValueOnce(JSON.stringify(mockUser))
                .mockReturnValueOnce('SPORTS_001_QR')
                .mockReturnValueOnce(JSON.stringify({ name: 'Test Location' }));
        });

        test('should navigate to level page after successful QR scan', async () => {
            // Mock successful API response
            (fetch as any).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    success: true,
                    message: 'Location completed!',
                    progress: 33
                })
            });

            render(<QRScanner />);

            // Simulate scanning correct QR code
            const mockResult = { text: 'SPORTS_001_QR' };
            (global as any).mockOnUpdate(null, mockResult);

            await waitFor(() => {
                expect(window.location.href).toBe('/#/level');
            });
        });
    });

    describe('Error Handling', () => {
        beforeEach(() => {
            // Setup logged in user
            (window.localStorage.getItem as any)
                .mockReturnValueOnce(JSON.stringify(mockUser))
                .mockReturnValueOnce('SPORTS_001_QR')
                .mockReturnValueOnce(JSON.stringify({ name: 'Test Location' }));
        });

        test('should handle API errors gracefully', async () => {
            // Mock API error
            (fetch as any).mockRejectedValueOnce(new Error('Network error'));

            render(<QRScanner />);

            // Simulate scanning correct QR code
            const mockResult = { text: 'SPORTS_001_QR' };
            (global as any).mockOnUpdate(null, mockResult);

            await waitFor(() => {
                expect(screen.getByText(/Network error/)).toBeInTheDocument();
            });
        });

        test('should handle camera errors', async () => {
            render(<QRScanner />);

            // Simulate camera error
            const mockError = new Error('Camera not available');
            (global as any).mockOnUpdate(mockError, null);

            await waitFor(() => {
                expect(screen.getByText('Error reading QR code - try again')).toBeInTheDocument();
            });
        });
    });

    describe('UI Components', () => {
        beforeEach(() => {
            // Setup logged in user
            (window.localStorage.getItem as any)
                .mockReturnValueOnce(JSON.stringify(mockUser))
                .mockReturnValueOnce('SPORTS_001_QR')
                .mockReturnValueOnce(JSON.stringify({ name: 'Test Location' }));
        });

        test('should display expected QR code information', () => {
            render(<QRScanner />);

            expect(screen.getByText('Expected code: SPORTS_001_QR')).toBeInTheDocument();
            expect(screen.getByText('Location: Test Location')).toBeInTheDocument();
        });

        test('should have functioning back button', () => {
            render(<QRScanner />);

            const backButton = screen.getByText('←');
            fireEvent.click(backButton);

            expect(mockSetLocation).toHaveBeenCalledWith('/map/undefined');
        });

        test('should show retry button when camera is paused', async () => {
            render(<QRScanner />);

            // Simulate error to pause camera
            const mockError = new Error('Camera error');
            (global as any).mockOnUpdate(mockError, null);

            await waitFor(() => {
                expect(screen.getByText('Scan Again')).toBeInTheDocument();
            });
        });
    });
});