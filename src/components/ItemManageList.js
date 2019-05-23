import React from 'react';
import styled from 'styled-components/native';
import { FlatList, View } from 'react-native';

const Container = styled.View`
  margin: 15px;
`;

@inject('searchStore')
@observer
export default class ItemManageList extends Component {
  props: Props;


  render() {
    return (
      <Container>

        {this.props.searchStore.vegetables && (
        )}
      </Container>
    );
  }
}
