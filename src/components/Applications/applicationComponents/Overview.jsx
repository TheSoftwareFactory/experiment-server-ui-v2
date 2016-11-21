import React, {Component} from 'react'

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
              UUID: AHSD-123H-12HS-123F-ASDJ
            </p>
          </div>
        } />
    )
  }
}
