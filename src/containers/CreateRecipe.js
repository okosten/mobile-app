import React, { Component } from 'react';
import {FlatList, View, Text, Button, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import { observer, inject } from 'mobx-react';
import {allRecipes, getRecipe} from '../graphql/queries';
import {createRecipe} from '../graphql/mutations';
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

//@todo might remove store approach.
@inject('formStore')
@observer
class CreateRecipe extends Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Recipe: React.PropTypes.object,
      CreateRecipe: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({tintColor}) => (
      <MaterialIcons
        name="free-breakfast"
        size={22}
        style={[styles.icon]}
      >
      </MaterialIcons>
    ),
    tabBarLabel: 'Add Item',
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
    //tabBarVisible: false
  });

  state = { selectedProducts: [] };

  onSelectionsChange = (selectedProducts) => {
    // selectedProducts is array of { label, value }
    this.setState({ selectedProducts })
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.props.formStore.setEntity('recipe');
  }

  getSelectedProducts() {
    let selectedArray = [];
    if (this.state.selectedProducts.length > 0) {
      this.state.selectedProducts.forEach((product)=> {
        selectedArray.push(product.value);
      });
    }

    return selectedArray;
  }

  convertToSelectValue(data) {
    let values = [];
    data.forEach((item) => {
      values.push({
        label: item.name,
        value: item.name
      })
    });

    return values;
  }


  render () {
    console.log('PROPPPPSSS', this.props);
    let recipeErrors = this.props.formStore.recipeErrors;

    if (this.props.data && this.props.data.loading) {
      return (<Text>Loading...</Text>)
    } else {
      if (this.props.data && this.props.data.Recipe) {
        this.props.formStore.setValue('name', this.props.data.Recipe.name);
        let selectedData = this.convertToSelectValue(this.props.data.Recipe.products);
        //this.setState({selectedData});
      }
    }

    return (
      <ScrollView>
      <View style={styles.container}>
        <View>
          <FormLabel>Name</FormLabel>
          <FormInput
            onChangeText={(value) => {
              this.props.formStore.setValue("name", value)
            }}
            value={this.props.formStore.recipe.name}
            placeholder = "Name"
            placeholderTextColor = "#5F9495"
            style={styles.input}
          />
          <FormValidationMessage>{recipeErrors.name || ''}</FormValidationMessage>

          <SelectProduct
            selectedProducts={this.state.selectedProducts}
            onSelectProduct={this.onSelectionsChange}
            convertFunction={this.convertToSelectValue}
          >
          </SelectProduct>
        </View>

        <TouchableHighlight
          style={styles.submit}
          onPress={() => {
            let selectedProducts = this.getSelectedProducts();
            //this.props.formStore.setProducts(selectedProducts);
            let self = this;
            //this.props.formStore.submit().then((res) => {
            //  if (false && res.isValid === true) {
                self.props.createRecipe({
                  variables: {
                    name: self.props.formStore.recipe.name,
                    products: selectedProducts
                  },
                  update: (proxy, { data: { createRecipe } }) => {
                    const data = proxy.readQuery({ query: allRecipes });
                    data.allRecipes.push(createRecipe);
                    proxy.writeQuery({
                      query: allRecipes,
                      data
                    });
                  }
                }).then(res => {
                  alert(`Recipe ${res.data.createRecipe.name} was added.`);
                  self.props.navigation.navigate('RecipeList');
                })
              //}
            //});

          }}
          underlayColor='#5F9495'>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>
      </ScrollView>
    )
  }
}

const ConnectedCreateRecipe = compose(
  graphql(getRecipe, {
    skip: (props) => !(props.navigation.state.params),
    options:(props) => {
      return {
        variables: {
          id: props.navigation.state.params.recipeId
        }
      }
    }
  }),
  graphql(createRecipe, {
    name: 'createRecipe'
    //variables:(props) => {
    //  props.formStore.product;
    //},
    //options: {
    //  update: (proxy, { data: { createRecipe } }) => {
    //    const data = proxy.readQuery({ query: allRecipes });
    //    data.allRecipes.unshift(createRecipe);
    //    proxy.writeQuery({
    //      query: allRecipes,
    //      data
    //    });
    //  },
    //}
  })
)(CreateRecipe);

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
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5F9495',
    height: 35,
    marginRight:20,
    marginLeft:20,
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
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2E8B57',
    height: 50
  },
});

export {
  ConnectedCreateRecipe as CreateRecipe
}

/*
Create -> if prop ->
 */