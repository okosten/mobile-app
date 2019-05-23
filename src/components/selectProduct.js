import React, { Component } from 'react'
import { View, Text } from 'react-native'
import SelectMultiple from 'react-native-select-multiple'
import {allProductLists} from '../graphql/queries';
import {graphql} from 'react-apollo';
import { gql } from 'graphql-tag';

class SelectProduct extends Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      allProductLists: React.PropTypes.object,
      onSelectProduct: React.PropTypes.func,
      selectedProducts: React.PropTypes.array,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }


  render () {
    if (this.props.data && this.props.data.loading) {
      return (<Text>Loading...</Text>)
    }
    let allProductLists = this.props.convertFunction(this.props.data.allProductLists);

    return (
      <View>
        <SelectMultiple
          items={allProductLists}
          selectedItems={this.props.selectedProducts}
          onSelectionsChange={this.props.onSelectProduct}
        />
      </View>
    )
  }
}

const ConnectedSelectProduct = graphql(allProductLists)(SelectProduct);

export {
  ConnectedSelectProduct as SelectProduct
}