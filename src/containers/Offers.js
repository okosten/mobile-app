import React, { Component } from 'react';
import { FlatList, View, Text, Button, StyleSheet, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import {getProducts} from '../graphql/queries';
import {deleteProduct} from '../graphql/mutations';
import { observer, inject } from 'mobx-react';
import {graphql, compose} from 'react-apollo';
import { gql } from 'graphql-tag';

@inject('userStore')
class Offers extends Component {

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  render () {
    //let data = this.props.data.allProducts;
    return (
      <View style={styles.container}>

      </View>
    );
  };

}


let styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 15
  },
  longButton: {
    backgroundColor: '#42A5F5',
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 10,
    //shadowOpacity: 0.25
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#2E8B57',
    height: 50
  },
  icon: {
    color: '#fff'
  },
  content: {
    marginTop: 60,
  },
  column: {
    //width: 80,
    paddingLeft: 10,
    textAlign:'right',
    height: 20,
    backgroundColor: '#FFFFE0',
  },
  headerColumn: {
    //width: 85,
    textAlign:'right',
    fontSize: 12,
    fontWeight: 'bold',
    height: 30,
    backgroundColor: '#FF7F50',
  },
  secondColor: {
    backgroundColor: '#FFEBCD',
  }
});

export {Guest};

