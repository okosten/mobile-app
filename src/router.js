import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Home from './containers/Home';
import {Product, Recipe, Tag} from './containers/Items';
//import {CreateProduct} from './containers/CreateProduct';
import {ProductList} from './containers/ProductList';
import {RecipeList} from './containers/RecipeList';
import {CreateProduct} from './containers/CreateProduct';
import {CreateRecipe} from './containers/CreateRecipe';
import {Login} from './containers/Login';
import {Guest} from './containers/Guest';
import {CreateOffer} from './containers/CreateOffer';
import {SignUp} from './containers/SignUp';
import Manage from './containers/Manage';
import TabBar from './components/TabBar';
import { DrawerItems } from 'react-navigation';
import { NavigationActions } from 'react-navigation'

const tabNavigatorConfig = {
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: '#ADFF2F',
    showIcon: true,
    labelStyle: {
      fontSize: 12
    },
    style: {
      backgroundColor: '#2ca9e1'
    },
    tabStyle: {

    }
  }
};

export default ManageStack = new StackNavigator({
  Guest: {screen: Guest},
  Product: {screen: ProductList},
  Recipe: {screen: RecipeList},
  Tag: {screen: Tag},
  CreateProduct: {screen: CreateProduct},
  CreateRecipe: {screen: CreateRecipe},
  SignUp: {screen: SignUp},
  Login: {screen: Login},
  CreateOffer: {screen: CreateOffer},
  //Guest: {screen: Guest}
});

//const CreateItems = new StackNavigator({
//    CreateRecipe: {screen: CreateRecipe},
//},

//);

/*
const navReducer = (state, action) => {
  const newState = CreateItems.router.getStateForAction(action, state);

  return newState || state
};
*/

 MainMenu = new TabNavigator(
  {
    Home: {
      screen: Home
    },
    //Login: {
    //  screen: Login
    //},
    //SignUp: { screen: SignUp },
    //Create: {
    //  screen: CreateItems
    //},
    Menu: {
      screen: ManageStack
    }
  },
  tabNavigatorConfig
);

//const navigateOnce = (getStateForAction) => (action, state) => {
//  const {type, routeName} = action;
//  return (
//  state &&
//  type === NavigationActions.NAVIGATE &&
//  routeName === state.routes[state.routes.length - 1].routeName
//  ) ? null : getStateForAction(action, state);
//  // you might want to replace 'null' with 'state' if you're using redux (see comments below)
//};
//CreateItems.router.getStateForAction = navigateOnce(CreateItems.router.getStateForAction);
//CreateProduct.router.getStateForAction = navigateOnce(CreateProduct.router.getStateForAction);

//const defaultGetComponentForRouteName = CreateItems.router.getComponentForRouteName;
//CreateItems.router.getComponentForRouteName = (routeName) => {
//  console.log('+++++++++++++++++++ ROUTENAME', routeName);
//  if (routeName == 'CreateProduct') {
//    return defaultGetComponentForRouteName();
//  } else {
//    return defaultGetComponentForRouteName('CreateRecipe');
//  }
//};





/*
const defaultGetStateForAction = CreateItems.router.getStateForAction;

CreateItems.router.getStateForAction = (action, state) => {

  const {type, routeName} = action;

  console.log('+++++++++++++++++++ROUTE', CreateItems.router);
  console.log('+++++++++++++++++++action', routeName);
  console.log('+++++++++++++++++++state', state);

  //NavigationActions.navigate({ routeName: 'CreateRecipe' });

  if (false
    //(action.type === NavigationActions.NAVIGATE) &&
    //(action.routeName === "Create") &&
    //action.routeName == "CreateProduct" || action.routeName == "CreateRecipe"
  ) {
    return null;
  }

  return defaultGetStateForAction(NavigationActions.navigate({routeName: routeName}), state);
};
*/




/*
const defaultGetScreenOptions = CreateItems.router.getScreenOptions;

CreateItems.router.getScreenOptions = (navigation, screenProps) => {

  return defaultGetScreenOptions(navigation, screenProps);
} ;
*/


