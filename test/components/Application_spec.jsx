import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { ApplicationsBase } from '../../src/components/Applications/Applications.jsx';
import { expect } from 'chai';
import { fromJS } from 'immutable'

describe('Applications', () => {
  //this does not work, please fix, somehow to work.
  it('renders an application', () => {
    let parasm = fromJS([{"id": 1, "name": "testiAppi"}])
    /*
    No component testing at the moment
    //TODO it plz.
    
    const component = renderIntoDocument(<ApplicationsBase apps={parasm} />)

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    /**
     * In here first button is 'create new application'
     * second is actual element
     * and last one is delete element button.
     * Correct number of buttons is 2n-1
     * Yes fix this when proper app structure

    expect(buttons.length).to.equal(3);
    expect(buttons[1].textContent).to.equal('Edit');
    */
  });
});
