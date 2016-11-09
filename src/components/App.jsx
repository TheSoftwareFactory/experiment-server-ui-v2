import React, {Component} from 'react';
//Tääkin vois varmaan olla HOC
/**
 * Currenly our "base" class for React routing, only pass props forward atm.
 */
export default class App extends Component{
  render(){
    return (this.props.children)
  }
}
