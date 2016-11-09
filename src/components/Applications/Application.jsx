import React, {Component} from 'react'

//TODO maybe replace this with HOC

export default class Application extends Component{

  render(){
    return (<p key={this.props.name}>
    <button >
      <h1>{this.props.name}</h1>
    </button>
      <button onClick={() => this.props.onDeleteClick(this.props.id)}>Delete</button>
    </p>)
  }
}
