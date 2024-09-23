import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TeamBubble } from '@/components/team-view/TeamBubble'; // Adjust the path according to your file structure
import { useNavigation } from '@react-navigation/native';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

describe('TeamBubble Component', () => {
    let navigate;

    beforeEach(() => {
        navigate = jest.fn();
        useNavigation.mockReturnValue({ navigate });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly when text is null', () => {
        const { getByTestId } = render(<TeamBubble text={null} />);
        expect(getByTestId('team-bubble-null')).toBeTruthy();
        expect(getByTestId('themed-text-fake').children).toEqual(['_ _ _ _']);
    });

    test('renders correctly when text is provided', () => {
        const { getByTestId, getByText } = render(<TeamBubble text="Team 1" teamId="123" screen="TeamScreen" />);
        expect(getByTestId('team-bubble')).toBeTruthy();
        expect(getByText('Team 1')).toBeTruthy();
        expect(getByTestId('image-pokeball')).toBeTruthy();
    });

    test('navigates to the correct screen on press', () => {
        const { getByTestId } = render(<TeamBubble text="Team 1" teamId="123" screen="TeamScreen" />);
        const button = getByTestId('pressable-team');

        fireEvent.press(button);

        expect(navigate).toHaveBeenCalledWith('TeamScreen', { teamId: '123' });
    });
});
