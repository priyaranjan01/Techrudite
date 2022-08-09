import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Home = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = route.params?.userData?.user?.usr_fname;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />,
      headerBackVisible: false,
      headerTitleAlign: 'left',
    });

    fetchData();
  }, [navigation]);

  const fetchData = async () => {
    let defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer 148|QwsMFixT9w9MgleAbukZtghUuKNZGxgR1SYDOVMk',
    };
    let url =
      'https://techeruditedev.xyz/projects/plie-api/public/api/events-listing';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: defaultHeaders,
      });
      const json = await response.json();
      setData(json.data?.events);
      console.log('DetailsData=', JSON.stringify(json));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Header = () => {
    return (
      <View>
        <Text style={styles.headerTitle}>Hello {username}!</Text>
        <Text style={styles.headerSubTitle}>Are you ready to dance?</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'small'} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.flatlist}
      nestedScrollEnabled={true}
      data={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item, index}) => <Card item={item} data={data} />}
      ListFooterComponent={<View style={styles.flatlistFooter} />}
    />
  );
};

export default Home;

const Card = ({item, data}) => {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Image
          source={{uri: item?.event_profile_img}}
          style={styles.imgStyle}
        />
      </View>
      <View style={styles.cardFlexBox}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.cardTitleStyle}>
          {item?.event_name}
        </Text>
        <Text style={styles.dateStyle}>
          {item?.readable_from_date} - {item?.readable_to_date}
        </Text>
        <Text style={styles.priceStyle}>
          €{item?.event_price_from} - €{item?.event_price_to}
        </Text>
        <View style={styles.keywordContainer}>
          {item?.keywords.map((d, i) => (
            <View key={i} style={styles.keywordBox}>
              <Text style={styles.keywordText}>{d}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
  },
  headerSubTitle: {
    color: '#888',
    fontSize: 14,
  },
  flatlist: {padding: 20},
  flatlistFooter: {height: 50},
  cardContainer: {
    marginVertical: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowOpacity: 0.2,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
  },
  imgStyle: {height: 100, width: 100, borderRadius: 5, marginRight: 10},
  cardFlexBox: {flex: 1},
  cardTitleStyle: {fontSize: 18, fontWeight: 'bold', color: '#222'},
  dateStyle: {color: 'green', fontSize: 14, marginVertical: 5},
  priceStyle: {color: '#888', fontSize: 14},
  keywordContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  keywordBox: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: '#efefef',
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
  },
  keywordText: {fontSize: 14, color: '#222'},
});
