import React, { Component } from 'react';
import {FlatList, View, Text, Button, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import { observer, inject } from 'mobx-react';
import {allRecipes, getRecipe} from '../graphql/queries';
import {createUser} from '../graphql/mutations';
import {graphql, compose} from 'react-apollo';
import { gql } from 'graphql-tag';
import {SelectProduct} from '../components/SelectProduct'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Header,
  ButtonGroup
} from 'react-native-elements'

@inject('userStore')
class SignUp extends Component {

  static propTypes = {
    data: React.PropTypes.shape({
      SignUp: React.PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    user : {
      name: '',
      password: '',
      email: '',
      phone: '',
      rating: 0,
      playerType: ''
    }
  };

  //static navigationOptions = ({ navigation }) => ({
  //  tabBarIcon: ({tintColor}) => (
  //    <MaterialIcons
  //      name="free-breakfast"
  //      size={22}
  //      style={[styles.icon]}
  //    >
  //    </MaterialIcons>
  //  ),
  //  tabBarLabel: 'Add Item',
  //  headerStyle: {
  //    borderWidth: 1,
  //    borderBottomColor: 'white',
  //    flexDirection: 'row',
  //    backgroundColor: '#2E8B57',
  //    height: 50
  //  },
  //  title: `${navigation.state.routeName}`,
  //  headerTintColor: 'white',
  //  headerBackTitle: null
  //  //tabBarVisible: false
  //});

  constructor(props) {
    super(props);
  }

  onChangeText = (field, val) => {
    this.state.user[field] = val;
  };


  render () {
    console.log(JSON.stringify(this.props.createUser), 'vvvvvbvbvbvbv ---- PROPS');
    return (
      <View style={styles.container}>
        <FormInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('name', val)}
        />
        <FormValidationMessage style={styles.error}></FormValidationMessage>
        <FormInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <FormValidationMessage style={styles.error}></FormValidationMessage>
        <FormInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <FormValidationMessage style={styles.error}></FormValidationMessage>
        <FormInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('phone', val)}
        />
        <FormValidationMessage style={styles.error}>ttt</FormValidationMessage>
        <FormInput
          style={styles.input}
          placeholder='Rating'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('rating', parseInt(val))}
        />
        <FormValidationMessage style={styles.error}>test</FormValidationMessage>
        <FormInput
          style={styles.input}
          placeholder='Style'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('playerType', val)}
        />
        <FormValidationMessage style={styles.error}>test</FormValidationMessage>
        <Button
          title='Sign Up'
          onPress={() => {
            let self = this;
            this.props.createUser({
              variables: this.state.user
            }).then(res => {
              console.log(JSON.stringify(res, null, 2), 'vvvvvbvbvbvbv ---- RESULT');
              //alert(`Product ${res.data.createProduct.name} was added.`);
              let user = res.data.createUser;
              self.props.userStore.user.id = user.id;
              //Object.assign(self.props.userStore.user, user);
              //self.props.userStore.isLoggedIn = true;
              self.props.navigation.navigate('Home');
              })
            }
          }
        />
      </View>
    )
  }
}

const ConnectedSignUp = compose(
  graphql(createUser, {
    name: 'createUser'
  })
)(SignUp);

let styles = StyleSheet.create({

  buttonContainer: {
    backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
  },
  icon: {
    color: '#fff'
  },
  error: {
    padding: 0,
    margin: 0,
    height: 0
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 12,
    fontSize: 18,
    fontWeight: '500',
  },
  submit:{
    marginRight:15,
    marginLeft:15,
    marginTop:10,
    marginBottom:15,
    paddingTop:10,
    paddingBottom:10,
    //backgroundColor:'#5F9495',
    borderRadius:5,
    borderWidth: 2,
    borderColor: '#5F9495'
  },
  submitText:{
    color:'#2E8B57',
    textAlign:'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  groupBtnContainer: {
    backgroundColor: '#fff',
    borderRadius:5,
    marginRight:25,
    marginLeft:25,
    padding: 3
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2E8B57',
    height: 50
  },
});

export {
  ConnectedSignUp as SignUp
}

/*
Create -> if prop ->
 */