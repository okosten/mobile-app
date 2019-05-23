import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import SelectMultiple from 'react-native-select-multiple'
import {allRecipes, getProducts} from '../graphql/queries';
import {graphql, compose} from 'react-apollo';
import { gql } from 'graphql-tag';

class RecipeList extends Component {

  static propTypes = {
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    products: React.PropTypes.object,
    recipes: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

  }

  intersect(arr1, arr2) {
    let arr3;
    // indexOf to loop over shorter
    if (arr2.length > arr1.length) {
      arr3 = arr2, arr2 = arr1, arr1 = arr3;
    }
    return arr1.filter(function (e) {
      return arr2.indexOf(e) > -1;
    });
  };

  possibleRecipeList = (recipes, products) => {
    let possibleRecipes = [];
    let existProducts = [];

    if (recipes && products) {
      // get Array of products.
      products.forEach((prod) => {
        existProducts.push(prod.name);
      });
      recipes.forEach((recipe) => {
        let recipeProducts = recipe.products; // [beet, carrot]
        let intersection = this.intersect(recipe.products, existProducts);
        if (recipeProducts.length > 0 && (recipeProducts.length == intersection.length)) {
          possibleRecipes.push(recipe);
        }
      });
    }

    return possibleRecipes;
  };

  renderItem(item, index) {
    return (
      <View style={styles.row} key={index}>
        <Text style={{fontSize: 20, color:"#191970"}}>{item.name}</Text>
        <Text style={{fontSize: 14, color:"#4682B4"}}>{` (${item.products.join(', ')})`}</Text>
      </View>
    )
  }

  render () {
    if (this.props.data && this.props.data.loading) {
      return (<Text>Loading...</Text>)
    }
    let products = this.props.products.allProducts;
    let recipes = this.props.recipes.allRecipes;
    let possibleRecipeList = this.possibleRecipeList(recipes, products);

    return (
      <View style={{flexDirection: 'row'}}>
        <FlatList
          data={possibleRecipeList}
          keyExtractor={item => item.key}
          renderItem={({item, index}) => this.renderItem(item, index) }
        />
      </View>
    )
  }
}

const ConnectedRecipeList = compose(
  graphql(getProducts, {name: 'products'}),
  graphql(allRecipes, {name: 'recipes'})
)(RecipeList);

export {
  ConnectedRecipeList as RecipeList
}


let styles = StyleSheet.create({
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


