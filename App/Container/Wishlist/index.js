import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {allLogo} from '../../Assets';
import {toDp} from '../../Helpers/PercentageToDP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Kembali from '../../Component/Kembali';
import NavigatorService from '../../Helpers/NavigatorServices';

const Wishlist = props => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem('wishlist');
        // console.log('cek wishlist => ', storedWishlist);
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        }
      } catch (error) {
        console.log('Error fetching wishlist from AsyncStorage:', error);
      }
    };
    fetchWishlist();
  }, []);

  const renderPlanet = ({item}) => {
    console.log('item => ', item.urlWish);
    let idurl = item.urlWish;
    // let id = idurl.charAt(idurl.length - 2);
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.bodyDetail}>
          <Image source={allLogo.nm_planet} style={styles.planetImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.planetName}>Planet {item.name}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Periode Rotasi</Text>
            <Text style={styles.infoValue}>{item.rotation_period}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Diameter</Text>
            <Text style={styles.infoValue}>{item.diameter}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteItem(item)}>
          <View style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // Buat fungsi deleteItem di halaman Wishlist
  const deleteItem = async item => {
    console.log('item.planetId (ISI SAMA 1 data terpilih) ==> ', item.planetId);
    console.log('item (ISI SAMA 1 data terpilih) ==> ', item);
    const storedWishlist = await AsyncStorage.getItem('wishlist');
    let wishlistArray = storedWishlist ? JSON.parse(storedWishlist) : [];
    console.log('cek del = ', wishlistArray);
    wishlistArray = wishlistArray.filter(
      wishlistItem => wishlistItem.planetId !== item.planetId,
    );
    console.log('cek wish item (ISI SEMUA DATA) = ', wishlistArray);
    await AsyncStorage.setItem('wishlist', JSON.stringify(wishlistArray));
    setWishlist(wishlistArray);
  };

  return (
    <View style={styles.container}>
      <Kembali
        title={'Wishlist'}
        onPress={() => NavigatorService.navigate('DetailPlanet')}
      />
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={wishlist}
        renderItem={renderPlanet}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a32',
    padding: toDp(10),
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: toDp(5),
    paddingHorizontal: toDp(10),
    borderRadius: toDp(5),
    marginTop: toDp(5),
  },
  deleteButtonText: {
    color: 'white',
  },
  flatListContainer: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: toDp(10),
    margin: toDp(8),
    flex: 1,
    elevation: toDp(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  bodyDetail: {
    height: toDp(140),
    width: '100%',
    borderTopLeftRadius: toDp(10),
    borderTopRightRadius: toDp(10),
    overflow: 'hidden',
  },
  planetImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: toDp(10),
    borderTopRightRadius: toDp(10),
  },
  textContainer: {
    padding: toDp(10),
  },
  planetName: {
    fontSize: toDp(18),
    color: '#eb8c74',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: toDp(5),
  },
  infoLabel: {
    fontSize: toDp(14),
    color: '#eb8c74',
  },
  infoValue: {
    fontSize: 14,
    color: '#FFF',
    backgroundColor: '#eb8c74',
    paddingHorizontal: toDp(5),
    borderRadius: toDp(5),
  },
});

export default Wishlist;
