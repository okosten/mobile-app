import React, { Component } from 'react';
import { FlatList, View, Text, Button, StyleSheet, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Header,
  ButtonGroup,
  Slider
  } from 'react-native-elements'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import {createOffer} from '../graphql/mutations';
import { observer, inject } from 'mobx-react';
import {graphql, compose} from 'react-apollo';
import { gql } from 'graphql-tag';
import DatePicker from 'react-native-datepicker'

@inject('userStore')
class CreateOffer extends Component {

  static navigationOptions = {
    title: 'Create Offer'
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.removeDate = this.removeDate.bind(this);
  }

  playerStyles = ['Attaker', 'Midfielder', 'Defender', 'Any'];

  state = {
    ratingFrom : 0,
    ratingTo: 0,
    selectDays: [],
    playerTypeIndex: 3
  };

  onDaySelect = (day) => {
    this.setState({
      selectDays: [...this.state.selectDays, day]
    })
  };

  removeDate = (index) => {
    let selectedDays = [...this.state.selectDays];
    selectedDays.splice(index, 1);
    this.setState({
      selectDays: selectedDays
    });
  };

  render () {
    const minDate = new Date();
    const maxDate = new Date(Date.now() + 7 * 24*60*60*1000);
    const { playerTypeIndex, selectDays } = this.state;

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <DatePicker
            mode="datetime"
            placeholder="Select Date"
            placeholderTextColor="#42A5F5"
            format="YYYY-MM-DD HH:mm"
            minDate={minDate}
            maxDate={maxDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={true}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderColor:"#42A5F5",
                borderWidth: 0,
              },
              dateTouchBody: {
              },
              placeholderText: {
                fontSize: 14,
                color: '#234456'
              },
              dateText: {
                color:"#42A5F5"
              }

              // ... You can check the source to find the other keys.
            }}
            onDateChange={this.onDaySelect}
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 8}}>
          <Text style={styles.dateResult}>
            Selected Dates:
          </Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          {
            this.state.selectDays.map((date, key) =>
            {
              return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text key={key} style={{marginTop: 8, color: "#44A7F7"}}>{date}</Text>
                  <Button style={{fontSize: 12}} title="X" onPress={() => {this.removeDate(key)}}
                  >
                  </Button>
                </View>
              )
            }
          )}
        </View>

        <View>
          <FormLabel>Rating From</FormLabel>
          <Slider
            value={this.state.ratingFrom}
            onValueChange={value => this.setState({"ratingFrom": value, "ratingTo": value})}
            thumbTintColor={"#42A5F5"}
            step={50}
            maximumValue={1500}
            maximumTrackTintColor={"#42A5F5"}
          />
          <Text>Value: {this.state.ratingFrom}</Text>
          <FormValidationMessage style={styles.error}></FormValidationMessage>
        </View>
        <View>
          <FormLabel>Rating To</FormLabel>
          <Slider
            value={this.state.ratingTo}
            onValueChange={value => this.setState({"ratingTo": value})}
            thumbTintColor={"#42A5F5"}
            step={50}
            maximumValue={1500}
            minimumValue={this.state.ratingFrom}
            maximumTrackTintColor={"#42A5F5"}
          />
          <Text>Value: {this.state.ratingTo}</Text>
          <FormValidationMessage style={styles.error}></FormValidationMessage>
        </View>
        <ButtonGroup
          onPress={(val) => {this.setState({playerTypeIndex: val})}}
          selectedIndex={playerTypeIndex}
          buttons={this.playerStyles}
          containerStyle={{height: 50}}
        />
        <View style={{marginTop: 40}}>
          <Button
            title='Submit'
            onPress={() => {
              let self = this;
              let dates = [];
              console.log(JSON.stringify(this.props.userStore.user, null, 2), 'vvvvvbvbvbvbv ---- RESULT');
              let variables = {
                startRating: this.state.ratingFrom,
                endRating: this.state.ratingTo,
                preferredStyle: this.playerStyles[this.state.playerTypeIndex],
                userId: this.props.userStore.user.id,
                dates: dates.push(selectDays.map(day => ({date: day})))
              };

              this.props.createOffer({
                variables: variables
              }).then(res => {
                console.log(JSON.stringify(res, null, 2), 'vvvvvbvbvbvbv ---- RESULT');
                //alert(`Product ${res.data.createProduct.name} was added.`);
                //let user = res.data.createUser;
                //self.props.userStore.user.id = user.id;
                //Object.assign(self.props.userStore.user, user);
                //self.props.userStore.isLoggedIn = true;
                //self.props.navigation.navigate('Home');
              })
            }}
          />
        </View>
      </View>
    );
  };
}

const ConnectedCreateOffer = compose(
  graphql(createOffer, {
    name: 'createOffer'
  })
)(CreateOffer);


let styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20
  },
  dateResult: {
    color: '#234456',
    marginTop: 10,
    justifyContent: 'center'
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
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20
  },
  time: {
    alignSelf: "flex-end",
    margin: 15,
    fontSize: 12,
    color: "#808080"
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: "row",

    borderRadius: 300,
    padding: 1
  }
});

export {ConnectedCreateOffer as CreateOffer};

