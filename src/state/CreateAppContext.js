import React, { useReducer } from 'react';

// boilerplate for creating Context and Provider
// does not to be changed
export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    //actions is object for ex {updateCurrentLocation: (dispatch)=> (location) => { dispatch({ type: 'UPDATE_LOCATION', payload: location });}
    const boundActions = {};
    //we need to loop through each action in object and for every key(which is function) we call it with dispatch argument and it gives back function. this function we pass down to all children like ...boundActions
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
