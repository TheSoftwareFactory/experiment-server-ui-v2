import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import Applications from '../../src/components/Applications/Applications.jsx';
import {expect} from 'chai';

describe('Applications', () => {
  //this does not work, please fix, somehow to work. 
  it('renders list of applications', () => {
    const component = renderIntoDocument(
      <Applications apps={['Math Game', 'Temo', 'Test Game', 'Peli']} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(4);
    expect(buttons[0].textContent).to.equal('Peli');
    expect(buttons[3].textContent).to.equal('Temooooo');
  });

});
