import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
import {allLogo} from '../../Assets';
import {toDp} from '../../Helpers/PercentageToDP';
import NavigatorServices from '../../Helpers/NavigatorServices';

let {width, height} = Dimensions.get('window');
const title = text => {
  let newText = text.substr(0, 12);

  return <Text>{newText}</Text>;
};

class Kembali extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <LinearGradient
            colors={['#FF0000', '#000000']}
            style={[styles.linearHeader, {justifyContent: 'space-between'}]}> */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.touchHeader}
              onPress={this.props.onPress}>
              <Image source={allLogo.Left} style={styles.ickembali} />
            </TouchableOpacity>
            <Text
              style={[
                styles.title,
                {
                  fontSize: this.props.title.length >= 28 ? toDp(14) : toDp(20),
                  width: toDp(105),
                },
              ]}>
              {title(this.props.title)}
            </Text>

            <View style={styles.icheader}></View>
          </View>
          {/* </LinearGradient> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: -1,
    // backgroundColor: 'cyan',
  },
  icheader: {
    flexDirection: 'row',
  },
  header: {
    width,
    //height: 'auto',
    backgroundColor: '#191a32',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.0,
    elevation: 4,
  },
  linearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: toDp(8),
    height: height / 12 + (Platform.OS === 'android' ? toDp(0) : toDp(20)),
    paddingTop: Platform.OS === 'android' ? toDp(0) : toDp(20),
  },
  touchHeader: {
    padding: toDp(4),
  },
  cart: {
    left: toDp(100),
    width: toDp(28),
    height: toDp(28),
  },
  nav: {
    left: toDp(100),
    width: toDp(28),
    height: toDp(28),
  },
  ickembali: {
    width: toDp(38),
    height: toDp(38),
    resizeMode: 'contain',
    tintColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: toDp(20),
    marginLeft: toDp(8),
  },
});

export default Kembali;
