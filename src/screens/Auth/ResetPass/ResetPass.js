import React, {useState, useEffect} from 'react';
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
import {changePass} from '../../../redux/actions/auth';

// Validate Email...
const validateEmail = (email) => {
  let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
};

const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const ResetPass = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  //   redux stuff
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.auth);

  useEffect(() => {
    const {email} = route.params;
    setEmail(email);
  }, []);

  const handleChangePass = async () => {
    const validation = validateData();
    if (validation) {
      const params = {
        email: email,
        pincode: code,
        newpassword: password,
      };
      dispatch(changePass(params, onSuccess, onError));
    }
  };

  const onSuccess = async (res) => {
    ShowSnackBar('Password has been reset.');
    replaceScreen();
  };

  const onError = (err) => {
    console.log(err);
    ShowSnackBar('The given data is invalid.');
  };

  const validateData = () => {
    if (email === '' || code === '' || password === '' || confirmPass === '') {
      ShowSnackBar('Kindly fill all the fields.');
      return false;
    } else {
      if (validateEmail(email) === true) {
        if (password === confirmPass) {
          if (password.length >= 8) {
            if (code.length === 6) {
              return true;
            } else {
              ShowSnackBar('Code must contains six digits.');
            }
          } else {
            ShowSnackBar('The password must be at least 8 characters.');
          }
        } else {
          ShowSnackBar('Passwords are not equal.');
          return false;
        }
      } else {
        ShowSnackBar('Kindly enter valid email');
        return false;
      }
    }
  };

  const replaceScreen = async () => {
    navigation.navigate('Login');
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
          <View style={{flex: 0.15}}>
            <Image
              source={header}
              resizeMode="cover"
              style={styles.headerImgStyle}
            />
          </View>
          <View style={{flex: 0.1}}>
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
                editable={false}
                value={email}
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
                placeholder={'6 Digit Code'}
                inputType="number-pad"
                capitalize={'none'}
                onChangeText={(text) => {
                  setCode(text);
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
                placeholder={'New Password'}
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
          <View style={{flex: 0.6}}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonStyle}
              onPress={() => handleChangePass()}>
              <LinearGradient
                colors={gradientColors}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ResetPass;
