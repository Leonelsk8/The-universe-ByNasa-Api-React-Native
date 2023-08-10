import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const Header = () =>{
  return (
    <View style={styles.container}>
      <View style={styles.LogoContainer}>
        <Image source={require('../../../assets/Logos/NasaLogo.png')} style={styles.image}></Image>
        <Text style={styles.title}>Nasa Dates</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    padding:16,
    backgroundColor: '#4464b3'
  },
  LogoContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title:{
    color: '#fff',
    fontSize: 20,
    marginLeft: 6,
    fontWeight: 'bold'
  },
  image:{
    width: 55,
    height: 55
  }
});

export default Header;