import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView} from 'react-native';
import { getDataFromCache, deletedAllFavorites, deleteElementCache } from '../../utils/Cache/SavedCacheFavorites';
import {LinearGradient} from 'expo-linear-gradient';
import { mySvg } from '../../utils/LogosSvg/LogosSvg';
import { SvgXml } from 'react-native-svg';
import {PostImage, RootStackParams} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ArrayType =[{
  title?:string;
  date?:string;
  url?:string;
  explanation?:string;
  hdurl?:string;
}];

type PostImageNavigationProps = NativeStackNavigationProp<RootStackParams, 'Detail'>;

const Favorites = ()=>{
  const [favorites, setFavorites] = useState<ArrayType>([{title:'', date:'', url:'', explanation:'', hdurl: ''}]);
  const [load, setLoad] = useState(false);
  const [favorite, setFavorite] = useState(true);
  const {navigate} = useNavigation<PostImageNavigationProps>();

  const handleViewPress =(title:string,date:string,url:string,explanation:string,hdurl:string)=>{
    navigate('Detail', {title, date, url, explanation, hdurl});
  };

  useEffect(()=>{
    const getData = async()=>{
      const response:string = await getDataFromCache();
      const results:ArrayType = JSON.parse(response);
      if(results.length > 0){
        setFavorites(results);
        setLoad(true);
      }else{
        setLoad(false);
        setFavorites([{title:'', date:'', url:'', explanation:'', hdurl: ''}]);
      }
    }

    getData();

  },[favorite])

  const deletes = ()=>{
    deletedAllFavorites();
    setLoad(false);
    setFavorites([{title:'', date:'', url:'', explanation:'', hdurl: ''}]);
  }

  const deleteElement=async(date:string)=>{
    try {
      await deleteElementCache(date);
      setFavorite(!favorite)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{flex:1, padding: 16}}>
      <TouchableOpacity onPress={deletes} style={styles.buttonDelete}>
        <Text style={{color:'#fff', textAlign:'center'}}>Eliminar todo</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {
        load ? (
          favorites.map((item, index)=>(
            <TouchableOpacity key={index} style={styles.container} onPress={()=>handleViewPress(item.title, item.date, item.url, item.explanation, item.hdurl)}>
              <View style={styles.imageContent}>
                <Image source={{uri: item.url}} style={styles.image}/>
              </View>
              <LinearGradient start={{x: 0, y: 0.6}} end={{x: 0, y: 1}} colors={['#fff', '#dcdcdc']} style={styles.datesContent}>
                <Text style={styles.dateTitle}>{item.title}</Text>
                <Text style={styles.dateDate}>{item.date}</Text>
                <View style={{flex:1, alignItems:'flex-end', justifyContent:'flex-end'}}>
                  <TouchableOpacity style={styles.buttonSaved} onPress={()=>deleteElement(item.date)}>
                    <SvgXml style={styles.iconSaved} xml={mySvg.logoFavoritesCheck}/>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )) 
        ) : <Text style={styles.notResult}>No hay resultados</Text>
      }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    width: '100%',
    height: 150,
    marginBottom: 16
  },
  scrollViewContent: {
    flexGrow:1,
    paddingTop:10
  },
  imageContent:{
    width: '35%',
    height: '100%'
  },
  image:{
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  },
  datesContent:{
    flex:1,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    padding:16,
  },
  dateTitle:{
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 16
  },
  dateDate:{
    color: 'black',
    fontWeight: '600'
  },
  notResult:{
    fontSize:25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '50%'
  },
  buttonDelete:{
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#4464b3',
    borderRadius: 16,
    marginBottom:16
  },
  buttonSaved:{
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#a9a9a9',
    backgroundColor: '#4464b3',
    padding: 10,
  },
  iconSaved:{
    width: 20,
    height: 20,
    color: '#fff'
  },
})

export default Favorites;