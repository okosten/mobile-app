/* @flow */

import axios from 'axios';
import { observable } from 'mobx';
import { Alert } from 'react-native';

//const API_URL: string = 'https://api...';

export default class SearchStore {
  @observable query = '';
  @observable vegetables = [{}];

  async getList(query: string) {
    if (!query) {
      this.vegetables = [{}];
      return;
    }
    try {
      //const requestURL = `${API_URL}?q=${query}&type=track&limit=10`;
      //const response = await axios.get(requestURL);
      this.vegetables = [
        {title: 'onion', price: 10},
        {title: 'beet', price: 8}
      ];
    } catch (e) {
      Alert.alert('Connection error', 'Couldn\'t fetch the data.' + e);
    }
  }
}
