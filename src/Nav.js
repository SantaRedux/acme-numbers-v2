import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const _Nav = (props)=> {
  const { stats } = props;
  const pathname = props.location.pathname;
  return (
    <nav>
      <Link to='/' className={ pathname === '/' ? 'selected': ''}>Home</Link>
      <Link to='/all' className={ pathname === '/all' ? 'selected': ''}>All ({ stats.all })</Link>
      <Link to='/odd' className={ pathname === '/odd' ? 'selected': '' }>Odd ({ stats.odd })</Link>
      <Link to='/even' className={ pathname === '/even' ? 'selected': ''}>Even ({ stats.even })</Link>
      <Link to='/create' className={ pathname === '/create' ? 'selected': ''}>Create</Link>
    </nav>
  );
};

export default connect(
  state => {
    const stats = state.winners.reduce((acc, winner)=> {
      const num = winner.num;
      acc.all++;
      if(num % 2){
        acc.odd++;
      }
      else {
        acc.even++;
      }
      return acc;
    }, {
      odd: 0,
      even: 0,
      all: 0
    });
    return {
      stats
    }
  }
)(_Nav);
