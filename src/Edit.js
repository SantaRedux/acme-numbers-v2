import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Edit extends Component{
  constructor(){
    super();
    this.state = {
      num: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  async componentDidMount(){
    const response = await axios.get(`/api/winners/${this.props.match.params.id}`);
    const winner = response.data;
    this.setState({ num: winner.num });
  }
  onSave(ev){
    ev.preventDefault();
    this.props.update(this.state.num);
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
        <button disabled={ disabled }>Update</button>
      </form>
    );
  }
}

export default connect(
  null,
  (dispatch, otherProps)=> {
    return {
      update: async(num)=> {
        const id = otherProps.match.params.id;
        const response = await axios.put(`/api/winners/${id}`, { num });
        const winner = response.data;
        dispatch({ type: 'UPDATE_WINNER', winner});
        otherProps.history.push('/all');
      }
    }
  }
)(Edit);
