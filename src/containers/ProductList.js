import React, { Component } from 'react';
import { FlatList, View, Text, Button, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import {getProducts} from '../graphql/queries';
import {deleteProduct} from '../graphql/mutations';

import {graphql, compose} from 'react-apollo';
import { gql } from 'graphql-tag';


class ProductList extends Component {

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
        <Text style={[styles.column, evenRow && styles.secondColor, {flex:0.4, textAlign: 'left'}]}>{item.name}</Text>
        <Text style={[styles.column, evenRow && styles.secondColor, {flex: 0.2}]}>{item.capacity}</Text>
        <Text style={[styles.column, evenRow && styles.secondColor, {flex: 0.1}]}>{item.type}</Text>
        <Text
          style={[styles.column, evenRow && styles.secondColor, {flex:0.15}]}
          onPress={(e) => {
            e.preventDefault();
            this.navigation.navigate('CreateProduct', {productId: item.id});
          }
            }
        >
          Edit
        </Text>
        <Text
          style={[styles.column, evenRow && styles.secondColor, {flex:0.15}]}
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
              //res.resolve();
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
          <Text style={[styles.headerColumn, {flex: 0.4, textAlign:'left'}]}>Name</Text>
          <Text style={[styles.headerColumn, {flex: 0.2}]}>Capacity</Text>
          <Text style={[styles.headerColumn, {flex: 0.1}]}>Type</Text>
          <Text style={[styles.headerColumn, {flex: 0.15}]}>Edit</Text>
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

const ConnectedProductList = compose(
  graphql(getProducts),
  graphql(
    deleteProduct,
    {
      name: 'deleteProduct',
    }
  )
)(ProductList);


ConnectedProductList.navigationOptions = ({ navigation }) => ({
  tabBarIcon: ({tintColor}) => (
    <MaterialIcons
      name="restaurant"
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
  headerRight: <MaterialIcons
    name="add"
    onPress={() => navigation.navigate('CreateProduct')}
    size={24}
    style={[styles.icon, {margin: 10}]}
  >
  </MaterialIcons>,
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

export {
  ConnectedProductList as ProductList,
  };

