import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import {Applications} from '../../src/components/Applications/ApplicationHOC.jsx';
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable'

describe('Applications', () => {
  //this does not work, please fix, somehow to work.
  it('renders an application', () => {
    let kaikki = fromJS([{"id": 1, "name": "testiAppi"}])
    const component = renderIntoDocument(<Applications apps={kaikki} />)

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    /**
     * In here first button is 'create new application'
     * second is actual element
     * and last one is delete element button. 
     * Correct number of buttons is 2n-1
     * Yes fix this when proper app structure
     */
    expect(buttons.length).to.equal(3);
    expect(buttons[1].textContent).to.equal('testiAppi');

  });
});
