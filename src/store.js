import { createStore, combineReducers } from 'redux';

const winners = (state = [], action)=> {
  if(action.type === 'SET_WINNERS'){
    state = action.winners;
  }
  if(action.type === 'DESTROY_WINNER'){
    state = state.filter(winner => winner.id !== action.winner.id);
  }
  if(action.type === 'CREATE_WINNER'){
    state = [...state, action.winner]; 
  }
  if(action.type === 'UPDATE_WINNER'){
    state = state.map(winner => winner.id === action.winner.id ? action.winner : winner); 
  }
  return state;
};

const store = createStore(combineReducers({ winners }));

export default store;



