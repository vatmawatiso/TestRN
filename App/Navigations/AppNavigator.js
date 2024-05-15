import {createAppContainer} from 'react-navigation';
// import {createAppContainer} from '@react-navigation/native';
import {createStackNavigator} from 'react-navigation-stack';

import Planets from '../Container/Planets';
import DetailPlanet from '../Container/DetailPlanet';
import Splashscreen from '../Container/Splashscreen';
import Wishlist from '../Container/Wishlist';

const AppNavigator = createStackNavigator(
  {
    Planets: {
      screen: Planets,
    },
    DetailPlanet: {
      screen: DetailPlanet,
    },
    Splashscreen: {
      screen: Splashscreen,
    },
    Wishlist: {
      screen: Wishlist,
    },
  },
  {
    initialRouteName: 'Splashscreen',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
