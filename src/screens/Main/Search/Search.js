import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  TextInput,
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ShowSnackBar from '../../../components/ShowSnackBar';
import {one, two, three, filter} from '../../../assets';
import {imgStyle, txtStyle} from '../../../utils/CommonStyles';
import {moderateScale} from '../../../constants/ScalingUnit';
import theme from '../../../theme';
import styles from './styles';
import {Loading} from '../../../components/Loading';

// redux stuff
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../redux/actions/auth';
import {getProducts, setReminder} from '../../../redux/actions/home';

const {width, height} = Dimensions.get('window');
const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const imagesArray = [{img: one}, {img: two}, {img: three}];

const Search = ({navigation}) => {
  const [search, setSearch] = useState('Search');
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [date, setDate] = useState('');
  const [datePikrVisible, setDatePikrVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  //   redux stuff
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {isLoading, products} = useSelector((state) => state.home);

  useEffect(() => {
    getStatus();
  }, [navigation]);

  const getStatus = async () => {
    dispatch(getProducts(onSuccess1, onError1));
    const guest = await AsyncStorage.getItem('guest');
    setStatus(guest);
  };

  const onSuccess1 = (res) => {
    console.log(res);
    setData(res.data.data);
    setFilterData(res.data.data);
  };

  const onError1 = (err) => {
    console.log(err);
  };

  const togglePicker = () => {
    setDatePikrVisible(!datePikrVisible);
  };

  // handle date picker...
  const handleDate = (date) => {
    const selectedDate = getDate(new Date(date));
    setDate(selectedDate);
    togglePicker();
  };

  // get formtaed date from date object...
  const getDate = (date) => {
    var dat = date.getDate();
    if (dat <= 9) {
      dat = `0${dat}`;
    }
    var month = date.getMonth() + 1;
    if (month <= 9) {
      month = `0${month}`;
    }
    var year = date.getFullYear();
    const formatedDate = month + '/' + dat + '/' + year;
    return formatedDate;
  };

  const searchItem = (search) => {
    const searchData = filterData?.filter((item) =>
      item?.brand_name.toUpperCase().includes(search.toUpperCase()),
    );
    setSearch(search);
    setData(searchData);
  };

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
            onPress={() => setShowModal(!showModal)}
            style={{flex: 0.5, backgroundColor: '#E8E8E8'}}>
            <Text style={styles.priceTxtStyle}>$ {item?.price}</Text>
            <View style={styles.imgContainer}>
              <Image
                source={{uri: item?.image}}
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
              <Text style={styles.dateTxtStyle}>{item?.description}</Text>
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
              <Text style={styles.dateTxtStyle}>{item?.description}</Text>
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
            onPress={() => setShowModal(!showModal)}
            style={{flex: 0.5, backgroundColor: '#E8E8E8'}}>
            <Text style={styles.priceTxtStyle}>$ {item?.price}</Text>
            <View style={styles.imgContainer}>
              <Image
                source={{uri: item?.image}}
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
            {imagesArray.map((item, index) => {
              return (
                <View
                  style={{
                    padding: moderateScale(5),
                    backgroundColor: '#E8E8E8',
                  }}>
                  <Image
                    key={index}
                    source={item?.img}
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

  return (
    <SafeAreaView style={styles.mainContainer}>
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
      <View style={styles.rowContainer}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              placeholder={'Search'}
              inputType="default"
              capitalize={'none'}
              onChangeText={(text) => {
                searchItem(text);
              }}
              style={styles.inputStyle}
            />
            <View style={styles.srchIconContainer}>
              <Icon
                type="Ionicons"
                name="search"
                color={theme.colors.lightGrayColor}
                iconStyle={[styles.iconStyle, {marginLeft: 5}]}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => togglePicker()}
          style={{
            marginRight: moderateScale(10),
          }}>
          <Image
            source={filter}
            resizeMode="contain"
            style={[
              imgStyle(30, 30).imgStyle,
              {tintColor: theme.colors.lightGrayColor},
            ]}
          />
          <DateTimePickerModal
            isVisible={datePikrVisible}
            mode="date"
            onConfirm={(date) => handleDate(date)}
            onCancel={() => togglePicker()}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {data === undefined || data.length === 0 ? (
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
      {showModal && renderModel()}
    </SafeAreaView>
  );
};

export default Search;
