import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

/**
 * Purpose of this file is to provide reducer for LOCATION_CHANGE events
 * caused by react-router-redux. This needs to be written when using Redux, redux-router and
 * Immutable together.
 * By default redux-router tries to find normal JS objects and since Immutables are not
 * you need to make a fix.
 * More info on https://github.com/reactjs/react-router-redux
 */


const initialState = Immutable.fromJS({
    locationBeforeTransitions: null
});

/**
 * try-catch block is here to suppress a warning caused by using value of null
 * in 'locationBeforeTransitions' when two first actions are called.
 * react-router-redux does not like that kind of behavior when using hashHistory.
 * Nothing to worry about just #javascriptLifeStyle
 */
export default (state=initialState, action) => {
  try {
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }
  } catch (e) {

  } finally {
    return state;
  }
};
