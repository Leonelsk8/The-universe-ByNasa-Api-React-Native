import React, {useEffect, useState} from 'react';
import { View, StyleSheet} from 'react-native';
import fetchApi from '../../utils/API/Api';
import Header from '../../components/Header';
import TodayImage from '../../components/TodayImage';
import LastFiveDaysImages from '../../components/LastFiveDaysImages';
import { PostImage } from '../../types';
import {format, sub} from 'date-fns';

const Home = ()=>{
  const [todayImage, setTodayImage] = useState<PostImage>();
  const [lastFiveDaysImages, setLastFiveDaysImages] = useState<PostImage[]>([]);

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
        const todaysDates = format(date, 'yyyy-MM-dd');
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
      <Header/>
      <TodayImage {...todayImage}/>
      <LastFiveDaysImages postImages={lastFiveDaysImages}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(7,26,93,255)'
  }
})

export default Home;