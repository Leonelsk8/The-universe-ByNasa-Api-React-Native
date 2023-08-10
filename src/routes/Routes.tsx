import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FootBar from '../components/FootBar';
import Header from '../components/Header';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams} from '../types';
import Home from '../views/Home';
import Detail from '../views/Detail';
import Search from '../views/Search';
import Favorites from '../views/Favorites';
import ImageFullScreen from '../views/ImageFullScreen';

const Stack = createNativeStackNavigator<RootStackParams>();


const Routes = ()=>{
  
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{header: ()=> <Header/>}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Detail' component={Detail}/>
        <Stack.Screen name='Search' component={Search}/>
        <Stack.Screen name='Favorites' component={Favorites}/>
        <Stack.Screen name='ImageFullScreen' component={ImageFullScreen}/>
      </Stack.Navigator>
      <FootBar/>
    </NavigationContainer>
  )
};

export default Routes;