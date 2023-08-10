import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../../types';
import {useRoute} from '@react-navigation/native';
import {ImageViewer} from 'react-native-image-zoom-viewer';
import {useNavigation} from '@react-navigation/native';

const ImageFullScreen = () => {
  const  {params:{hdurl}} = useRoute<NativeStackScreenProps<RootStackParams, 'ImageFullScreen'>['route']>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigation();

  const goBack=()=>{
    navigate.goBack();
  }

  return (
    <View style={styles.container}>
      <ImageViewer imageUrls={ [{url:hdurl }]} style={styles.image} renderIndicator={() => null}/>
      <TouchableOpacity style={styles.closeButton} onPress={goBack}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
    borderColor: '#a9a9a9',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25
  },
});

export default ImageFullScreen;