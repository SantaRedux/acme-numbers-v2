import React from 'react';
import { connect } from 'react-redux';

const _Home = ({ count })=> {
  return (
    <div>
      <h1>Home</h1>
      <p>We have { count } numbers!</p>
    </div>
  );
}

export default connect(
  ({ winners }) => {
    return {
      count: winners.length
    };
  }
)(_Home);
