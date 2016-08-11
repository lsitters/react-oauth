/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Linking, AsyncStorage, Image, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';

var config = require('./config.js');
var qs = require('qs');

class OauthExample extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    _handleLogin() {
        requestAuthToken((err, oauth_token) => {
            if(err) { console.log(err) }
            this.setState({oauth_token: oauth_token});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./img/discogs-white.png')} style={styles.loginLogo}/>
                <TouchableHighlight onPress={this._handleLogin.bind(this)}>
                    <Animatable.View animation='slideInUp' iterationCount={1} direction='alternate'>
                        <Text style={styles.button}>
                            Sign into Discogs
                        </Text>
                    </Animatable.View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  loginLogo: {
    marginBottom: 25
  },
  button: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    borderRadius: 3
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// Discogs
function requestAuthToken(callback) {

    var timeStamp = Date.now();

    var reqTokenUrl = [
        config.DISCOGS_CONFIG.Request_Token_URL,
        '?oauth_consumer_key=' + config.DISCOGS_CONFIG.Consumer_Key,
        '&oauth_version=1.0',
        '&oauth_nonce=' + timeStamp,
        '&oauth_signature=' + config.DISCOGS_CONFIG.Consumer_Secret,
        '&oauth_signature_method=PLAINTEXT',
        '&oauth_timestamp=' + timeStamp,
        '&oauth_callback=oauth2example://'
    ].join('');

    fetch(reqTokenUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'OAuth'
        }
    })
    .then((json) => {
        let oauth_token = json._bodyText;
        discogsOAuth(oauth_token, callback);
    })
    .catch((error) => {
        console.error(error);
    });
}

function discogsOAuth (oauth_token, callback) {

    Linking.addEventListener('url', handleUrl);
    Linking.openURL(['https://discogs.com/oauth/authorize?', oauth_token].join(''));

    function handleUrl (event) {
      var [begin, end] = event.url.match(/\?(.*)/);
      var query = qs.parse(end);

      callback(null, query.oauth_token);
      Linking.removeEventListener('url', handleUrl)
    }

}

AppRegistry.registerComponent('OauthExample', () => OauthExample);
