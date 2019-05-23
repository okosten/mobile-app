import React, { Component } from 'react';
import { FlatList, View, Text, Button, StyleSheet } from 'react-native';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components/native';
import debounce from 'lodash.debounce';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import SearchInput from '../components/SearchInput';
import {Header} from 'react-native-elements'


const Manage = (props)  => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <FlatList
            data={[
              {key: 'Product'},
              {key: 'Recipe'},
              {key: 'Tag'},
            ]}
            renderItem={({item, key}) =>
              <View key={key} style={{
                borderWidth:1,
                margin: 5,
                borderColor: '#fff',
              }}>
                <Button
                  onPress={() => props.navigation.navigate(item.key)}
                  title={item.key}
                  color='red'
                />
              </View>
            }
          />
        </View>
      </View>
    );
};

Manage.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Manage',
  tabBarIcon: ({tintColor}) => (
    <MaterialIcons
      name="menu"
      size={22}
      style={[styles.icon]}
    >
    </MaterialIcons>
  ),
  headerStyle: {
    borderWidth: 1,
    borderBottomColor: 'white',
    flexDirection: 'row',
    backgroundColor: '#2E8B57',
    height: 50
  },
  title: `${navigation.state.routeName}`,
  headerTintColor: 'white',
  headerBackTitle: null
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E6',
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
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: '#ffffff'
  },
});

export default Manage;

