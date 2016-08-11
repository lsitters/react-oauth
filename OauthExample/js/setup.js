'use strict';

import React, { Component } from 'react';
var { Provider } = require('react-redux');
var DiscogsApp = require('./app');

function setup(): ReactClass<{}> {

    class Root extends React.Component {
        state: {
          isLoading: boolean;
          store: any;
        };

        constructor() {
          super();
          this.state = {
            isLoading: true,
            store: {isLoading: false}
          };
        }

        render() {
          return (
            <Provider store={this.state.store}>
                <DiscogsApp />
            </Provider>
          );
        }
  }

  return Root;
}

module.exports = setup;
