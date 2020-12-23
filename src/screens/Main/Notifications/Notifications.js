import React, {useState} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import {txtStyle, dividerStyle} from '../../../utils/CommonStyles';
import styles from './styles';

const notifyData = [
  {
    name: 'John',
    desc: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    date: 'Tue at 11:12 AM',
  },
  {
    name: 'John',
    desc: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    date: 'Tue at 11:12 AM',
  },
  {
    name: 'John',
    desc: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    date: 'Tue at 11:12 AM',
  },
  {
    name: 'John',
    desc: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    date: 'Tue at 11:12 AM',
  },
  {
    name: 'John',
    desc: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    date: 'Tue at 11:12 AM',
  },
  {
    name: 'John',
    desc: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    date: 'Tue at 11:12 AM',
  },
  {
    name: 'John',
    desc: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    date: 'Tue at 11:12 AM',
  },
  {
    name: 'John',
    desc: `We're pleased to inform you, GUCCI men's footwear article #B510 is going to release today.`,
    date: 'Tue at 11:12 AM',
  },
];

const Notifications = () => {
  const [data, setData] = useState(notifyData);
  const [filterData, setFilterData] = useState(notifyData);

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, margin: 20, marginBottom: 0}}>
        <View>
          <Text style={styles.nameTxtStyle}>Hi {item.name},</Text>
          <Text style={styles.descTxtStyle}>{item.desc}</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.descTxtStyle}>Thanks</Text>
            <Text style={styles.descTxtStyle}>{item.date}</Text>
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
      <Card containerStyle={styles.headerCard}>
        <View style={styles.headerContainer}>
          <Text style={txtStyle(16).txtStyle}>Notifications</Text>
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

export default Notifications;
