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
import {inputTxtStyle} from '../../../utils/CommonStyles';
import InputField from '../../../components/InputField';
import {moderateScale} from '../../../constants/ScalingUnit';
import theme from '../../../theme';
import styles from './styles';

const {width} = Dimensions.get('window');
const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const replaceScreen = async (screen) => {
    if (screen === 'BottomTabs') {
      navigation.replace(screen);
      await AsyncStorage.setItem('guest', 'false');
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
              resizeMode="center"
              style={styles.headerImgStyle}
            />
          </View>

          <View style={{flex: 0.4}}>
            <View style={inputTxtStyle('80%').inputTxtStyle}>
              <Icon
                type="Ionicons"
                name="person"
                color={theme.colors.lightGrayColor}
              />
              <InputField
                placeholder={'User Name'}
                inputType="email-address"
                capitalize={'none'}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            </View>
            <View style={inputTxtStyle('80%').inputTxtStyle}>
              <Icon
                type="MaterialIcons"
                name="email"
                color={theme.colors.lightGrayColor}
                size={17}
                style={{marginLeft: 3, marginRight: 3}}
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
            <View style={inputTxtStyle('80%').inputTxtStyle}>
              <Icon
                type="MaterialIcons"
                name="lock"
                color={theme.colors.lightGrayColor}
                size={19}
                style={{marginLeft: 2, marginRight: 2}}
              />
              <InputField
                placeholder={'Confirm Password'}
                inputType="default"
                capitalize={'none'}
                secure
                onChangeText={(text) => {
                  setConfirmPass(text);
                }}
              />
            </View>
          </View>
          <View style={{flex: 0.2, justifyContent: 'space-between'}}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonStyle}
              onPress={() => replaceScreen('BottomTabs')}>
              <LinearGradient
                colors={gradientColors}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text
              style={styles.bottomTextStyle}
              onPress={() => replaceScreen('Login')}>
              Already have a account ?{' '}
              <Text style={{color: theme.colors.primaryColor}}>Login</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignUp;
