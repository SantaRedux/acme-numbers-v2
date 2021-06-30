import { createStore, combineReducers } from 'redux';

const winners = (state = [], action)=> {
  if(action.type === 'SET_WINNERS'){
    state = action.winners;
  }
  return state;
};

const store = createStore(combineReducers({ winners }));

export default store;



