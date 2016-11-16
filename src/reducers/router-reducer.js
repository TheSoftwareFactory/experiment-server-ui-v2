import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

/**
 * Purpose of this file is to provide reducer for LOCATION_CHANGE events
 * caused by react-router-redux. This needs to be written when using Redux, redux-router and
 * Immutable together.
 * By default redux-router tries to find normal JS objects and since Immutables are not
 * you need to make a fix.
 * More info on https://github.com/reactjs/react-router-redux
 *
 * This code snippet from https://github.com/gajus/redux-immutable
 */

const initialState = Immutable.fromJS({
    locationBeforeTransitions: null
});

 export default (state = initialState, action) => {
   if (action.type === LOCATION_CHANGE) {
     return state.set('locationBeforeTransitions', action.payload);
   }
   return state;
 };
