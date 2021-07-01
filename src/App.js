import React, { Component } from 'react';
import Home from './Home';
import Nav from './Nav';
import Numbers from './Numbers';
import Create from './Create';
import Edit from './Edit';
import { Route, Switch } from 'react-router-dom';
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
          <Switch>
            <Route path='/create' component={ Create }/>
            <Route path='/:filter' component={ Numbers } exact/>
          </Switch>
          <Route path='/edit/:id' component={ Edit } />
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
