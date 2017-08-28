import { StackNavigator } from 'react-navigation';

import Home from './containers/Home';
import CreateItem from './containers/CreateItem';

const stackNavigatorConfig = {
  initialRouteName: 'Home',
};

export default StackNavigator({
  Home: {
    screen: Home,
  },
  CreateItem: {
    screen: CreateItem
  }
}, stackNavigatorConfig);