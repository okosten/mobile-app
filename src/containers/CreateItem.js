import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components/native';
import debounce from 'lodash.debounce';

import SearchInput from '../components/SearchInput';
import ListItem from '../components/ListItem';

import type { SearchStore } from '../types';

type Props = {
  searchStore: SearchStore;
};

const Container = styled.View`
  margin: 15px;
`;

@inject('searchStore')
@observer
export default class CreateItem extends Component {
  props: Props;
@observable query = '';

  static navigationOptions = {
    title: 'Create Product',
  }

  debounceInput = debounce((query) => { this.props.searchStore.getList(query); }, 500);

  onTextInputChange = (value: string) => {
    this.query = value;
    this.debounceInput(value);
  }

  render() {
    return (
      <Container>
        <View> There are no items</View>
      </Container>
    );
  }
}