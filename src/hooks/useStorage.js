import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

const dispatch = (actionId, payload) => {
  const newState = actions[actionId](globalState, payload);

  globalState = { ...globalState, ...newState };
  listeners.forEach((li) => li(globalState));
};

export const useStorage = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  useEffect(() => {
    if (shouldListen) listeners.push(setState);
    return () => {
      if (shouldListen) listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState, shouldListen]);

  return { storage: globalState, dispatch };
};

export const initStorage = (userActions, initialState) => {
  actions = { ...actions, ...userActions };
  if (initialState) globalState = { ...globalState, ...initialState };
};
