import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {allLogo} from '../../Assets';
import {toDp} from '../../Helpers/PercentageToDP';
import NavigatorService from '../../Helpers/NavigatorServices';
import Kembali from '../../Component/Kembali';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailPlanet = props => {
  const {url: urlplanet, films} = props.navigation.state.params;
  const [isWishlist, setIsWishlist] = useState(false);
  const [planetData, setPlanetData] = useState({
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
    urlWish: '',
  });

  useEffect(() => {
    getPlanetId();
    checkWishlist(urlplanet);
  }, [urlplanet]);

  const checkWishlist = async url => {
    const wishlist = await AsyncStorage.getItem('wishlist');
    // setIsWishlist(wishlist && JSON.parse(wishlist).includes(url));
    if (wishlist) {
      const wishlistArray = JSON.parse(wishlist);
      setIsWishlist(wishlistArray.includes(url));
    }
  };

  const getPlanetId = () => {
    const url = urlplanet.charAt(urlplanet.length - 2);
    axios
      .get('https://swapi.dev/api/planets/' + url)
      .then(res => {
        if (res.status === 200) {
          setPlanetData({
            ...res.data,
            planetId: res.data.url,
            urlWish: res.data.url,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleWishlist = async () => {
    const storedWishlist = await AsyncStorage.getItem('wishlist');
    let wishlistArray = storedWishlist ? JSON.parse(storedWishlist) : [];

    if (isWishlist) {
      wishlistArray = wishlistArray.filter(item => item !== urlplanet);
    } else {
      // wishlistArray.push({...planetData});
      wishlistArray.push({...(urlplanet && planetData)});
    }

    await AsyncStorage.setItem('wishlist', JSON.stringify(wishlistArray));
    setIsWishlist(!isWishlist);
  };

  return (
    <View style={styles.container}>
      <Kembali
        title={'Planets'}
        onPress={() => props.navigation.goBack()}
        style={styles.kembaliButton}
      />
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
          <Text style={styles.txtTitle}>{planetData.name}</Text>
          <TouchableOpacity onPress={toggleWishlist}>
            <View style={styles.wishlistButton}>
              <Image
                source={allLogo.black}
                style={[
                  styles.wishlistButtonImage,
                  {tintColor: isWishlist ? 'red' : 'black'},
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.bodyOverview}>
        <Text style={styles.txtOverview}>
          The planet {planetData.name} has a rotation period of{' '}
          {planetData.rotation_period} and an orbital period of{' '}
          {planetData.orbital_period}. It also has a diameter of{' '}
          {planetData.diameter} with a {planetData.climate} climate and gravity
          of {planetData.gravity}. The terrain of {planetData.name} is{' '}
          {planetData.terrain} with surface water of {planetData.surface_water}.
          It has a population of {planetData.population}.
        </Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.bodyOverview}>
        <TouchableOpacity
          style={styles.btnWish}
          onPress={() => NavigatorService.navigate('Wishlist')}>
          <Text style={styles.wishlistText}>Wishlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a32',
    padding: toDp(0),
  },
  bodyIMG: {
    alignItems: 'center',
    marginTop: toDp(20),
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
    marginTop: toDp(5),
    maxWidth: toDp(310),
    alignItems: 'center',
  },
  txtOverview: {
    color: '#c9c9ce',
    marginBottom: toDp(15),
    fontSize: toDp(20),
  },
  separator: {
    borderWidth: 0.6,
    borderColor: '#c9c9ce',
    width: toDp(320),
    margin: toDp(20),
  },
  wishlistButton: {
    borderWidth: 1,
    borderColor: '#FFF',
    width: toDp(45),
    height: toDp(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(30),
    marginRight: toDp(30),
    backgroundColor: '#FFF',
  },
  wishlistButtonImage: {
    width: toDp(35),
    height: toDp(30),
  },
  kembaliButton: {
    position: 'absolute',
    top: toDp(20),
    left: toDp(20),
  },
  wishlistText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: toDp(20),
    fontWeight: '600',
  },
  btnWish: {
    backgroundColor: '#eb8c74',
    width: toDp(100),
    height: toDp(30),
    justifyContent: 'center',
    borderRadius: toDp(18),
  },
});

export default DetailPlanet;
