import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Icon, Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../../../components/InputField';
import {txtStyle, inputTxtStyle} from '../../../utils/CommonStyles';
import {moderateScale} from '../../../constants/ScalingUnit';
import theme from '../../../theme';
import styles from './styles';

const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [selected, setSelected] = useState(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Card containerStyle={styles.headerCard}>
        <View style={styles.headerContainer}>
          <Text style={txtStyle(16).txtStyle}>Profile Settings</Text>
        </View>
      </Card>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
              placeholder={'Old Password'}
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
              placeholder={'New Password'}
              inputType="default"
              capitalize={'none'}
              secure
              onChangeText={(text) => {
                setNewPass(text);
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
          <View style={styles.rowContainer}>
            <Icon
              type="MaterialIcons"
              name={selected ? 'check-box' : 'check-box-outline-blank'}
              color={theme.colors.yellowPColor}
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
            onPress={() => alert('Profile has been updated.')}>
            <LinearGradient
              colors={gradientColors}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>Update</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
