import React, { Component } from 'react';
import Home from './Home';
import Nav from './Nav';
import Numbers from './Numbers';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class _App extends Component{
  componentDidMount(){
    this.props.fetchWinners();
  }
  render(){
    return (
      <div>
        <Route component={ Nav } />
        <main>
          <Route path='/' component={ Home } exact/>
          <Route path='/:filter' component={ Numbers }/>
        </main>
      </div>
    );
  }
}

export default connect(
  (state)=> {
    return {
      numbers: state.numbers
    };
  },
  (dispatch)=> {
    return {
      fetchWinners: async()=> {
        const winners = (await axios.get('/api/winners')).data;
        dispatch({ type: 'SET_WINNERS', winners});
      }
    }
  }
)(_App);
