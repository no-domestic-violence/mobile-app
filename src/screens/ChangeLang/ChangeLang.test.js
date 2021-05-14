import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AuthContext, LanguageContext } from 'state';
import ChangeLang from './index';

const state = {
    username : 'testuser'
}

const mockNavigation = {
    goBack: jest.fn()
}

const setAppLanguage = jest.fn();
const availableLanguages = [
    { name: 'english', lang: 'en'},
    {name: 'german', lang: 'de'}
]

describe('<ChangeLang />', () => {
    let screen;
    beforeEach(() => {
        screen = render(
            <LanguageContext.Provider value={{ setAppLanguage, availableLanguages }}>
               <AuthContext.Provider value={{ state }}>
                   <ChangeLang navigation={mockNavigation}/>
                   </AuthContext.Provider>
            </LanguageContext.Provider>);

    })
  it('matches snapshot', () => {
      screen.toJSON();
      expect(screen).toMatchSnapshot();
  });
    it('renders username from the state', () => {
        expect(screen.getByText(state.username)).toBeTruthy();
  })
    it('renders all the available language options', () => {
        expect(screen.getByText(/english/i)).toBeTruthy();
        expect(screen.getByText(/german/i)).toBeTruthy();
    });

    it('handles selected language change', async () => {
        await fireEvent.press(screen.getByText(/german/i));
        expect(setAppLanguage).toHaveBeenCalledWith('de');
        expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    })
    
});
