import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components/native';
import debounce from 'lodash.debounce';

import SearchInput from '../components/SearchInput';
import ListItem from '../components/ListItem';
import NavScreen from '../components/NavScreen';

import type { SearchStore } from '../types';

type Props = {
  searchStore: SearchStore;
};

const Container = styled.View`
  margin: 15px;
`;

@inject('searchStore')
@observer
export default class Home extends Component {
  props: Props;
  @observable query = '';

  static navigationOptions = {
    title: 'Vegetables',
  }

  debounceInput = debounce((query) => { this.props.searchStore.getList(query); }, 500);

  onTextInputChange = (value: string) => {
    this.query = value;
    this.debounceInput(value);
  }

  render() {
    return (
      <Container>
        <SearchInput
          value={this.query}
          onChangeText={(value) => { this.onTextInputChange(value); }}
          placeholder="Search..."
        />
        {this.props.searchStore.vegetables && (
          <FlatList
            data={this.props.searchStore.vegetables}
            renderItem={({ item }) => (
              <ListItem
                imageUrl={item.url && item.url}
                title={item.title}
                price={item.price}
              />
            )}
          />
        )}
      </Container>
    );
  }
}