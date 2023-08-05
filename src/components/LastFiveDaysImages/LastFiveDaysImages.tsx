import React, {FC} from 'react';
import { View, StyleSheet, Text, ScrollView} from 'react-native';
import { PostImage as PostImageType } from '../../types';
import PostImage from '../PostImage';

const LastFiveDaysImages: FC<{postImages?: PostImageType[]}> = (props)=>{
  const {postImages} = props;

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Last 5 Days</Text>
      <ScrollView style={styles.content}>
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
    flex:1,
    marginVertical: 8,
  },
  content:{
    paddingHorizontal: 24,
  },
  title:{
    color: '#fff',
    fontSize: 16,
    marginBottom: 18
  }
});

export default LastFiveDaysImages;