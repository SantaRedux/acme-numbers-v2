import React from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const _Numbers = (props)=> {
  const { filter } = props.match.params;
  let winners = props.winners; 

  if(filter === 'odd'){
    winners = winners.filter(winner => winner.num % 2);
  }
  if(filter === 'even'){
    winners = winners.filter(winner => winner.num % 2 === 0);
  }
  return (
    <ul>
      {
        winners.map( (winner) => {
          const { num } = winner;
          return (
            <li key={ winner.id }>
              <Link to={`/edit/${ winner.id }`}>{ num }</Link>
              <button onClick={()=> props.destroy(winner) }>x</button>
            </li>
          );
        })
      }
    </ul>
  );
}

export default connect(
  ({ winners })=> {
    return {
      winners
    }
  },
  (dispatch)=> {
    return {
      destroy: async(winner)=> {
        await axios.delete(`/api/winners/${winner.id}`);
        dispatch({ type: 'DESTROY_WINNER', winner});
      } 
    };
  }
)(_Numbers);




