/* @flow */

import React from 'react';
import styled from 'styled-components/native';

export default function NavScreen(navigation, banner) {
  return (
    <ScrollView>
      <SampleText>{banner}</SampleText>
      <Button
        onPress={() => navigation.navigate('Home', { name: 'Jordan' })}
        title="Open profile screen"
      />
      <Button
        onPress={() => navigation.navigate('CreateItem')}
        title="Open notifications screen"
      />
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </ScrollView>
  );
}
