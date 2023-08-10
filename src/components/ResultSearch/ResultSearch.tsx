import React, {FC} from 'react';
import {View,Text,Image, TouchableOpacity, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams, PostImage} from '../../types';

type PostImageNavigationProps = NativeStackNavigationProp<RootStackParams, 'Detail'>

const ResultSearch:FC<PostImage> = ({date,title,url, explanation, hdurl})=>{
  const {navigate} = useNavigation<PostImageNavigationProps>();

  const handleViewPress =()=>{
    navigate('Detail', {date,title,url, explanation, hdurl});
  };


  return(
    <TouchableOpacity style={styles.container} onPress={handleViewPress}>
      <View style={styles.imageContent}>
        <Image source={{uri: url}} style={styles.image}/>
      </View>
      <LinearGradient start={{x: 0, y: 0.6}} end={{x: 0, y: 1}} colors={['#fff', '#dcdcdc']} style={styles.datesContent}>
        <Text style={styles.dateTitle}>{title}</Text>
        <Text style={styles.dateDate}>{date}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    width: '100%',
    height: '20%',
    marginTop: 16
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
  }
})

export default ResultSearch;