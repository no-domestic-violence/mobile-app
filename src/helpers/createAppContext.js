import React, { useReducer } from 'react';

const createAppContext = (reducer, actions, defaultValue) => {
  const Context = React.createContext();
  // eslint-disable-next-line
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const boundActions = {};
    // eslint-disable-next-line
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};

export default createAppContext;
