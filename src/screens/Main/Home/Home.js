import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Icon, Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {one, two, three} from '../../../assets';
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

const Home = ({navigation}) => {
  const [data, setData] = useState(articlesData);
  const [date, setDate] = useState('');
  const [datePikrVisible, setDatePikrVisible] = useState(false);

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
          <View style={{flex: 0.5, backgroundColor: '#E8E8E8'}}>
            <Text style={styles.priceTxtStyle}>{item.price}</Text>
            <View style={styles.imgContainer}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={imgStyle(width / 3.5, height / 8.5).imgStyle}
              />
            </View>
          </View>
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
          <View style={{flex: 0.5, backgroundColor: '#E8E8E8'}}>
            <Text style={styles.priceTxtStyle}>{item.price}</Text>
            <View style={styles.imgContainer}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={imgStyle(width / 3.5, height / 8.5).imgStyle}
              />
            </View>
          </View>
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Card containerStyle={styles.headerCard}>
        <View style={styles.headerContainer}>
          <Text style={txtStyle(16).txtStyle}>Sneaker Hunter</Text>
          <View style={styles.iconsContainer}>
            <View style={{justifyContent: 'center'}}>
              <Icon
                type="MaterialIcons"
                name="date-range"
                onPress={() => togglePicker()}
                color={theme.colors.lightGrayColor}
                size={24}
                style={{paddingLeft: -30}}
              />
              <DateTimePickerModal
                isVisible={datePikrVisible}
                mode="date"
                onConfirm={(date) => handleDate(date)}
                onCancel={() => togglePicker()}
              />
            </View>
            <Icon
              type="MaterialIcons"
              name="logout"
              color={theme.colors.lightGrayColor}
              size={24}
              onPress={() => navigation.replace('Splash')}
            />
          </View>
        </View>
      </Card>
      <FlatList
        data={data && data}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;
