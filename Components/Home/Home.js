import * as React from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import NewsCard from './NewsCard';
import Theme from '../Utils/Theme';

const API_KEY = "http://newsapi.org/v2/everything?q=bitcoin&from=2020-04-24&sortBy=publishedAt&apiKey=eab998021b064fd5a0150245d8722e6e"
const ENTERTAINMENT = "http://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=eab998021b064fd5a0150245d8722e6e"

export default function Home({ route, navigation }) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
      getData(ENTERTAINMENT)
    }, []);

    getData = (apikey) => {
      fetch(apikey)
        .then((response) => response.json())
        .then((json) => setData(json.articles))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }

    return (
      <View style={{flex: 1}}>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color= {Theme.COLOR}/>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <NewsCard data={item}/>
            )}
          />
        )}
      </View>
    );
}

const styles = StyleSheet.create({ 

  
});