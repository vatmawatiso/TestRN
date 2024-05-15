import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {allLogo} from '../../Assets';
import {toDp} from '../../Helpers/PercentageToDP';
import NavigatorService from '../../Helpers/NavigatorServices';
import axios from 'axios';
// import SelectDropdown from 'react-native-select-dropdown';
import Kembali from '../../Component/Kembali';
// import LinearGradient from 'react-native-linear-gradient';

const Film = props => {
  const [state, setState] = useState({
    genre: [],
    genreId: '',
    movie: [],
    image: true,
  });

  // get All Planet
  const getList = () => {
    axios
      .get('https://swapi.dev/api/planets/', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmMzMTdlZDNjMGYyMjVlNGQyZjk2Y2Q2MzZmZGQyYyIsInN1YiI6IjY1MWUzYzY2ZjA0ZDAxMDEzOTRhYjlkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gwt0pSuZTRCPXhayzYd05Fdb7nyqIY5SLXvBf4mvLa4',
        },
      })
      .then(res => {
        // console.log('Hasil Planet All = ', res.data);
        if (res.status == 200) {
          setState(state => ({
            ...state,
            genre: res.data.results,
          }));
          // console.log('hasil planet = ', state.genre);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const Detail = (
    climate,
    diameter,
    gravity,
    name,
    rotation_period,
    population,
    orbital_period,
    surface_water,
    terrain,
    url,
    films,
    index,
  ) => {
    NavigatorService.navigate('DetailFilm', {
      climate: climate,
      diameter: diameter,
      gravity: gravity,
      name: name,
      rotation_period: rotation_period,
      population: population,
      orbital_period: orbital_period,
      surface_water: surface_water,
      terrain: terrain,
      url: url,
      films: films,
      index: index,
    });
  };

  const Detailmovie = (item, index) => {
    // console.log('cek item  ==> ', item);
    // console.log('cek film  ==> ', item.films);
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.btnMovie}
          onPress={() =>
            Detail(
              item.climate,
              item.diameter,
              item.gravity,
              item.name,
              item.rotation_period,
              item.population,
              item.orbital_period,
              item.surface_water,
              item.terrain,
              item.url,
              item.films,
              index,
            )
          }>
          <View style={styles.bodyDetail}>
            <Image
              source={allLogo.nm_planet}
              style={{
                width: toDp(135),
                height: toDp(150),
                borderRadius: toDp(5),
              }}
            />
          </View>
          <View style={{margin: toDp(5)}}>
            <Text
              style={{
                fontSize: toDp(18),
                color: '#FFF',
                width: toDp(150),
                fontWeight: 'bold',
              }}>
              Planet {item.name}
            </Text>

            <View
              style={{
                borderWidth: 0.5,
                width: toDp(100),
                borderColor: '#FFF',
                flexDirection: 'row',
              }}>
              <Text style={{textAlign: 'center', color: '#FFF'}}>
                Periode Rotasi
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#eb8c74',
                  backgroundColor: '#FFF',
                  width: toDp(25),
                  left: toDp(5),
                }}>
                {item.rotation_period}
              </Text>
            </View>

            <View style={{flexDirection: 'row', top: toDp(5)}}>
              <Text style={{color: '#FFF'}}>Diameter </Text>
              <Text
                style={{
                  fontSize: toDp(13),
                  color: '#FFF',
                  width: toDp(150),
                  fontWeight: 'bold',
                  backgroundColor: '#FFF',
                  width: toDp(50),
                  textAlign: 'center',
                  color: '#eb8c74',
                  justifyContent: 'center',
                }}>
                {item.diameter}
              </Text>
            </View>

            <Text
              style={{
                fontSize: toDp(16),
                color: '#F6F1F1',
                width: toDp(150),
              }}>
              {item.release_date}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Kembali
        title={'Movie'}
        onPress={() => props.navigation.navigate('Homepage')}
      />

      <FlatList
        contentContainerStyle={{
          justifyContent: 'space-between',
          // backgroundColor: '#000000',
        }}
        numColumns={2}
        data={state.genre}
        renderItem={({item, index}) => {
          return Detailmovie(item, index);
        }}
        ListFooterComponent={() => (
          <View style={{height: toDp(120), width: toDp(30)}} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtFilm: {
    color: '#FFF',
    marginTop: toDp(10),
    fontSize: toDp(15),
  },
  card: {
    bottom: toDp(5),
    backgroundColor: '#3a3a4f',
    borderRadius: toDp(10),
    minHeight: toDp(220),
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: toDp(8),
    // opacity: 0.7,
    width: '46%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: toDp(10),
    alignItems: 'center',
    marginHorizontal: toDp(3.5),
  },
  bodyDetail: {
    bottom: toDp(1),
    height: toDp(170),
    width: toDp(163),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderRadius: toDp(10),
    borderTopLeftRadius: toDp(10),
    borderTopRightRadius: toDp(10),
  },
});

export default Film;
