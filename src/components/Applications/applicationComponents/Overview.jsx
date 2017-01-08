import React, {Component} from 'react'
import { Link } from 'react-router'
import { DataBox } from '../../generals/Generals.jsx'

export default class Overview extends Component{

  /**
   * Renders first box in application view. Uses DataBox HOC.
   */
  render(){
    return(
      <DataBox heading="Overview"
        content={
          <div className="dbContent">
            <div className="left">
            <h4>Configuration Keys</h4>
            <ul>
            {this.props.app.configurationkeys.map(key =>{
              return(<li key={key.id}>
                {key.name} : {key.type}</li>
              )
            })}
            </ul>
            </div>
            <div className="right">
              API-key: {this.props.app.apikey}
            </div>
            <Link to={'/applications/' + this.props.app.id + "/experiments" } activeClassName="active">Experiments</Link>
          </div>
        } />
    )
  }
}
