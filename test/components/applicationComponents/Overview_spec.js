import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';

import Overview from '../../../src/components/Applications/applicationComponents/Overview.jsx';

describe("Overview",()=>{
  it('should have elements',()=>{
    const app = {id:1, name:"testiAppi", configurationkeys: [{id: 10, type: "boolean", name: "testiConffi", application_id: 1}]}
    const component  = renderIntoDocument(<Overview app={app}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const heading3 = scryRenderedDOMComponentsWithTag(component, 'h3')
    const heading4 = scryRenderedDOMComponentsWithTag(component, 'h4')

    expect(heading4.length).to.equal(1); // 3 in modal + 1 in core
    expect(heading4[0].textContent).to.equal('Configuration Keys');

    expect(heading3.length).to.equal(1); // 3 in modal + 1 in core
    expect(heading3[0].textContent).to.equal('Overview');

    expect(buttons.length).to.equal(0); // 3 in modal + 1 in core
    //expect(buttons[1].textContent).to.equal('Delete Application');
  })
})
