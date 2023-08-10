import React, { useEffect, useState, useContext} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import fetchApi from '../../utils/API/Api';
import TodayImage from '../../components/TodayImage';
import LastFiveDaysImages from '../../components/LastFiveDaysImages';
import { PostImage } from '../../types';
import {format, sub} from 'date-fns';
import { DefaultCreateCache } from '../../utils/Cache/SavedCacheFavorites';
import MyContext from '../../../MyContext';

const Home = ()=>{
  const [todayImage, setTodayImage] = useState<PostImage>();
  const [lastFiveDaysImages, setLastFiveDaysImages] = useState<PostImage[]>([]);
  const {routeHome} = useContext(MyContext);

  useEffect(()=>{
    DefaultCreateCache();
  },[])

  useEffect(()=>{
    const loadTodayImage = async()=>{
      try {
        const todaysImageResponse = await fetchApi();
        setTodayImage(todaysImageResponse);
      } catch (error) {
        console.error(error);
        setTodayImage(undefined);
      }
    }

    const loadLastDaysImages = async()=>{
      try {
        const date = new Date();
        const todaysDates = format(sub(date, {days: 1}), 'yyyy-MM-dd');
        const fiveDaysAgoDate = format(sub(date, {days: 5}),'yyyy-MM-dd');

        const lastFiveDaysImagesResponse = await fetchApi(`&start_date=${fiveDaysAgoDate}&end_date=${todaysDates}`);
        setLastFiveDaysImages(lastFiveDaysImagesResponse);
      } catch (error) {
        console.error(error)
        setLastFiveDaysImages(undefined);
      }
    }

    loadTodayImage().catch(null);
    loadLastDaysImages().catch(null);
  },[])

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Imagen del Día</Text>
      {
        routeHome?(
          <TodayImage {...todayImage}/>
        ) : (
          <View style={{
            width: '100%',
            height: '45%'}}></View>
        )
      }
      <LastFiveDaysImages postImages={lastFiveDaysImages}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  title:{
    color: 'black',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  }
})

export default Home;