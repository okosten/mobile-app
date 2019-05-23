import axios from 'axios';
import { observable, action } from 'mobx';
import { Alert } from 'react-native';
import client from '../utils/client';
import {userSchema} from '../utils/typeSchema';

import { fromPromise } from 'mobx-utils';

//const API_URL: string = 'https://api...';

export default class UserStore {

  constructor() {

  }

  user = userSchema();

@observable
  isLoggedIn = false;


}
