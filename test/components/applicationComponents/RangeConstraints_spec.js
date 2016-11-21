import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';

import { RangeConstraints } from '../../../src/components/Applications/applicationComponents/RangeConstraints.jsx';

describe("RangeConstraints",()=>{
  it('should have elements',()=>{
    const app = {id:1, name:"testiAppi",
     configurationkeys: [{id: 10, type: "boolean", name: "testiConffi", application_id: 1}],
     rangeconstraints: [{id: 9, value: "21", operator_id: 1, configurationkey_id: 10}]}
    const operations = [ {id: 1, math_value: "=", human_value: "equals"}]

    const component  = renderIntoDocument(<RangeConstraints operations={operations} app={app}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const heading3 = scryRenderedDOMComponentsWithTag(component, 'h3')

    expect(buttons.length).to.equal(2); //1 for delete and 1 for addition
    expect(buttons[1].textContent).to.equal("Post Range");
  })
})
