import axios from 'axios';
import { observable, action } from 'mobx';
import { Alert } from 'react-native';
import client from '../utils/client';
import {queries} from '../graphql';
import {getProducts} from '../graphql/queries';

import { fromPromise } from 'mobx-utils';

//const API_URL: string = 'https://api...';

export default class SearchStore {

  constructor() {
  }



}
