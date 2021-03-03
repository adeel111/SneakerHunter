import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Card, Divider} from 'react-native-elements';
import {txtStyle, dividerStyle} from '../../../utils/CommonStyles';
import styles from './styles';
import {Loading} from '../../../components/Loading';

// redux stuff
import {useDispatch, useSelector} from 'react-redux';
import {getReminders, getGuestReminders} from '../../../redux/actions/home';

const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const dummyData = [
  {
    description: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    created_at: '12-29-2020',
  },
  {
    description: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    created_at: '12-29-2020',
  },
  {
    description: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    created_at: '12-29-2020',
  },
];

const Notifications = ({navigation}) => {
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);

  //   redux stuff
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {isLoading, reminders} = useSelector((state) => state.home);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStatus();
    });
    return unsubscribe;
  }, [navigation]);

  const getStatus = async () => {
    const guest = await AsyncStorage.getItem('guest');
    if (guest === 'false') {
      dispatch(getReminders(token, onSuccess, onError));
      setStatus(guest);
    } else {
      dispatch(getGuestReminders(onSuccess1, onError1));
      setStatus(guest);
    }
  };

  const onSuccess = (res) => {
    console.log(res);
    setData(res.data.data);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onSuccess1 = (res) => {
    console.log(res);
    setData(res.data.data);
  };

  const onError1 = (err) => {
    console.log(err);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, margin: 20, marginBottom: 0}}>
        <View>
          <Text style={styles.nameTxtStyle}>Hi Dear User,</Text>
          <Text style={styles.descTxtStyle}>{item?.description}</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.descTxtStyle}>Thanks</Text>
            <Text style={styles.descTxtStyle}>
              {moment(item?.created_at).format('ll')}
            </Text>
          </View>
        </View>
        <Divider
          style={dividerStyle('100%', 1, 8, 0, '#C5CCD6').dividerStyle}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Loading visible={isLoading} />
      <Card containerStyle={styles.headerCard}>
        <View style={styles.headerContainer}>
          <Text style={txtStyle(16).txtStyle}>Notifications</Text>
        </View>
      </Card>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {data === undefined || data?.length === 0 ? (
          isLoading ? (
            <Text style={styles.recordsTextStyle}>Loading...</Text>
          ) : (
            <Text style={styles.recordsTextStyle}>No Records Found</Text>
          )
        ) : (
          <FlatList
            data={data && data}
            extraData={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
