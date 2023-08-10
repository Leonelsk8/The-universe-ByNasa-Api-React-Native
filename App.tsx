import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform} from 'react-native';
import Routes from './src/routes';
import MyContext from './MyContext';

const App = ()=> {
  const [routeHome, setRouteHome] = useState(true);

  return (
    <MyContext.Provider value={{routeHome, setRouteHome}}>
      <SafeAreaView style={[styles.container,{paddingTop: Platform.OS === 'android' && 30}]}>
        <Routes/>
        <StatusBar style="inverted" />
      </SafeAreaView>
    </MyContext.Provider>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#4464b3'
  }
});

export default App;