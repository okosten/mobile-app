import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import styled from 'styled-components/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import {allRecipes} from '../graphql/queries';
import {deleteRecipe} from '../graphql/mutations';

import {graphql, compose} from 'react-apollo';
import { gql } from 'graphql-tag';


class RecipeList extends Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      allRecipes: React.PropTypes.object,
      deleteRecipe: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;

  }

  renderFlatListItem = (item, index) => {
    let evenRow = ((index+1) % 2) == 0;
    return (
      <View style={[{flexDirection: 'row'}, evenRow && styles.secondColor]}>
        <Text style={[styles.column, evenRow && styles.secondColor, {flex:0.4}]}>{item.name}</Text>
        <View style={[styles.column, evenRow && styles.secondColor, {flex:0.4}]}>
          <Text>{`${item.products.join(', ')}`}</Text>
        </View>
        <TouchableHighlight
          style={[styles.column, evenRow && styles.secondColor, {flex:0.10,backgroundColor:'#6B8E23'}]}
          onPress={(e) => {
            e.preventDefault();
            this.navigation.navigate('CreateRecipe', {recipeId: item.id});
          }}
        >
        <Text>
          Edit
        </Text>
        </TouchableHighlight>
        <Text
          style={[styles.column, evenRow && styles.secondColor, {flex:0.1, backgroundColor:'#A52A2A'}]}
          onPress={(e) => {
            e.preventDefault();
            this.props.deleteRecipe({
              variables: {id: item.id},
              update: (proxy, { data: { deleteRecipe } }) => {
                let data = proxy.readQuery({ query: allRecipes });
                data.allRecipes.forEach((recipe, index, object)=> {
                  if (recipe.id === deleteRecipe.id) {
                    object.splice(index, 1);
                  }
                });
                proxy.writeQuery({
                  query: allRecipes,
                  data
                });
              }
            }).then( res => {
              alert('Deleted');
            });

            return false;
          }}
        >
          Rem</Text>
      </View>
    )
  };

  render ()
  {
    if (this.props.data && this.props.data.loading) {
      return (<Text>Loading...</Text>)
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.headerColumn, {flex: 0.4}]}>Name</Text>
          <Text style={[styles.headerColumn, {flex: 0.45}]}>Recipe Composition</Text>
          <Text style={[styles.headerColumn, {flex: 0.10}]}></Text>
          <Text style={[styles.headerColumn, {flex: 0.10}]}></Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            data={this.props.data.allRecipes}
            keyExtractor={item => item.key}
            renderItem={({item, index}) => this.renderFlatListItem(item, index) } //renderFlatListItem(item)
          />
        </View>
      </View>
    );
  };
}

const ConnectedRecipeList = compose(
  graphql(allRecipes),
  graphql(
    deleteRecipe,
    {
      name: 'deleteRecipe',
    }
  )
)(RecipeList);


ConnectedRecipeList.navigationOptions = ({ navigation }) => ({
  tabBarIcon: ({tintColor}) => (
    <MaterialIcons
      name="book"
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
    onPress={() => navigation.navigate('CreateRecipe')}
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
    textAlign:'center',
    height: 30,
    backgroundColor: '#FFFFE0',
    borderWidth: 1,
    borderColor: '#FFDEAD',
  },
  headerColumn: {
    //width: 85,
    textAlign:'center',
    height: 30,
    backgroundColor: '#FF7F50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  secondColor: {
    backgroundColor: '#FFEBCD',
  }
});

export {
  ConnectedRecipeList as RecipeList,
  };

