import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import {Icon, Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowSnackBar from '../../../components/ShowSnackBar';
import {imgStyle, txtStyle} from '../../../utils/CommonStyles';
import {moderateScale} from '../../../constants/ScalingUnit';
import theme from '../../../theme';
import styles from './styles';
import {Loading} from '../../../components/Loading';

// Notifications stuff
import {fcmService} from '../../../service/FCMService';
import {localNotificationService} from '../../../service/LocalNotificationService';

// redux stuff
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../redux/actions/auth';
import {getProducts, setReminder} from '../../../redux/actions/home';

const {width, height} = Dimensions.get('window');
const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const Search = ({navigation}) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgIndex, setImgIndex] = useState(false);
  let flatListRef = useRef();
  const [notifytoken, setNotifyToken] = useState('');

  //   redux stuff
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {isLoading, products} = useSelector((state) => state.home);

  useEffect(() => {
    getStatus();
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  }, []);

  const getStatus = async () => {
    dispatch(getProducts(onSuccess1, onError1));
    const guest = await AsyncStorage.getItem('guest');
    setStatus(guest);
  };

  const onSuccess1 = (res) => {
    console.log(res);
    setData(res.data.data);
  };

  const onError1 = (err) => {
    console.log(err);
  };

  // Starts notification work
  const onRegister = async (token) => {
    // Save Token...
    // await this.props.sendDeviceToken(token, this.props.userId);
    setNotifyToken(token);
  };

  const onNotification = (notify, remoteMessage) => {
    console.log('Received Notification.');
    console.log('[App] onNotification: ', notify);
    localNotificationService.configure(onOpenNotification, remoteMessage);
    const options = {
      soundName: 'default',
      playSound: true, //,
      // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    };
    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
  };

  const onOpenNotification = (notify, remoteMessage) => {
    console.log('[App] onOpenNotification: ', notify);
    console.log('[App] onOpenNotification: data ', remoteMessage);
    if (remoteMessage) {
      const {id, type} = remoteMessage.data;
      console.log(type);
      // switch (type) {
      // }
    }
  };

  // End notification work
  const handleReminder = async (id) => {
    const guest = await AsyncStorage.getItem('guest');
    if (guest === 'true') {
      Alert.alert(
        'Login',
        `Kindly first login yourself \n to set reminder.`,
        [
          {
            text: 'Cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate('Auth')},
        ],
        {cancelable: false},
      );
    } else {
      const params = {
        product_id: id,
      };
      dispatch(setReminder(params, token, onSuccess2, onError2));
    }
  };

  const onSuccess2 = (res) => {
    console.log(res);
    ShowSnackBar('Product is added into Reminders List.');
  };

  const onError2 = (err) => {
    console.log(err);
  };

  const RenderLeftItem = ({item, index}) => {
    return (
      <Card containerStyle={styles.cardContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setImgIndex(index);
              setShowModal(!showModal);
            }}
            style={{flex: 0.5, backgroundColor: '#E8E8E8'}}>
            <Text style={styles.priceTxtStyle}>$ {item?.price}</Text>
            <View style={styles.imgContainer}>
              <Image
                source={{uri: item?.images[0]}}
                resizeMode="contain"
                style={imgStyle(width / 3.5, height / 8.5).imgStyle}
              />
            </View>
          </TouchableOpacity>
          <View style={{flex: 0.5}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.priceTxtStyle}>{item?.brand_name}</Text>
              <Text style={styles.dateTxtStyle}>
                {moment(item?.release_date).format('ll')}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text numberOfLines={5} style={styles.dateTxtStyle}>
                {item?.description}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonStyle}
              onPress={() => handleReminder(item?.id)}>
              <LinearGradient colors={gradientColors}>
                <Text style={styles.buttonText}>Reminder</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  const RenderRightItem = ({item, index}) => {
    return (
      <Card containerStyle={styles.cardContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.5}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.priceTxtStyle}>{item?.brand_name}</Text>
              <Text style={styles.dateTxtStyle}>
                {moment(item?.release_date).format('ll')}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text numberOfLines={5} style={styles.dateTxtStyle}>
                {item?.description}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.buttonStyle,
                {
                  marginRight: moderateScale(10),
                },
              ]}
              onPress={() => handleReminder(item?.id)}>
              <LinearGradient colors={gradientColors}>
                <Text style={styles.buttonText}>Reminder</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setImgIndex(index);
              setShowModal(!showModal);
            }}
            style={{flex: 0.5, backgroundColor: '#E8E8E8'}}>
            <Text style={styles.priceTxtStyle}>$ {item?.price}</Text>
            <View style={styles.imgContainer}>
              <Image
                source={{uri: item?.images[0]}}
                resizeMode="contain"
                style={imgStyle(width / 3.5, height / 8.5).imgStyle}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  const renderItem = ({item, index}) => {
    if (item.id % 2 === 0) {
      return <RenderRightItem item={item} index={index} />;
    } else {
      return <RenderLeftItem item={item} index={index} />;
    }
  };

  const renderModel = () => {
    return (
      <Modal
        isVisible={showModal}
        coverScreen={true}
        hasBackdrop={true}
        animationIn="slideInUp"
        // swipeDirection="right"
      >
        <Icon
          type="entypo"
          name="circle-with-cross"
          color={theme.colors.lightGrayColor}
          iconStyle={{alignSelf: 'flex-end', marginBottom: moderateScale(10)}}
          onPress={() => setShowModal(!showModal)}
        />
        <View style={styles.modalViewContainer}>
          <Swiper
            dots
            dotColor={theme.colors.lightGrayColor}
            activeDotColor={theme.colors.primaryColor}
            // autoplay={true}
            autoplayTimeout={3}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            onMomentumScrollEnd={(e, state, context) =>
              console.log('index:', state.index)
            }
            paginationStyle={{}}
            loop>
            {data[imgIndex]?.images?.map((item, index) => {
              return (
                <View
                  style={{
                    padding: moderateScale(5),
                    backgroundColor: '#E8E8E8',
                  }}>
                  <Image
                    key={index}
                    source={{uri: item}}
                    style={{width: '100%', height: height / 3, borderRadius: 5}}
                    resizeMode="contain"
                  />
                </View>
              );
            })}
          </Swiper>
        </View>
      </Modal>
    );
  };

  const handleLogout = async () => {
    setLoading(true);
    dispatch(logout(token, onSuccess, onError));
  };

  const onSuccess = async (res) => {
    setLoading(false);
    await AsyncStorage.setItem('login', 'false');
    navigation.replace('Splash');
  };

  const onError = (err) => {
    setLoading(false);
    navigation.replace('Splash');
  };

  const goIndex = () => {
    flatListRef.current.scrollToIndex({animated: true, index: 0});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.blackColor}
      />
      <Loading visible={isLoading} />
      <Card containerStyle={styles.headerCard}>
        <View style={styles.headerContainer}>
          <Text style={txtStyle(16).txtStyle}>Sneaker Hunter</Text>
          {status === 'true' ? (
            <Text />
          ) : loading ? (
            <ActivityIndicator animating color={theme.colors.primaryColor} />
          ) : (
            <Icon
              type="MaterialIcons"
              name="logout"
              color={theme.colors.lightGrayColor}
              size={24}
              onPress={() => handleLogout()}
            />
          )}
        </View>
      </Card>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {data === undefined || data.length === 0 ? (
          isLoading ? (
            <Text style={styles.recordsTextStyle}>Loading...</Text>
          ) : (
            <Text style={styles.recordsTextStyle}>No Records Found</Text>
          )
        ) : (
          <FlatList
            ref={flatListRef}
            data={data && data}
            extraData={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      {showModal && renderModel()}
    </SafeAreaView>
  );
};

export default Search;
