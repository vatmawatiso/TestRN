import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {allLogo} from '../../Assets';
import {toDp} from '../../Helpers/PercentageToDP';
import NavigatorService from '../../Helpers/NavigatorServices';
import Kembali from '../../Component/Kembali';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import LinearGradient from 'react-native-linear-gradient';

const DetailFilm = props => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [state, setState] = useState({
    climate: '',
    diameter: '',
    gravity: '',
    name: '',
    rotation_period: '',
    population: '',
    orbital_period: '',
    surface_water: '',
    terrain: '',
    index: '',
    planetId: '',
    urll: '',
    films: '',
    residents: '',
    selected: false,
    urlWish: '',
    id_url: '',
  });

  useEffect(() => {
    getPlanetId();

    setState(state => ({
      ...state,
      urll: props.navigation.state.params.url,
      films: props.navigation.state.params.films,
    }));
    // console.log('films --->' + props.navigation.state.params.films);
    // console.log(' URL  --->' + props.navigation.state.params.url);
  }, []);

  // get Planet Per Id
  const getPlanetId = () => {
    let urlplanet = props.navigation.state.params.url;
    let url = urlplanet.charAt(urlplanet.length - 2);
    // console.log('cek hasil cut = ', url);
    axios
      .get('https://swapi.dev/api/planets/' + url, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmMzMTdlZDNjMGYyMjVlNGQyZjk2Y2Q2MzZmZGQyYyIsInN1YiI6IjY1MWUzYzY2ZjA0ZDAxMDEzOTRhYjlkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gwt0pSuZTRCPXhayzYd05Fdb7nyqIY5SLXvBf4mvLa4',
        },
      })
      .then(res => {
        // console.log('Hasil Planet ID = ', res.data.result);
        if (res.status == 200) {
          setState(state => ({
            ...state,
            planetId: res.data,
            climate: res.data.climate,
            diameter: res.data.diameter,
            gravity: res.data.gravity,
            name: res.data.name,
            rotation_period: res.data.rotation_period,
            population: res.data.population,
            orbital_period: res.data.orbital_period,
            surface_water: res.data.surface_water,
            films: res.data.films,
            residents: res.data.residents,
            urlWish: res.data.url,
          }));
          // console.log('hasil planet all = ', state.planetId);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SelectWishlist = () => {
    let urlplanet = props.navigation.state.params.url;
    let url = urlplanet.charAt(urlplanet.length - 2);
    console.log('cek hasil cut = ', url);
    AsyncStorage.setItem('id', url);
    // NavigatorService.navigate('Wishlist', {
    //   url: url,
    // });
  };

  return (
    <View style={styles.container}>
      <Kembali title={'Details'} onPress={() => props.navigation.goBack()} />
      <View style={styles.bodyIMG}>
        <Image
          source={allLogo.nm_planet}
          style={{
            width: toDp(280),
            height: toDp(280),
            borderRadius: toDp(20),
          }}
        />
      </View>
      <View style={styles.bodyTitle}>
        <Text style={{color: '#c9c9ce', fontSize: toDp(20)}}>The Planet</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.txtTitle}>{state.name}</Text>
          <TouchableOpacity onPress={() => SelectWishlist()}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#FFF',
                width: toDp(45),
                height: toDp(45),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: toDp(30),
                marginRight: toDp(30),
                backgroundColor: '#FFF',
              }}>
              <Image
                source={allLogo.black}
                style={{
                  width: toDp(35),
                  height: toDp(30),
                }}></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          borderWidth: 0.6,
          borderColor: '#c9c9ce',
          width: toDp(320),
          marginHorizontal: toDp(20),
          marginTop: toDp(10),
        }}></View>

      <View style={styles.bodyOverview}>
        <Text
          style={{
            color: '#c9c9ce',
            marginBottom: toDp(15),
            fontSize: toDp(20),
          }}>
          The planet Tatooine has a rotation period of {state.rotation_period}{' '}
          and an orbital period of {state.orbital_period}, the planet{' '}
          {state.name} also has a diameter of {state.diameter} with a{' '}
          {state.climate} climate and has a gravity of {state.gravity}, the
          planet {state.name} also has a {state.terrain} terrain and surface
          water of {state.surface_water}
          and has a population of {state.population}
        </Text>
      </View>

      <View
        style={{
          borderWidth: 0.6,
          borderColor: '#c9c9ce',
          width: toDp(320),
          marginHorizontal: toDp(20),
          marginTop: toDp(10),
        }}></View>

      <View style={styles.bodyOverview}>
        <TouchableOpacity onPress={() => NavigatorService.navigate('Wishlist')}>
          <Text style={{color: '#FFF'}}>Tombol Wish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a32',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  txtSynopsis: {
    fontWeight: '500',
    fontSize: toDp(15),
    color: 'white',
    fontFamily: 'oleo script',
  },
  txtOverview: {
    fontSize: toDp(15),
  },
  bodyIMG: {
    alignItems: 'center',
  },
  bodyTitle: {
    marginLeft: toDp(30),
    marginTop: toDp(25),
  },
  txtTitle: {
    fontSize: toDp(50),
    fontWeight: 'bold',
    color: '#FFF',
    maxWidth: toDp(290),
  },
  bodyOverview: {
    marginLeft: toDp(30),
    marginTop: toDp(25),
    maxWidth: toDp(310),
  },
});

export default DetailFilm;
