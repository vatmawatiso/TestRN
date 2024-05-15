import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {allLogo} from '../../Assets';
import {toDp} from '../../Helpers/PercentageToDP';
import NavigatorService from '../../Helpers/NavigatorServices';
import Kembali from '../../Component/Kembali';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wishlist = props => {
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
    planetId: '',
    urll: '',
    films: '',
    residents: '',
    datas: '',
    urlWish: '',
    id_url: '',
  });

  useEffect(() => {
    AsyncStorage.getItem('id')
      .then(url => {
        let idURL = url;
        setState(state => ({
          ...state,
          id_url: idURL,
        }));
        console.log('id URL = ', state.id_url);
        let id = state.id_url;
        console.log(id);
      })
      .catch(err => {
        console.log('err', err);
      });

    getWislistPerID();
    // getWislistPer();
  }, []);

  // get All Planet
  const getWislistPer = () => {
    axios
      .get('https://swapi.dev/api/planets/', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmMzMTdlZDNjMGYyMjVlNGQyZjk2Y2Q2MzZmZGQyYyIsInN1YiI6IjY1MWUzYzY2ZjA0ZDAxMDEzOTRhYjlkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gwt0pSuZTRCPXhayzYd05Fdb7nyqIY5SLXvBf4mvLa4',
        },
      })
      .then(res => {
        console.log('Hasil Planet All = ', res.data);
        if (res.status == 200) {
          setState(state => ({
            ...state,
            datas: res.data.results,
          }));
          console.log('hasil planet = ', state.datas);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // get data per id
  const getWislistPerID = () => {
    AsyncStorage.getItem('id').then(url => {
      let id = url;
      console.log('cek id = ', id);
      axios
        .get('https://swapi.dev/api/planets/1/', {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmMzMTdlZDNjMGYyMjVlNGQyZjk2Y2Q2MzZmZGQyYyIsInN1YiI6IjY1MWUzYzY2ZjA0ZDAxMDEzOTRhYjlkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gwt0pSuZTRCPXhayzYd05Fdb7nyqIY5SLXvBf4mvLa4',
          },
        })
        .then(res => {
          console.log('Hasil Planet All = ', res.data);
          if (res.status == 200) {
            setState(state => ({
              ...state,
              dataswis: res.data.result,
            }));
            console.log('hasil planet = ', state.dataswis);
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  const renderData = (item, index) => {
    console.log('cek item  ==> ', item);
    console.log('cek film  ==> ', item.name);
    return (
      <View style={styles.card}>
        <Text>hmmmmm</Text>
        <TouchableOpacity style={styles.btnMovie}>
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
                color: '#eb8c74',
                width: toDp(150),
                fontWeight: 'bold',
              }}>
              Planet {item.name}
            </Text>

            <View
              style={{
                borderWidth: 0.5,
                width: toDp(100),
                borderColor: '#eb8c74',
                flexDirection: 'row',
              }}>
              <Text style={{textAlign: 'center', color: '#eb8c74'}}>
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
              <Text style={{color: '#eb8c74'}}>Diameter </Text>
              <Text
                style={{
                  fontSize: toDp(13),
                  color: '#eb8c74',
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
        title={'Wishlist'}
        onPress={() => props.navigation.navigate('DetailFilm')}
      />

      <Text style={{color: 'white'}}>cobaaa</Text>

      {/* <SafeAreaView style={styles.container}>
        <FlatList
          data={state.datas}
          keyExtractor={state.id_url}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      </SafeAreaView> */}

      <FlatList
        contentContainerStyle={{
          justifyContent: 'space-between',
          // backgroundColor: '#000000',
        }}
        numColumns={2}
        data={state.datas}
        renderItem={({item, index}) => {
          return renderData(item, index);
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
  card: {
    bottom: toDp(5),
    backgroundColor: '#FFF',
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

export default Wishlist;
