import React, {createContext, useState, useMemo} from 'react';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';

const AppContext = createContext();

function ContextProvider(props) {
  //just an example of context usage
  const [userToken, setUserToken] = useState('');
  const authContext = useMemo(() => {
    return {
      logIn: () => {
        setUserToken('tokenishere');
      },
      signUp: () => {
        setUserToken('tokenishere');
      },
      signOut: () => {
        setUserToken('');
      },
    };
  });

  return (
    <AppContext.Provider value={{authContext, userToken}}>
      <I18nextProvider i18n={i18next}>{props.children}</I18nextProvider>
    </AppContext.Provider>
  );
}

export {ContextProvider, AppContext};
