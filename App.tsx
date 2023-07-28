import { StyleSheet, SafeAreaView, Platform} from 'react-native';
import Home from './src/views/Home';

export default function App() {
  return (
    <SafeAreaView style={[styles.container,{paddingTop: Platform.OS === 'android' && 60}]}>
      <Home></Home>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgba(7,26,93,255)',
  }
});
