import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components/native';
import debounce from 'lodash.debounce';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'

import SearchInput from '../components/SearchInput';
import ListItem from '../components/ListItem';
import {RecipeList} from '../components/RecipeList';
import {Login} from '../containers/Login';
import {Header} from 'react-native-elements'


const images = {
  home: require('../imgs/icon-house-black.png')
};

const Icon = styled.Image`
  width: 14px;
  height: 14px;
  display: none;
  color: #fff;
`;

@inject('userStore')
@observer
export default class Home extends Component {
  //props: Props;
  //@observable query = '';

  //static navigationOptions = ({ navigation }) => ({
  //  tabBarLabel: 'Home',
  //  tabBarIcon: ({tintColor}) => (
  //      <MaterialIcons
  //        name="home"
  //        size={22}
  //        style={[styles.icon]}
  //      >
  //      </MaterialIcons>
  //  ),
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
  //});


  isLoginPage = () => {
    {
      if (this.props.userStore.isLoggedIn)
        return <RecipeList
        />;
      else
        return <Login
          navigation={this.props.navigation}
        />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Header
            centerComponent={{ text: 'Home', style: { color: '#fff' } }}
            outerContainerStyles={styles.header}
            innerContainerStyles={{marginBottom: -8}}
          />
        </View>
        <View style={styles.content}>
          {this.isLoginPage()}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#2ca9e1',
    height: 50
  },
  icon: {
    color: '#fff'
  },
  content: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }

});