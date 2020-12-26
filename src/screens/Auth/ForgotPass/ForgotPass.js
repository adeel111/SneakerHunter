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
import {sendEmail} from '../../../redux/actions/auth';

// Validate Email...
const validateEmail = (email) => {
  let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
};

const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const ForgotPass = ({navigation}) => {
  const [email, setEmail] = useState('');

  //   redux stuff
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.auth);

  const handleForgotPass = async () => {
    const validation = validateData();
    if (validation) {
      const params = {
        email: email,
      };
      dispatch(sendEmail(params, onSuccess, onError));
    }
  };

  const onSuccess = async (res) => {
    ShowSnackBar('Email has been sent to you.');
    replaceScreen();
  };

  const onError = (err) => {
    console.log(err);
    ShowSnackBar('The given data is invalid.');
  };

  const validateData = () => {
    if (email === '') {
      ShowSnackBar('Kindly first enter email.');
      return false;
    } else {
      if (validateEmail(email) === true) {
        return true;
      } else {
        ShowSnackBar('Kindly enter valid email.');
        return false;
      }
    }
  };

  const replaceScreen = async () => {
    navigation.navigate('ResetPass', {email});
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
          <View style={{flex: 0.15}}>
            <Text style={styles.descTextStyle}>
              Please enter your registered email ID to receive a verification
              code.
            </Text>
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
              />
            </View>
          </View>
          <View style={{flex: 0.6}}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonStyle}
              onPress={() => handleForgotPass()}>
              <LinearGradient
                colors={gradientColors}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>Send</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ForgotPass;
