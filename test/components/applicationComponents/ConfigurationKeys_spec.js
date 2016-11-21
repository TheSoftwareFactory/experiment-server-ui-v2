import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';

import { ConfigurationKeys } from '../../../src/components/Applications/applicationComponents/ConfigurationKeys.jsx';

describe("ConfigurationKeys",()=>{
  it('should have elements',()=>{
    const app = {id:1, name:"testiAppi", configurationkeys: [{id: 10, type: "boolean", name: "testiConffi", application_id: 1}]}
    const component  = renderIntoDocument(<ConfigurationKeys app={app}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const heading3 = scryRenderedDOMComponentsWithTag(component, 'h3')

    expect(heading3.length).to.equal(1); // 3 in modal + 1 in core
    expect(heading3[0].textContent).to.equal('Configuration Keys');

    expect(buttons.length).to.equal(5); // 3 in modal + 1 for adding and 1 for deleting.
    expect(buttons[1].textContent).to.equal('Delete Configuration Key');
  })
})
