import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Create extends Component{
  constructor(){
    super();
    this.state = {
      num: 5
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onSave(ev){
    ev.preventDefault();
    console.log(this.state);
    this.props.create(this.state.num);
  }
  onChange(ev){
    this.setState({[ev.target.name]: ev.target.value});
  }
  render(){
    const { num } = this.state;
    const disabled = isNaN(num);
    return (
      <form onSubmit={ this.onSave }>
        <input value={ num } onChange={ this.onChange } name='num'/>
        <button disabled={ disabled }>Create</button>
      </form>
    );
  }
}

export default connect(
  null,
  (dispatch, otherProps)=> {
    return {
      create: async(num)=> {
        const response = await axios.post('/api/winners', { num }); 
        const winner = response.data;
        dispatch({ type: 'CREATE_WINNER', winner});
        otherProps.history.push('/all');
      }
    }
  }
)(Create);
