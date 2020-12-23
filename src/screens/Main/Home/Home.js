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
} from 'react-native';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import {Icon, Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {one, two, three, filter} from '../../../assets';
import {imgStyle, txtStyle} from '../../../utils/CommonStyles';
import {moderateScale} from '../../../constants/ScalingUnit';
import theme from '../../../theme';
import styles from './styles';

const {width, height} = Dimensions.get('window');
const gradientColors = [theme.colors.lightBlackColor, theme.colors.blackColor];

const articlesData = [
  {
    id: 1,
    image: one,
    price: '$ 28',
    name: 'GUCCI',
    date: 'Dec 28 2020',
    desc: `Gucci does not offer discounts, but you will often be able to find Gucci products on sales.`,
  },
  {
    id: 2,
    image: two,
    price: '$ 38',
    name: 'Crocs',
    date: 'Dec 29 2020',
    desc: `Crocs does not offer discounts, but you will often be able to find Gucci products on sales.`,
  },
  {
    id: 3,
    image: three,
    price: '$ 21',
    name: 'Nike',
    date: 'Dec 28 2020',
    desc: `Nike does not offer discounts, but you will often be able to find Gucci products on sales.`,
  },
  {
    id: 4,
    image: one,
    price: '$ 28',
    name: 'GUCCI',
    date: 'Dec 28 2020',
    desc: `Gucci does not offer discounts, but you will often be able to find Gucci products on sales.`,
  },
  {
    id: 5,
    image: two,
    price: '$ 28',
    name: 'Crocs',
    date: 'Dec 28 2020',
    desc: `Gucci does not offer discounts, but you will often be able to find Gucci products on sales.`,
  },
  {
    id: 6,
    image: three,
    price: '$ 21',
    name: 'Nike',
    date: 'Dec 28 2020',
    desc: `Gucci does not offer discounts, but you will often be able to find Gucci products on sales.`,
  },
];

const imagesArray = [{img: one}, {img: two}, {img: three}];

const Search = ({navigation}) => {
  const [search, setSearch] = useState('Search');
  const [data, setData] = useState(articlesData);
  const [filterData, setFilterData] = useState(articlesData);
  const [date, setDate] = useState('');
  const [datePikrVisible, setDatePikrVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    const guest = await AsyncStorage.getItem('guest');
    setStatus(guest);
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
      item?.name.toUpperCase().includes(search.toUpperCase()),
    );
    setSearch(search);
    setData(searchData);
  };

  const handleReminder = async () => {
    const guest = await AsyncStorage.getItem('guest');
    // alert(guest);

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
      alert('Reminder has been set.');
    }
  };

  const RenderLeftItem = ({item, index}) => {
    return (
      <Card containerStyle={styles.cardContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowModal(!showModal)}
            style={{flex: 0.5, backgroundColor: '#E8E8E8'}}>
            <Text style={styles.priceTxtStyle}>{item.price}</Text>
            <View style={styles.imgContainer}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={imgStyle(width / 3.5, height / 8.5).imgStyle}
              />
            </View>
          </TouchableOpacity>
          <View style={{flex: 0.5}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.priceTxtStyle}>{item.name}</Text>
              <Text style={styles.dateTxtStyle}>{item.date}</Text>
            </View>
            <Text style={styles.dateTxtStyle}>{item.desc}</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonStyle}
              onPress={() => handleReminder()}>
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
              <Text style={styles.priceTxtStyle}>{item.name}</Text>
              <Text style={styles.dateTxtStyle}>{item.date}</Text>
            </View>
            <Text style={styles.dateTxtStyle}>{item.desc}</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.buttonStyle,
                {
                  marginRight: moderateScale(10),
                },
              ]}
              onPress={() => handleReminder()}>
              <LinearGradient colors={gradientColors}>
                <Text style={styles.buttonText}>Reminder</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowModal(!showModal)}
            style={{flex: 0.5, backgroundColor: '#E8E8E8'}}>
            <Text style={styles.priceTxtStyle}>{item.price}</Text>
            <View style={styles.imgContainer}>
              <Image
                source={item.image}
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
    console.log(item.id);
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Card containerStyle={styles.headerCard}>
        <View style={styles.headerContainer}>
          <Text style={txtStyle(16).txtStyle}>Sneaker Hunter</Text>
          {status === 'true' ? (
            <Text />
          ) : (
            <Icon
              type="MaterialIcons"
              name="logout"
              color={theme.colors.lightGrayColor}
              size={24}
              onPress={() => navigation.replace('Splash')}
            />
          )}
        </View>
      </Card>
      <FlatList
        data={data && data}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      {showModal && renderModel()}
    </SafeAreaView>
  );
};

export default Search;
