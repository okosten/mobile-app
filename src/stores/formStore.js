import { observable, action, extendObservable, computed } from 'mobx';
import { inject } from 'mobx-react';
import { Alert } from 'react-native';
import {productSchema, recipeSchema, errorSchema} from '../utils/typeSchema';
import {createProduct, createRecipe} from '../graphql/mutations';
import {getProduct} from '../graphql/queries';
import validateSchema from '../utils/validateSchema';
import client from '../utils/client';

class FormStore {

  constructor() {
    //this.entity = null;
  }

  @action
  setEntity(entity) {
    console.log('entity111', entity);
    this.entity = entity;
    extendObservable(this.entityObject.data, this.entityObject.schema);
  }

  @observable
    product = productSchema();
  @observable
    entity = null;
  @observable
    productErrors = productSchema();
  @observable
    recipe = recipeSchema();
  @observable
    recipeErrors = recipeSchema();

  @action
    setValue(node, value) {
      if (node && node in this.entityObject.data) {
        this.entityObject.data[node] = value;
      }
  }

  @computed get entityObject() {
    if (this.entity) {
      switch (this.entity) {
        case 'product':
          return {
            data: this.product,
            schema: productSchema(),
            insertQuery: createProduct,
            errors: this.productErrors
          };
        break;
        case 'recipe':
          return {
            data: this.recipe,
            schema: recipeSchema(),
            insertQuery: createRecipe,
            errors: this.recipeErrors
          };
          return this.recipe;
        break;
        case 'tag':
          return this.tag;
        break;
      }
    }
  }

  @action
    setProducts(data) {
      this.recipe.products = data;
    }

  @action
    clearListingErrors() {
      extendObservable(this.entityObject.errors, this.entityObject.schema);
    }

  @action
    setListingErrors(errors) {
      extendObservable(this.entityObject.errors, errors);
    }

  @action populate(data) {
    if (data) {
      extendObservable(this.entityObject.data, data);
    }
  }

  @action
    async submit(callback) {

    let {data, insertQuery} = this.entityObject;
    console.log('submitData-products', data.products);
    console.log('submitData-name', data.name);

    this.clearListingErrors();
    // Validate data from listing
    const isValid = validateSchema(errorSchema, data);
    if (isValid === true) {
      console.log('ISVALLLLLLL');
      return new Promise((resolve) => resolve({isValid: true}))
    } else {
      this.setListingErrors(isValid);
      return new Promise((resolve) => resolve({isValid: false}))
    }
  }

  @action
  getEntityById(id) {
    try {
      this.product = client.query({
        query: getProduct,
        variables: {id: id}
      }).then(resp => {
        if (resp.data) {
          this.product.name = resp.data.Product.name;
        }
      });
    } catch (e) {
      Alert.alert('Connection error', 'Couldn\'t fetch the data.' + e);
    }
  }
}

export default FormStore;
