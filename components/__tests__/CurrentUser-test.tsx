import React from 'react';
import { render } from '@testing-library/react-native';
import { UserContext, CurrentUser } from '@/components/CurrentUser'; // Adjust the path according to your structure
import { Text } from 'react-native';

describe('CurrentUser Component', () => {
    test('provides initial context values', () => {
        const TestComponent = () => {
            const { username, userId } = React.useContext(UserContext);
            return (
                <>
                    <Text testID="username">{username}</Text>
                    <Text testID="userId">{userId}</Text>
                </>
            );
        };

        const { getByTestId } = render(
            <CurrentUser>
                <TestComponent />
            </CurrentUser>
        );

        expect(getByTestId('username').props.children).toBe('fail');
        expect(getByTestId('userId').props.children).toBe(-1);
    });
});
