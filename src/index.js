import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'mobx-react';
import Stack from './router';
import stores from './stores';
import { ApolloProvider } from 'react-apollo'
import client from './utils/client';

export default class mobOrganizer extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <Provider {...stores}>
        <Stack test="ios"/>
      </Provider>
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('mobOrganizer', () => mobOrganizer);