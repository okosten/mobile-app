import React, { Component } from 'react';
import {FlatList, View, Text, Button, StyleSheet, TouchableHighlight} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js'
import { observer, inject } from 'mobx-react';
import {getProducts, getProduct} from '../graphql/queries';
import {createProduct} from '../graphql/mutations';
import {graphql, compose} from 'react-apollo';
import { gql } from 'graphql-tag';

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
class CreateProduct extends Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Product: React.PropTypes.object,
      CreateProduct: React.PropTypes.func.isRequired,
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

  constructor(props) {
    super(props);
    this.props.formStore.setEntity('product');
    console.log('PPPPP', this.props);
  }

  render () {

    let productErrors = this.props.formStore.productErrors;
    const component1 = () => <Text>Weight</Text>;
    const component2 = () => <Text>Quantity</Text>;

    const typeButtons = [
      { element: component1 },
      { element: component2 }
    ];

    if (this.props.data && this.props.data.loading) {
      return (<Text>Loading</Text>)
    } else {
      if (this.props.data && this.props.data.Product) {
        this.props.formStore.populate(this.props.data.Product);
      }
    }

    return (

      <View style={styles.container}>
        <View>
          <FormLabel>Name</FormLabel>
          <FormInput
            onChangeText={(value) => {
              this.props.formStore.setValue("name", value)
            }}
            value={this.props.formStore.product.name}
            placeholder = "Name"
            placeholderTextColor = "#5F9495"
            style={styles.input}
          />
          <FormValidationMessage>{productErrors.name || ''}</FormValidationMessage>

          <FormLabel>Capacity</FormLabel>
          <FormInput
            onChangeText={(val) => {
              this.props.formStore.setValue("capacity", parseFloat(val));
            }}
            value={`${this.props.formStore.product.capacity}`}
            keyboardType="numeric"
            style={styles.input}
          />
          <FormValidationMessage>{productErrors.capacity || ''}</FormValidationMessage>

          <FormLabel>Type</FormLabel>
          <ButtonGroup
            onPress={(val) => { this.props.formStore.setValue('type', val);}}
            selectedIndex={this.props.formStore.product.type}
            buttons={typeButtons}
            containerStyle={styles.groupBtnContainer}
            selectedBackgroundColor="#FAFAD2"
          />
          <FormValidationMessage>
            {productErrors.type || ''}
          </FormValidationMessage>
        </View>

        <TouchableHighlight
          style={styles.submit}
          onPress={() => {
            let self = this;
            this.props.formStore.submit().then((res) => {
              if (res.isValid === true) {
                self.props.createProduct({
                  variables: self.props.formStore.product,
                  update: (proxy, { data: { createProduct } }) => {
                    const data = proxy.readQuery({ query: getProducts });
                    data.allProducts.push(createProduct);
                    proxy.writeQuery({
                      query: getProducts,
                      data
                    });
                  }
                }).then(res => {
                  alert(`Product ${res.data.createProduct.name} was added.`);
                  self.props.navigation.navigate('ProductList');
                })
              }
            });

          }}
          underlayColor='#5F9495'>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>

      </View>
    )
  }
}

const ConnectedCreateProduct = compose(
  graphql(getProduct, {
    skip: (props) => !(props.navigation.state.params),
    options:(props) => {
      return {
        variables: {
          id: props.navigation.state.params.productId
        }
      }
    }
  }),
  graphql(createProduct, {
    name: 'createProduct',
    //variables:(props) => {
    //  props.formStore.product;
    //},
    //options: {
    //  update: (proxy, { data: { createProduct } }) => {
    //    console.log('SSSSSS', createProduct);
    //    const data = proxy.readQuery({ query: getProducts });
    //    data.allProducts.unshift(createProduct);
    //    proxy.writeQuery({
    //      query: getProducts,
    //      data
    //    });
    //  },
    //}
  })
)(CreateProduct);

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
    flex: 1,
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
  ConnectedCreateProduct as CreateProduct
}

/*
Create -> if prop ->
 */