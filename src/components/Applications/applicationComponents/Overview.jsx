import React, {Component} from 'react'
import { Link } from 'react-router'
import { DataBox } from '../../generals/Generals.jsx'

export default class Overview extends Component{

  render(){
    return(
      <DataBox heading="Overview"
        content={
          <div>
            <h4>Configuration Keys</h4>
            {this.props.app.configurationkeys.map(key =>{
              return(<div key={key.id}>
                {key.name} : {key.type}
              </div>)
            })}
            <p>
              API-key: {this.props.app.apikey}
            </p>
            <Link to={'/applications/' + this.props.app.id + "/experiments" } activeClassName="active">Experiments</Link>
          </div>
        } />
    )
  }
}
