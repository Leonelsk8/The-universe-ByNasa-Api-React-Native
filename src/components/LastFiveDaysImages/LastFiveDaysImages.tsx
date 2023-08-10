import React, {FC} from 'react';
import { View, StyleSheet, Text, ScrollView} from 'react-native';
import { PostImage as PostImageType } from '../../types';
import PostImage from '../PostImage';

const LastFiveDaysImages: FC<{postImages?: PostImageType[]}> = (props)=>{
  const {postImages} = props;

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Últimos 5 Días</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {
          postImages?.map((postImage) =>(
            <PostImage key={`post-image-${postImage.title}`} {...postImage}/>
          ))
        }
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex:0.9,
    marginTop: 40,
    justifyContent: 'center'
  },
  title:{
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },
  scrollViewContent:{
    flexGrow: 1,
    alignItems: 'center',
  }
});

export default LastFiveDaysImages;