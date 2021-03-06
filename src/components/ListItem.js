/* @flow */

import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-vertical: 5;
`;

const Image = styled.Image`
  height: 24;
  width: 24;
`;

const Text = styled.Text`
  font-size: 16;
  margin-left: 10;
`;

type Props = {
  imageUrl: string,
  title: string,
  price: number
}

export default function ListItem(props: Props) {
  const { name, capacity, price } = props.data;
  return (
    <Container>
      <Image source={{ uri: imageUrl }} />
      <Text>{title}</Text>
      <Text>{price}</Text>
    </Container>
  );
}


