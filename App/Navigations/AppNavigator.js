import {createAppContainer} from 'react-navigation';
// import {createAppContainer} from '@react-navigation/native';
import {createStackNavigator} from 'react-navigation-stack';

import Home from '../Container/Home';
import Film from '../Container/Film';
import DetailFilm from '../Container/DetailFilm';
import Homepage from '../Container/Homepage';
import Wishlist from '../Container/Wishlist';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Film: {
      screen: Film,
    },
    DetailFilm: {
      screen: DetailFilm,
    },
    Homepage: {
      screen: Homepage,
    },
    Wishlist: {
      screen: Wishlist,
    },
  },
  {
    initialRouteName: 'Homepage',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
