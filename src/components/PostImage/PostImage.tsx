import React, {FC} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {PostImage as PostImageTypes, RootStackParams} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LinearGradient} from 'expo-linear-gradient';

type PostImageNavigationProps = NativeStackNavigationProp<RootStackParams, 'Detail'>

const PostImage: FC<PostImageTypes> = ({title, date, url, explanation, hdurl}) =>{
  const {navigate} = useNavigation<PostImageNavigationProps>();

  const handleViewPress =()=>{
    navigate('Detail', {title, date, url, explanation, hdurl});
  };

  return(
    <TouchableOpacity onPress={handleViewPress}>
      <LinearGradient start={{x: 0, y: 0.6}} end={{x: 0, y: 1}} colors={['#fff', '#dcdcdc']} style={styles.container}>
        <View style={styles.imagesContainer}>
          <Image source={{uri:url}} style={styles.images}></Image>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    padding: 10,
    width: 200,
    height: '95%',
    marginEnd: 16
  },
  title:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6
  },
  date:{
    color: 'black',
  },
  buttonContainer:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  buttons:{
    borderRadius: 16,
    backgroundColor: '#4464b3',
    padding: 10,
  },
  buttText:{
    color: '#fff'
  },
  imagesContainer:{
    width: '100%',
    height: '45%',
    marginBottom: 8
  },
  images:{
    width: '100%',
    height: '100%',
    borderRadius: 20,
  }
})

export default PostImage;