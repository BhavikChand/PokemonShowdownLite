import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NewTeam } from '@/components/team-view/NewTeam'; // Adjust the path according to your file structure
import { useNavigation } from '@react-navigation/native';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

describe('NewTeam Component', () => {
    let navigate;

    beforeEach(() => {
        navigate = jest.fn();
        useNavigation.mockReturnValue({ navigate });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        const { getByText, getByRole } = render(<NewTeam />);
        expect(getByText('New Team')).toBeTruthy();
    });

    test('navigates to the new team screen on press', () => {
        const { getByText } = render(<NewTeam />);
        const button = getByText('New Team');

        fireEvent.press(button);

        expect(navigate).toHaveBeenCalledWith('new', {
            currentTeam: [],
            learnedMoves: null,
            pokemonStats: null,
        });
    });
});
