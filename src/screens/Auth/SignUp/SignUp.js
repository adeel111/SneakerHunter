import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {header} from '../../../assets';
import {inputTxtStyle} from '../../../utils/CommonStyles';
import InputField from '../../../components/InputField';
import ShowSnackBar from '../../../components/ShowSnackBar';
import theme from '../../../theme';
import styles from './styles';
import {Loading} from '../../../components/Loading';

// redux stuff
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../../redux/actions/auth';

// Validate Email...
const validateEmail = (email) => {
  let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
};

const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  //   redux stuff
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.auth);

  const handleSignUp = async () => {
    const validation = validateData();
    if (validation) {
      const params = {
        name: name,
        email: email,
        password: password,
      };
      dispatch(register(params, onSuccess, onError));
    }
  };

  const onSuccess = async (res) => {
    ShowSnackBar('Your account is created.');
    replaceScreen('Login');
  };

  const onError = (err) => {
    console.log(err);
    ShowSnackBar('The given data is invalid.');
  };

  const validateData = () => {
    if (name === '' || email === '' || password === '' || confirmPass === '') {
      ShowSnackBar('Kindly fill all the fields.');
      return false;
    } else {
      if (validateEmail(email) === true) {
        if (password === confirmPass) {
          if (password.length >= 8) {
            return true;
          } else {
            ShowSnackBar('The password must be at least 8 characters.');
          }
        } else {
          ShowSnackBar('Passwords are not equal.');
          return false;
        }
      } else {
        ShowSnackBar('Kindly enter valid email.');
        return false;
      }
    }
  };

  const replaceScreen = async (screen) => {
    navigation.navigate(screen);
  };

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.blackColor}
      />
      <View style={{flex: 1}}>
        <Loading visible={isLoading} />
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 0.3}}>
            <Image source={header} style={styles.headerImgStyle} />
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
              onPress={() => handleSignUp()}>
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
