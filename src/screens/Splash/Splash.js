import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logo} from '../../assets';
import {imgStyle} from '../../utils/CommonStyles';
import ShowSnackBar from '../../components/ShowSnackBar';
import {moderateScale} from '../../constants/ScalingUnit';
import theme from '../../theme';
import {Loading} from '../../components/Loading';

// Notifications stuff
import {fcmService} from '../../service/FCMService';
import {localNotificationService} from '../../service/LocalNotificationService';

// redux stuff
import {useDispatch, useSelector} from 'react-redux';
import {saveGuestToken} from '../../redux/actions/auth';

const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const Splash = ({navigation}) => {
  const [notifytoken, setNotifyToken] = useState('');

  //   redux stuff
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.auth);

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    (async () => {
      const isLogin = await AsyncStorage.getItem('login');
      if (isLogin === 'true') {
        navigation.replace('BottomTabs');
      }
    })();
  }, []);

  // Starts notification work
  const onRegister = async (token) => {
    setNotifyToken(token);
  };

  const onNotification = (notify) => {
    console.log('Received Notification.');
  };

  const onOpenNotification = (notify) => {
    console.log('[App] onOpenNotification: ', notify);
  };
  // End notification work

  const handleGuest = () => {
    const params = {
      device_id: notifytoken,
      device_platform: DeviceInfo.getSystemName(),
    };
    dispatch(saveGuestToken(params, onSuccess, onError));
  };

  const onSuccess = async (res) => {
    replaceScreen('BottomTabs');
  };

  const onError = (err) => {
    console.log(err);
    ShowSnackBar('Something went wrong.');
  };

  const replaceScreen = async (screen) => {
    if (screen === 'BottomTabs') {
      await AsyncStorage.setItem('guest', 'true');
      navigation.replace('BottomTabs');
    } else {
      await AsyncStorage.setItem('guest', 'false');
      navigation.replace('Auth', {screen});
    }
  };

  return (
    <>
      <StatusBar hidden barStyle={'light-content'} />
      <Animatable.View
        style={styles.mainContainer}
        animation="fadeIn"
        duration={3000}>
        <Loading visible={isLoading} />
        <Animatable.View animation="fadeInUpBig" duration={2000}>
          <Image
            source={logo}
            style={[
              imgStyle(250, 150).imgStyle,
              {marginBottom: moderateScale(35)},
            ]}
          />
        </Animatable.View>
        <View style={styles.bottomContainer}>
          <Animatable.View
            style={{flex: 0.5}}
            animation="bounceInLeft"
            duration={2500}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{flex: 0.5}}
              onPress={() => replaceScreen('Login')}>
              <LinearGradient
                colors={gradientColors}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
          <View
            style={{width: 1.5, backgroundColor: theme.colors.whiteColor}}
          />
          <Animatable.View
            style={{flex: 0.5}}
            animation="bounceInRight"
            duration={2500}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{flex: 0.5}}
              onPress={() => handleGuest()}>
              <LinearGradient
                colors={gradientColors}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>GUEST</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Animatable.View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.blackColor,
  },
  bottomContainer: {
    bottom: 0,
    flexDirection: 'row',
    position: 'absolute',
  },
  linearGradient: {
    flex: 1,
    padding: 6,
  },
  buttonText: {
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
    color: theme.colors.whiteColor,
    backgroundColor: 'transparent',
    fontFamily: theme.fontFamily.medium,
  },
});
