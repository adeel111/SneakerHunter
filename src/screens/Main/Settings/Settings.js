import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Icon, Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../../components/InputField';
import ShowSnackBar from '../../../components/ShowSnackBar';
import {txtStyle, inputTxtStyle} from '../../../utils/CommonStyles';
import {moderateScale} from '../../../constants/ScalingUnit';
import theme from '../../../theme';
import styles from './styles';
import {Loading} from '../../../components/Loading';

// redux stuff
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../../redux/actions/home';

// Validate Email...
const validateEmail = (email) => {
  let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
};

const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const Settings = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [selected, setSelected] = useState(false);
  const [status, setStatus] = useState('');

  //   redux stuff
  const dispatch = useDispatch();
  const {token, userData} = useSelector((state) => state.auth);
  const {isLoading} = useSelector((state) => state.home);

  useEffect(() => {
    setName(userData?.name);
    setEmail(userData?.email);
    getStatus();
  }, []);

  const getStatus = async () => {
    const guest = await AsyncStorage.getItem('guest');
    setStatus(guest);
  };

  const handleUpdate = async () => {
    const validation = validateData();
    if (validation) {
      const params = {
        name: name,
        email: email,
        current_password: password,
        new_password: newPass,
        send_notifications: selected ? 1 : 0,
      };
      dispatch(updateProfile(params, token, onSuccess, onError));
    }
  };

  const onSuccess = async (res) => {
    console.log(res);
    ShowSnackBar('Your profile is updated.');
  };

  const onError = (err) => {
    console.log(err);
    ShowSnackBar('The given data is invalid.');
  };

  const validateData = () => {
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      newPass === '' ||
      confirmPass === ''
    ) {
      ShowSnackBar('Kindly fill all the fields.');
      return false;
    } else {
      if (validateEmail(email) === true) {
        if (newPass === confirmPass) {
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Loading visible={isLoading} />
      <Card containerStyle={styles.headerCard}>
        <View style={styles.headerContainer}>
          <Text style={txtStyle(16).txtStyle}>Profile Settings</Text>
        </View>
      </Card>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {status === 'true' ? (
            <View>
              <Text style={styles.recordsTextStyle}>
                First Login to see{'\n'}profile settings.
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('Auth')}>
                <LinearGradient
                  colors={gradientColors}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={[
                  inputTxtStyle('80%').inputTxtStyle,
                  {
                    margin: moderateScale(moderateScale(15)),
                  },
                ]}>
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
                  value={name}
                />
              </View>
              <View
                style={[
                  inputTxtStyle('80%').inputTxtStyle,
                  {
                    margin: moderateScale(moderateScale(15)),
                  },
                ]}>
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
                  value={email}
                />
              </View>
              <View
                style={[
                  inputTxtStyle('80%').inputTxtStyle,
                  {
                    margin: moderateScale(moderateScale(15)),
                  },
                ]}>
                <Icon
                  type="MaterialIcons"
                  name="lock"
                  color={theme.colors.lightGrayColor}
                  size={19}
                  style={{marginLeft: 2, marginRight: 2}}
                />
                <InputField
                  placeholder={'Old Password'}
                  inputType="default"
                  capitalize={'none'}
                  secure
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                />
              </View>
              <View
                style={[
                  inputTxtStyle('80%').inputTxtStyle,
                  {
                    margin: moderateScale(moderateScale(15)),
                  },
                ]}>
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
                    setNewPass(text);
                  }}
                />
              </View>
              <View
                style={[
                  inputTxtStyle('80%').inputTxtStyle,
                  {
                    margin: moderateScale(moderateScale(15)),
                  },
                ]}>
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
              <View style={styles.rowContainer}>
                <Icon
                  type="MaterialIcons"
                  name={selected ? 'check-box' : 'check-box-outline-blank'}
                  color={theme.colors.primaryColor}
                  iconStyle={{
                    fontSize: moderateScale(19),
                    alignSelf: 'center',
                  }}
                  onPress={() => setSelected(!selected)}
                />
                <Text
                  style={[
                    txtStyle(13, 5).txtStyle,
                    {fontFamily: theme.fontFamily.regular, marginLeft: 5},
                  ]}>
                  Don't Send Notification.
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.buttonStyle}
                onPress={() => handleUpdate()}>
                <LinearGradient
                  colors={gradientColors}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Update</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
