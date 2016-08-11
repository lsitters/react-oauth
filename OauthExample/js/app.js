'use strict'

import React, { Component } from 'react';
var LoginScreen = require('./auth/LoginScreen.js');

class DiscogsApp extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <LoginScreen />
        );
    }
}

module.exports = DiscogsApp;
