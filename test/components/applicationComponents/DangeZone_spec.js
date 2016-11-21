import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';

import { DangerZone } from '../../../src/components/Applications/applicationComponents/DangerZone.jsx';

describe("Danger Zone",()=>{
  it('should have elements',()=>{
    const app = {id:12, name:"testiAppi"}
    const component  = renderIntoDocument(<DangerZone app={app}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const heading3 = scryRenderedDOMComponentsWithTag(component, 'h3')
    const heading4 = scryRenderedDOMComponentsWithTag(component, 'h4')

    expect(heading4.length).to.equal(1); // 3 in modal + 1 in core
    expect(heading4[0].textContent).to.equal('Delete this Application');

    expect(heading3.length).to.equal(1); // 3 in modal + 1 in core
    expect(heading3[0].textContent).to.equal('Danger Zone');

    expect(buttons.length).to.equal(4); // 3 in modal + 1 in core
    expect(buttons[1].textContent).to.equal('Delete Application');
  })
})
