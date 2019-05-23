import React, { Component } from 'react';
import { FlatList, View, Text, Button, StyleSheet } from 'react-native';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components/native';
import debounce from 'lodash.debounce';

import SearchInput from '../components/SearchInput';
import ListItem from '../components/ListItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import {getProducts} from '../graphql/queries';
import {deleteProduct} from '../graphql/mutations';
import type { SearchStore } from '../types';
import {Grid, Col, Row} from 'react-native-elements';

//import { graphql } from 'react-apollo';
import client from '../utils/client';
import { fromPromise } from 'mobx-utils';

import {graphql, compose} from 'react-apollo';
import { gql } from 'graphql-tag';


class Product extends Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      allProducts: React.PropTypes.object,
      deleteProduct: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  renderFlatListItem = (item, index) => {
    let evenRow = ((index+1) % 2) == 0;
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.column, evenRow && styles.secondColor, {flex:0.4}]}>{item.name}</Text>
        <Text style={[styles.column, evenRow && styles.secondColor, {flex: 0.2}]}>{item.capacity}</Text>
        <Text style={[styles.column, evenRow && styles.secondColor, {flex: 0.2}]}>{item.type}</Text>
        <Text
          style={[styles.column, evenRow && styles.secondColor, {flex:0.13}]}
          onPress={(e) => {
              e.preventDefault();
              this.navigation.navigate('CreateProduct', {id: item.id});
            }
          }
        >
          Edit
        </Text>
        <Text
          style={[styles.column, evenRow && styles.secondColor, {flex:0.13}]}
          onPress={(e) => {
            e.preventDefault();
            this.props.deleteProduct({
              variables: {id: item.id},
              update: (proxy, { data: { deleteProduct } }) => {
                let data = proxy.readQuery({ query: getProducts });
                data.allProducts.forEach((product, index, object)=> {
                  if (product.id === deleteProduct.id) {
                    object.splice(index, 1);
                  }
                });
                proxy.writeQuery({
                  query: getProducts,
                  data
                });
              },
            }).then( res => {
              alert('Deleted');
              res.resolve();
            });

            return false;
          }}
        >
          Remove</Text>
      </View>
    )
  };

  render ()
  {
    //let data = this.props.data.allProducts;

    return (
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
              <Text style={[styles.headerColumn, {flex: 0.4}]}>Name</Text>
              <Text style={[styles.headerColumn, {flex: 0.2}]}>Capacity</Text>
              <Text style={[styles.headerColumn, {flex: 0.2}]}>Type</Text>
              <Text style={[styles.headerColumn, {flex: 0.13}]}>Edit</Text>
              <Text style={[styles.headerColumn, {flex: 0.15}]}>Remove</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              data={this.props.data.allProducts}
              keyExtractor={item => item.key}
              renderItem={({item, index}) => this.renderFlatListItem(item, index) } //renderFlatListItem(item)
            />
          </View>
      </View>
    );
  };
}

/*
 update: (store, { data: { deleteFoo } }) => {
 const data = store.readQuery({query: fooQuery() }); // the GraphQL query is returned by the function fooQuery
 const index = data.allFoos.edges.findIndex(edge => edge.node.id === this.props.id);
 if (index > -1) {
 data.allFoos.edges.splice(index, 1);
 }
 store.writeQuery({ query: fooQuery(), data });
 }
 */

const ConnectedProduct = compose(
  graphql(getProducts),
  graphql(
    deleteProduct,
    {
      name: 'deleteProduct',
    }
  )
)(Product);

const PostListWithData = graphql(getProducts, {
  props: ({data: { loading, allProducts }}) => ({
    loading,
    allProducts,
  }),
})(Product);



class Recipe extends Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      allProducts: React.PropTypes.object,
      deleteRecipe: React.PropTypes.func.isRequired,
    }).isRequired,
  };


  render() {
    console.log('BBBBB', this.props);
    return (
      <View>
        <Text>
          THIS IS THE RECIPE SCREEN!
        </Text>
        <Button
          onPress={() => props.navigation.goBack()}
          title="Go back home"
        />
      </View>
    );
  }
};
//Recipe.

const ConnectedRecipe = graphql(getProducts)(Recipe);



const Tag = ()  => {
  return (
    <View >
      <Text >
        THIS IS THE TAG SCREEN!
      </Text>
    </View>
  );
};

ConnectedProduct.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    borderWidth: 1,
    borderBottomColor: 'white',
    flexDirection: 'row',
    backgroundColor: '#2E8B57',
    height: 50
  },
  title: `${navigation.state.routeName}`,
  headerRight: <Button
    title= '+'
    style={{fontSize: 16}}
    onPress={() => navigation.navigate('CreateProduct', {productId: null})}
    color='#fff'
  />,
  headerTintColor: 'white',
  headerBackTitle: null
});

Recipe.navigationOptions = ({ navigation }) => ({
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
  column: {
    //width: 80,
    textAlign:'center',
    height: 20,
    backgroundColor: '#FFFFE0',
  },
  headerColumn: {
    //width: 85,
    textAlign:'center',
    height: 30,
    backgroundColor: '#FFA500',
  },
  secondColor: {
    backgroundColor: '#FFEBCD',
  }
});

/*
export default compose(
  graphql(mutation1, { name: 'createSomething' }),
  graphql(mutation2, { name: 'deleteSomething' }),
)(Component)
*/

export {
  ConnectedProduct as Product,
  ConnectedRecipe as Recipe,
  Tag,
};