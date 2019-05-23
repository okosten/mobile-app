import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons.js'
import { observer, inject } from 'mobx-react';
import {getUser} from '../graphql/queries';
import {graphql, compose} from 'react-apollo';
import { gql } from 'graphql-tag';
import {SelectProduct} from '../components/SelectProduct'
import client from '../utils/client';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Header,
  ButtonGroup
} from 'react-native-elements'

@inject('userStore')
class Login extends Component {

  static navigationOptions = {
    title: 'Login'
  };

  static propTypes = {
    data: React.PropTypes.shape({
      Login: React.PropTypes.func.isRequired,
      //users: React.PropTypes.object
    }).isRequired
  };



  state = {
    email: '',
    password: ''
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  onChangeText = (field, val) => {
    this.state[field] = val;
  };

  render() {
    console.log(JSON.stringify(this.props), 'vvvvvbvbvbvbv ---- PPPPPP');
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{fontSize: 18, marginBottom: 15}}>
            Login
          </Text>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="mail"
              size={18}
              style={[styles.inputIcon]}
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              onChangeText={val => this.onChangeText('email', val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="textbox-password"
              size={18}
              style={[styles.inputIcon]}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={val => this.onChangeText('password', val)}
            />
          </View>

        <View style={{margin:7}} />
        <Button
          onPress={() => {
            let self = this;
            client.query({
              query: getUser,
              variables: {
                email: this.state.email,
                password: this.state.password
              }
            }).then(resp => {
              console.log(JSON.stringify(resp, null, 2), 'vvvvvbvbvbvbv ---- RESULT  LOGIN');
              if (resp.data.allUsers.length > 0) {
                let user = resp.data.allUsers[0];
                Object.assign(self.props.userStore.user, user);
                self.props.userStore.isLoggedIn = true;
                self.props.navigation.navigate('Home');
              }
            });

            //let self = this;
            //this.props.users({
            //  variables: {
            //    email: this.state.email,
            //    password: this.state.password
            //  }
            //}).then(res => {
            //  console.log(JSON.stringify(res.data.allUsers, null, 2), 'vvvvvbvbvbvbv ---- RESULT  LOGIN');
            //  //alert(`Product ${res.data.createProduct.name} was added.`);
            //  let user = res.data.allUsers;
            //  Object.assign(self.props.userStore.user, user);
            //  self.props.userStore.isLoggedIn = true;
            //  self.props.navigation.navigate('Home');
            //})


            }
          }
          title="Submit"
        />
        {
          !this.props.userStore.user.id &&
            <Text opacity={0.5} style={styles.smallLink} onPress={() => {navigate('SignUp')}}>
              Sign Up
            </Text>
        }
        </View>
      </ScrollView>
    )
  }

}

//const ConnectedLogin = compose(
//  graphql(allUsers, {name: 'users'})
//)(Login);

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
    shadowOpacity: 0.25
  },
  icon: {
    color: '#fff'
  },
  smallLink: {
    color:'#42A5F5',
    textAlign:'center',
    fontSize: 11,
    marginTop: 10
  },
  input: {
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center',
    color: '#42A5F5'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
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
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export {
  Login as Login
}