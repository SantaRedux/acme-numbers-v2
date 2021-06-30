import React from 'react'; 
import { connect } from 'react-redux';

const _Numbers = (props)=> {
  const { filter } = props.match.params;
  let numbers = props.winners.map( winner => winner.num);

  if(filter === 'odd'){
    numbers = numbers.filter(num => num % 2);
  }
  if(filter === 'even'){
    numbers = numbers.filter(num => num % 2 === 0);
  }
  return (
    <ul>
      {
        numbers.map( (num, idx) => {
          return (
            <li key={ idx }>
              { num }
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
  }
)(_Numbers);
