import React, {useState, useContext} from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import {mySvg} from '../../utils/LogosSvg/LogosSvg';
import { SvgXml } from 'react-native-svg';
import {RootStackParams} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MyContext from '../../../MyContext';

type PostImageNavigationProps = NativeStackNavigationProp<RootStackParams>

const FootBar = ()=>{
  const {navigate} = useNavigation<PostImageNavigationProps>();
  const [routeView, setRouteView] = useState(1);
  const {setRouteHome} = useContext(MyContext);

  const handleHomeView =()=>{
    setRouteView(1);
    setRouteHome(true);
    navigate('Home', {});
  };

  const handleSearchView =()=>{
    setRouteView(2);
    setRouteHome(false);
    navigate('Search', {});
  };

  const handleFavoritesView =()=>{
    setRouteView(3);
    setRouteHome(false);
    navigate('Favorites', {});
  };


  return(
    <View style={styles.footbar}>
        <TouchableOpacity style={styles.buttonSvg} onPress={handleHomeView}>
          <SvgXml
            style={styles.icons}
            xml={routeView===1 ? mySvg.logoHouseCheck : mySvg.logoHouse}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSvg} onPress={handleSearchView}>
          <SvgXml
            style={styles.icons}
            xml={routeView===2 ? mySvg.logoGlassCheck : mySvg.logoGlass}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSvg} onPress={handleFavoritesView}>
          <SvgXml
            style={styles.icons}
            xml={routeView=== 3 ? mySvg.logoFavoritesCheck : mySvg.logoFavorites}
          />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  footbar:{
    flex:0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    width:'100%',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderColor: 'black'
  },
  buttonSvg:{
    height: '50%',
    width: '30%'
  },
  icons:{
    height: '100%',
    color: 'black',
    width: '100%'
  }
});

export default FootBar;