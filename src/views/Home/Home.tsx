import React, {useEffect, useState} from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import fetchApi from '../../utils/API/Api';
import Header from '../../components/Header';
import TodayImage from '../../components/TodayImage';
import { PostImage } from '../../types';

const Home = ()=>{
  const [todayImage, setTodayImage] = useState<PostImage>();

  useEffect(()=>{
    const loadTodayImage = async()=>{
      try {
        const todaysImageResponse = await fetchApi();
        setTodayImage(todaysImageResponse);
      } catch (error) {
        console.log(error);
        setTodayImage(undefined);
      }
    }

    loadTodayImage().catch(null);
  },[])

  return(
    <View style={styles.container}>
      <Header/>
      <TodayImage {...todayImage}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 16
  }
})

export default Home;