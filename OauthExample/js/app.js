'use strict'

import React, { Component } from 'react';
var LoginScreen = require('./auth/LoginScreen');

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
