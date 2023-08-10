import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../../types';
import {LinearGradient} from 'expo-linear-gradient';
import {mySvg} from '../../utils/LogosSvg/LogosSvg';
import { SvgXml } from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {saveDataToCache, deleteElementCache, existElementInFavorites} from '../../utils/Cache/SavedCacheFavorites';

type PostImageNavigationProps = NativeStackNavigationProp<RootStackParams, 'ImageFullScreen'>

const Detail = ()=>{
  const  {params:{title,url,explanation,date,hdurl}} = useRoute<NativeStackScreenProps<RootStackParams, 'Detail'>['route']>();
  const [favorite, setFavorite] = useState(false);
  const [saved,setSaved] = useState(null);
  const [phase,setPhase] = useState(false);
  const {navigate} = useNavigation<PostImageNavigationProps>();

  const ViewImageFullScreen = ()=>{
    navigate('ImageFullScreen', {hdurl});
  }

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
      <LinearGradient start={{x: 0, y: 0.6}} end={{x: 0, y: 1}} colors={['#fff', '#dcdcdc']} style={styles.content}>
        <ImageBackground source={{uri:url}} style={styles.image}>
          <LinearGradient style={styles.contentGradient} start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['rgba(255,255,255,0)', '#000000']}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttons} onPress={ViewImageFullScreen}>
                <Text style={styles.buttText}>Ver Imagen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={savedChange}>
                <SvgXml style={styles.iconSaved} xml={favorite ? mySvg.logoFavoritesCheck : mySvg.logoFavorites}/>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.contentDescription}>
          <Text style={styles.desc}>Descripción</Text>
          <ScrollView style={styles.explanationContainer}>
            <Text style={styles.explanation}>{explanation}</Text>
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5'
  },
  content:{
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 32,
    marginVertical: 24,
    flex: 1,
    overflow: 'hidden',
  },
  contentDescription:{
    padding: 16,
    flex:1
  },
  contentGradient:{
    flex: 0.5,
    padding: 16,
    justifyContent: 'flex-end'
  },
  image:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'flex-end'
  },
  title:{
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  date:{
    color: '#fff',
    fontSize: 16
  },
  explanationContainer:{
    marginVertical: 14
  },
  explanation:{
    color: 'black',
    fontSize: 16
  },
  desc:{
    color: 'black',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
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
});

export default Detail;