import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { AuthContext, LanguageProvider } from 'state';
import UserSettings from './index';

const mockLoggedOutState = {
    isLoggedIn: false,
    isFirstLaunch: false,
}
const mockLoggedInState = {
    isLoggedIn: true,
    errorMessage: '',
    isFirstLaunch: false,
    username: 'testuser',
    token: 'testjwttoken',
};
  
const mockNavigation = {
    navigate: jest.fn()
}
const signout = jest.fn();

describe('<UserSettings />', () => {    
    it('should match snapshot', () => {
        const result = render(
            <LanguageProvider>
                <AuthContext.Provider value={{ state: mockLoggedInState, signout }}>
                        <UserSettings />
                </AuthContext.Provider>
            </LanguageProvider>
        ).toJSON();
        expect(result).toMatchSnapshot();
    })
    it('should render user settings elements for logged in user', () => {
        const { getByText } = render(
                <AuthContext.Provider value={{ state: mockLoggedInState, signout }}>
                    <UserSettings />
                </AuthContext.Provider>

    );
        expect(getByText('common.logout')).toBeTruthy();
        expect(getByText('common.how-to-use')).toBeTruthy();
        expect(getByText('common.change-password')).toBeTruthy();
        expect(getByText('common.change-language')).toBeTruthy();
        expect(getByText('common.delete-account')).toBeTruthy();
    })

    it('should navigate to change password screen when change password button is pressed', () => {
        const { getByText } = render(
            <AuthContext.Provider value={{ state: mockLoggedInState, signout }}>
                <UserSettings navigation={mockNavigation} />
            </AuthContext.Provider>
        );
        fireEvent.press(getByText('common.change-password'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Change Password');
    })

    it('should navigate to change language screen when change language button is pressed', () => {
        const { getByText } = render(
            <AuthContext.Provider value={{ state: mockLoggedInState, signout }}>
                <UserSettings navigation={mockNavigation} />
            </AuthContext.Provider>
        );
        fireEvent.press(getByText('common.change-language'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Change Language');
    })

    it('should navigate to delete account screen when delete account button is pressed', () => {
        const { getByText } = render(
            <AuthContext.Provider value={{ state: mockLoggedInState, signout }}>
                <UserSettings navigation={mockNavigation} />
            </AuthContext.Provider>
        );
        fireEvent.press(getByText('common.delete-account'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Delete Account');
    })

    it('should handle signout', () => {
        const { getByText } = render(
            <AuthContext.Provider value={{ state: mockLoggedInState, signout }}>
                <UserSettings />
            </AuthContext.Provider>

        );
        fireEvent.press(getByText('common.logout'));
        expect(signout).toHaveBeenCalledTimes(1);
    });
    it('should render user settings elements for logged out user', () => {
        const { getByText, queryByText } = render(
            <AuthContext.Provider value={{ state: mockLoggedOutState, signout }}>
                <UserSettings />
            </AuthContext.Provider>

        );
        expect(getByText('common.login')).toBeTruthy();
        expect(getByText('common.how-to-use')).toBeTruthy();
        expect(queryByText('common.change-password')).toBeNull();
        expect(queryByText('common.change-language')).toBeNull();
        expect(queryByText('common.delete-account')).toBeNull();
    });

    it('should navigate to logIn screen when log in button is pressed', () => {
        const { getByText } = render(
            <AuthContext.Provider value={{ state: mockLoggedOutState, signout }}>
                <UserSettings navigation={mockNavigation} />
            </AuthContext.Provider>
        );
        fireEvent.press(getByText('common.login'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    })
});
