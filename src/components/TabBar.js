import React, { Component } from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Animated,
  } from 'react-native';
import { TabBarBottom, TabBarIcon, addNavigationHelpers } from 'react-navigation';

import PropTypes from 'prop-types';

export default class TabBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      navigation,
      renderIcon,
      activeTintColor,
      inactiveTintColor,
      jumpToIndex,
      style,
      labelStyle
      } = this.props;
    const { routes, index } = this.props.navigationState;


    console.log('@@@@@@@@@@@@@ PROPS', navigation);

    // Allowed screens for the "Create" tab in the TabBarNavigator.
    const createButtonScreens = ['Recipe', 'Product', 'Tag'];

    // Gets the current screen from navigation state
    function getCurrentRouteName(navigationState) {
      if (!navigationState) {
        return null;
      }


      const route = navigationState.routes[navigationState.index];
      // dive into nested navigators
      if (route.routes) {
        return getCurrentRouteName(route);
      }
      return route.routeName;
    }

    let currentScreen = getCurrentRouteName(this.props.navigationState);
    // Define route to the create page dynamically. For the entities like Product, Recipe and Tag.
    //let CustomRoute = false;

    return (
      <View style={styles.tabContainer}>

        {routes.map((route: NavigationRoute, idx: number) => {

          //const childNavigation = addNavigationHelpers({
          //  ...navigation,
          //  state: route,
          //});

          // Add create tab only for the screens which have ability to create new item.
          if ('Create' === route.routeName && -1 == createButtonScreens.indexOf(currentScreen)) {
            return null;
          }
          let CustomRoute = ('Create' == route.routeName) ? `Create${currentScreen}` : route.routeName;

          //console.log('QQQ CustomRoute ', CustomRoute);

          //let customKey = (-1 != createButtonScreens.indexOf(route.routeName)) ? `Create${route.routeName}` : route.routeName;


          //let routeName = ('Create' == route.routeName) ? CustomRoute : route.routeName;

          const focused = idx === navigation.state.index;
          const color = index === idx ? '#fff' : '#fff';
          const tintColor = focused ? activeTintColor : inactiveTintColor;

          return (
            <TouchableOpacity
              onPress={() => jumpToIndex(idx)}
              style={styles.tab}
              key={`${CustomRoute}${idx}`}
            >
              <View >
                {renderIcon({
                  route,
                  idx,
                  focused,
                  tintColor
                })}
              </View>
              <Text style={[styles.label, { color }]}>
                {route.routeName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  tabContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#2E8B57',
    borderRadius: 4,
  },
  tabBar: {
    height: 50,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .3)',
    backgroundColor: '#F7F7F7',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    //backgroundColor: '#2E8B57',
  },
});

TabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  navigationState: PropTypes.object.isRequired,
};