import React, { Component } from 'react';
import { FlatList, View, Text, Button, StyleSheet, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import {getProducts} from '../graphql/queries';
import {deleteProduct} from '../graphql/mutations';
import { observer, inject } from 'mobx-react';
import {graphql, compose} from 'react-apollo';
import { gql } from 'graphql-tag';
import CalendarPicker from 'react-native-calendar-picker';

@inject('userStore')
class Guest extends Component {

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  render () {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toISOString().slice(0, 10) : '';
    const minDate = new Date();
    const maxDate = new Date(Date.now() + 7 * 24*60*60*1000);
    //let data = this.props.data.allProducts;
    return (
      <View style={styles.container}>
        <View style={{}}>
          <Text style={{color: '#008B8B'}}>*Please choose a date to get offers on the nearest training</Text>
          <CalendarPicker
            onDateChange={this.onDateChange}
            selectedDayColor={'#42A5F5'}
            textStyle={{color: '#32A2F2'}}
            minDate={minDate}
            maxDate={maxDate}
          />
          <Text style={{color: '#42A5F5'}}>Selected Date:</Text>
          <Text>{ startDate }</Text>
        {this.state.selectedStartDate && (<Button
            title='Submit'
            onPress={() => {
            }}
          />)
        }
        </View>
        <View style={{flex:1, justifyContent: 'flex-end'}}>
          <TouchableHighlight
            style={styles.longButton}
            onPress={() => {
            }}
          >
            <Text style={{color: '#FFF', fontSize: 14, fontWeight: 'bold'}}>See All Offers</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.longButton}
            onPress={() => {this.navigation.navigate('CreateOffer')}}
          >
            <Text style={{color: '#FFF', fontSize: 14, fontWeight: 'bold'}}>Create Own Offer</Text>
          </TouchableHighlight>
        </View>

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

