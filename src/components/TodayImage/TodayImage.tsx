import React, {FC} from 'react';
import {View,Text,Image, StyleSheet, Button} from 'react-native';
import {PostImage, RootStackParams} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type PostImageNavigationProps = NativeStackNavigationProp<RootStackParams, 'Detail'>

const TodayImage:FC<PostImage>  = ({date,title,url, explanation})=>{
  const {navigate} = useNavigation<PostImageNavigationProps>();

  const handleViewPress =()=>{
    navigate('Detail', {title, date, url, explanation});
  };

  return(
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri:url}} style={styles.image}></Image>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.buttonContainer}>
        <Button title='View' onPress={handleViewPress} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#2c449d',
    marginVertical: 16,
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 16
  },
  imageContainer:{
    borderWidth: 2,
    borderRadius: 32,
    width: '100%',
    height: 250
  },
  image:{
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 32
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
    alignItems: 'flex-end',
  }
});

export default TodayImage;