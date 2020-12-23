import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {header} from '../../../assets';
import {inputTxtStyle, txtStyle} from '../../../utils/CommonStyles';
import {moderateScale} from '../../../constants/ScalingUnit';
import InputField from '../../../components/InputField';
import theme from '../../../theme';
import styles from './styles';

const {width} = Dimensions.get('window');
const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const replaceScreen = async (screen) => {
    if (screen === 'BottomTabs') {
      await AsyncStorage.setItem('guest', 'false');
      navigation.replace(screen);
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.blackColor}
      />
      <View style={{flex: 1}}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 0.3}}>
            <Image
              source={header}
              resizeMode="cover"
              style={styles.headerImgStyle}
            />
            <Text
              style={[
                txtStyle(18).txtStyle,
                {
                  alignSelf: 'flex-start',
                  marginLeft: moderateScale(30),
                  // marginTop: moderateScale(-30),
                },
              ]}>
              Hello There,{'\n'}Welcome Back
            </Text>
          </View>

          <View style={{flex: 0.1}} />
          <View style={{flex: 0.4}}>
            <View style={inputTxtStyle('80%').inputTxtStyle}>
              <Icon
                type="MaterialIcons"
                name="email"
                color={theme.colors.lightGrayColor}
                size={18}
                style={{marginLeft: 4, marginRight: 2}}
              />
              <InputField
                placeholder={'User Email'}
                inputType="email-address"
                capitalize={'none'}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
            </View>
            <View style={inputTxtStyle('80%').inputTxtStyle}>
              <Icon
                type="MaterialIcons"
                name="lock"
                color={theme.colors.lightGrayColor}
                size={19}
                style={{marginLeft: 2, marginRight: 2}}
              />
              <InputField
                placeholder={'Password'}
                inputType="default"
                capitalize={'none'}
                secure
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>
            <Text style={styles.forgotTextStyle} onPress={() => alert('todo!')}>
              Forgot Password ?
            </Text>
          </View>
          <View style={{flex: 0.2, justifyContent: 'space-between'}}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonStyle}
              onPress={() => replaceScreen('BottomTabs')}>
              <LinearGradient
                colors={gradientColors}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text
              style={styles.bottomTextStyle}
              onPress={() => replaceScreen('SignUp')}>
              New here ?{' '}
              <Text style={{color: theme.colors.primaryColor}}>Sign Up</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Login;
