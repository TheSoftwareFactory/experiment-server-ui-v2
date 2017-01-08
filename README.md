#  Experiment-server-ui-v2

This is a new version of Expreriment-Server-Ui.
Backend project can be found here  https://github.com/TheSoftwareFactory/experiment-server/.
Old version of front-end can be found https://github.com/TheSoftwareFactory/experiment-server-ui/.

#### dependencies
```
  React
  Redux
  Redux-Saga
  Redux-Immutable
  React-Router
  React-Redux-Router
  Babel
  Immutable
  Axios
  Webpack
  ```

To start first run  ```npm install``` and then ```webpack-dev-server```.

# About project
This project uses React (https://facebook.github.io/react/) for rendering webpages,
Redux (http://redux.js.org/) for unidirectional dataflow,
Immutable (https://facebook.github.io/immutable-js/) for using immutable variables,
Redux-saga (https://github.com/redux-saga/redux-saga) for redux side effects (aka async-actions),
Webpack 1.x (https://webpack.github.io/) for building the project,
Babel (https://babeljs.io/) for compiling ES6/ES2017 syntax,
Axios (https://github.com/mzabriskie/axios) for AJAX-calls,
and some other libraries to handle frontend routing and testing.

All libraries mentioned above are widely used and in active development. This means when you start working on this project after a break first thing you should do is to update NPM modules.

If React+Redux combination is new to you I recommed to read a guide or two before getting hands dirty with this project.

### I know React and Redux but Sagas..?

Redux-saga is middleware library similiar to Redux-thunk to provide way to handle side effects in Redux unidirectional dataflow. Sagas are used widely in new React projects and library is in active development so no need to worry.

Sagas use ES6 generator functions (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) to capture redux-actions and perform async-actions. In this project sagas listen actions, capture them and call Axios to perform some AJAX-calls, when calls resolve saga calls next action with data recieved from AJAX-call.
Sagas look beautiful and extremely easy to test and use. In project there are multiple examples on both calls and tests, so you can just copy those.

### TODO

As allways start by updating NPM modules up-to-date.
PUT-call for to change application name
There are few //TODO comments on code, some are more suggestions check those out.
There are no end-2-end tests atm and kinda few component tests.
CSS would also be nice.

Good luck with the project and may the Force be with you.
