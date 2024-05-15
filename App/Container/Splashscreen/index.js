import React from 'react';
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

const Splashscreen = props => {
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => NavigatorService.reset('Planets')}>
          <Text
            style={{
              color: '#FFF',
              marginHorizontal: toDp(25),
              marginVertical: toDp(20),
              fontSize: toDp(15),
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tblogo}>
        <TouchableOpacity>
          <Image source={allLogo.logo} style={styles.logo} />
          <Text style={styles.txtLogo}>PLANETS</Text>
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
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#191a32',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  logo: {
    width: toDp(180),
    height: toDp(160),
  },
  txtLogo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: toDp(20),
    color: '#FFF',
    marginTop: toDp(10),
  },
  tblogo: {
    height: toDp(130),
    marginTop: toDp(250),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splashscreen;
