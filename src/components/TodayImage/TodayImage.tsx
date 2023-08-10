import React, {FC, useState, useEffect} from 'react';
import {View,Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {PostImage, RootStackParams} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LinearGradient} from 'expo-linear-gradient';
import {mySvg} from '../../utils/LogosSvg/LogosSvg';
import { SvgXml } from 'react-native-svg';
import {saveDataToCache, deleteElementCache, existElementInFavorites} from '../../utils/Cache/SavedCacheFavorites';

type PostImageNavigationProps = NativeStackNavigationProp<RootStackParams, 'Detail'>

const TodayImage:FC<PostImage>  = ({date,title,url, explanation, hdurl})=>{
  const {navigate} = useNavigation<PostImageNavigationProps>();
  const [favorite, setFavorite] = useState(false);
  const [saved,setSaved] = useState(null);
  const [phase,setPhase] = useState(false);

  const handleViewPress =()=>{
    navigate('Detail', {title, date, url, explanation, hdurl});
  };

  useEffect(()=>{
    if(date !== ''){
      const func = async()=>{
        const response:boolean = await existElementInFavorites(date);
        setFavorite(response);
        setPhase(true);
      }
      func();
    }
  },[date])

  useEffect(()=>{
    if(phase){
      const objectValue:object = {title:title,date:date,url:url,explanation:explanation,hdurl:hdurl};
      if(saved){
        saveDataToCache(objectValue);
        setFavorite(true);
      }else{
        deleteElementCache(date);
        setFavorite(false);
      } 
    }
  },[saved])


  const savedChange=()=>{
    favorite ? setSaved(false) : setSaved(true)
  };

  return(
    <View style={styles.container}>
      <ImageBackground source={{uri:url}} style={styles.content}>
        <LinearGradient style={styles.contentGradient} start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['rgba(255,255,255,0)', '#000000']}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>Fecha: {date}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttons} onPress={handleViewPress}>
              <Text style={styles.buttText}>Ver más</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={savedChange}>
              <SvgXml style={styles.iconSaved} xml={favorite ? mySvg.logoFavoritesCheck : mySvg.logoFavorites}/>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    height: '45%'
  },
  content:{
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    justifyContent: 'flex-end'
  },
  contentGradient:{
    flex: 0.5,
    padding: 16,
    justifyContent: 'flex-end'
  },
  title:{
    color: '#fff',
    fontSize: 20,
    marginVertical: 12,
    fontWeight: 'bold'
  },
  date:{
    color: '#fff',
    fontSize: 16
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  buttons:{
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#a9a9a9',
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttText:{
    color: '#fff'
  },
  iconSaved:{
    width: 20,
    height: 20,
    color: '#fff'
  },
  Titlehead:{
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default TodayImage;