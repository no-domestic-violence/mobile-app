import React, {createContext, useState, useMemo} from 'react';

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
      {props.children}
    </AppContext.Provider>
  );
}

export {ContextProvider, AppContext};
